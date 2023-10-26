<script setup lang="ts">
import { NButton, NDataTable, NInput, NPopconfirm } from 'naive-ui'
import { VAceEditor } from 'vue3-ace-editor'
import mysql57 from '@/api/plugins/mysql57'
import '@/utils/common/ace-config'
import { generateRandomString, renderIcon } from '@/utils'
import type { Database, User } from '@/views/plugins/mysql57/types'

const currentTab = ref('status')
const status = ref(false)
const config = ref('')
const errorLog = ref('')
const slowLog = ref('')

const statusType = computed(() => {
  return status.value ? 'success' : 'error'
})
const statusStr = computed(() => {
  return status.value ? '正常运行中' : '已停止运行'
})

const addDatabaseModel = ref({
  database: '',
  user: '',
  password: ''
})
const addUserModel = ref({
  database: '',
  user: '',
  password: ''
})
const changePasswordModel = ref({
  user: '',
  password: ''
})
const changePrivilegesModel = ref({
  user: '',
  database: ''
})

const addDatabaseModal = ref(false)
const addUserModal = ref(false)
const changePasswordModal = ref(false)
const changePrivilegesModal = ref(false)

const databaseColumns: any = [
  { title: '库名', key: 'name', fixed: 'left', resizable: true, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 240,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            secondary: true
            //onClick: () => handleEdit(row)
          },
          {
            default: () => '备份',
            icon: renderIcon('material-symbols:save-outline', { size: 14 })
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDeleteDatabase(row.name)
          },
          {
            default: () => {
              return '确定删除数据库吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  size: 'small',
                  type: 'error',
                  style: 'margin-left: 15px;'
                },
                {
                  default: () => '删除',
                  icon: renderIcon('material-symbols:delete-outline', { size: 14 })
                }
              )
            }
          }
        )
      ]
    }
  }
]

const userColumns: any = [
  { title: '用户名', key: 'user', fixed: 'left', resizable: true, ellipsis: { tooltip: true } },
  { title: '主机', key: 'host', resizable: true, ellipsis: { tooltip: true } },
  { title: '权限', key: 'grants', width: 350, resizable: true, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 300,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            secondary: true,
            onClick: () => handleChangePassword(row.user)
          },
          {
            default: () => '改密',
            icon: renderIcon('majesticons:key-line', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            secondary: true,
            style: 'margin-left: 15px;',
            onClick: () => handleChangePrivileges(row.user, row.database)
          },
          {
            default: () => '权限',
            icon: renderIcon('majesticons:lock-line', { size: 14 })
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDeleteUser(row.user)
          },
          {
            default: () => {
              return '确定删除用户吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  size: 'small',
                  type: 'error',
                  style: 'margin-left: 15px;'
                },
                {
                  default: () => '删除',
                  icon: renderIcon('material-symbols:delete-outline', { size: 14 })
                }
              )
            }
          }
        )
      ]
    }
  }
]

const loadColumns: any = [
  { title: '属性', key: 'name', fixed: 'left', resizable: true, ellipsis: { tooltip: true } },
  { title: '当前值', key: 'value', width: 200, ellipsis: { tooltip: true } }
]

const databases = ref<Database[]>([] as Database[])
const users = ref<User[]>([] as User[])
const load = ref<any[]>([])

const databasePagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const userPagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const getLoad = async () => {
  const { data } = await mysql57.load()
  return data
}

const getDatabaseList = async (page: number, limit: number) => {
  const { data } = await mysql57.databases(page, limit)
  return data
}

const getUserList = async (page: number, limit: number) => {
  const { data } = await mysql57.users(page, limit)
  return data
}

const onDatabasePageChange = (page: number) => {
  databasePagination.page = page
  getDatabaseList(page, databasePagination.pageSize).then((res) => {
    databases.value = res.items
    databasePagination.itemCount = res.total
    databasePagination.pageCount = res.total / databasePagination.pageSize + 1
  })
}

const onUserPageChange = (page: number) => {
  userPagination.page = page
  getUserList(page, userPagination.pageSize).then((res) => {
    users.value = res.items
    userPagination.itemCount = res.total
    userPagination.pageCount = res.total / userPagination.pageSize + 1
  })
}

const onDatabasePageSizeChange = (pageSize: number) => {
  databasePagination.pageSize = pageSize
  onDatabasePageChange(1)
}

const onUserPageSizeChange = (pageSize: number) => {
  userPagination.pageSize = pageSize
  onUserPageChange(1)
}

const handleDeleteDatabase = async (name: string) => {
  mysql57.deleteDatabase(name).then(() => {
    window.$message.success('删除成功')
    onDatabasePageChange(databasePagination.page)
  })
}

const handleDeleteUser = async (user: string) => {
  mysql57.deleteUser(user).then(() => {
    window.$message.success('删除成功')
    onUserPageChange(userPagination.page)
  })
}

const handleChangePassword = (user: string) => {
  changePasswordModel.value.user = user
  changePasswordModal.value = true
}

const handleChangePrivileges = (user: string, database: string) => {
  changePrivilegesModel.value.user = user
  changePrivilegesModel.value.database = database
  changePrivilegesModal.value = true
}

const getStatus = async () => {
  mysql57.status().then((res: any) => {
    status.value = res.data
  })
}

const getErrorLog = async () => {
  const { data } = await mysql57.errorLog()
  return data
}

const getSlowLog = async () => {
  const { data } = await mysql57.slowLog()
  return data
}

const getConfig = async () => {
  const { data } = await mysql57.config()
  return data
}

const handleSaveConfig = async () => {
  await mysql57.saveConfig(config.value)
  window.$message.success('保存成功')
}

const handleClearErrorLog = async () => {
  await mysql57.clearErrorLog()
  getErrorLog().then((res) => {
    errorLog.value = res
  })
  window.$message.success('清空成功')
}

const handleClearSlowLog = async () => {
  await mysql57.clearSlowLog()
  getSlowLog().then((res) => {
    slowLog.value = res
  })
  window.$message.success('清空成功')
}

const handleStart = async () => {
  await mysql57.start()
  window.$message.success('启动成功')
  getStatus()
}

const handleStop = async () => {
  await mysql57.stop()
  window.$message.success('停止成功')
  await getStatus()
}

const handleRestart = async () => {
  await mysql57.restart()
  window.$message.success('重启成功')
  await getStatus()
}

const handleReload = async () => {
  await mysql57.reload()
  window.$message.success('重载成功')
  await getStatus()
}

const handleAddDatabase = async () => {
  mysql57.addDatabase(addDatabaseModel.value).then(() => {
    window.$message.success('添加成功')
    addDatabaseModal.value = false
    onDatabasePageChange(databasePagination.page)
  })
}

const handleAddUser = async () => {
  mysql57.addUser(addUserModel.value).then(() => {
    window.$message.success('添加成功')
    addUserModal.value = false
    onUserPageChange(userPagination.page)
  })
}

onMounted(() => {
  getStatus()
  onDatabasePageChange(databasePagination.page)
  onUserPageChange(userPagination.page)
  getLoad().then((res) => {
    load.value = res
  })
  getErrorLog().then((res) => {
    errorLog.value = res
  })
  getSlowLog().then((res) => {
    slowLog.value = res
  })
  getConfig().then((res) => {
    config.value = res
  })
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <n-space v-if="currentTab == 'manage'">
        <n-button class="ml-16" type="info" @click="addUserModal = true">
          <TheIcon :size="18" class="mr-5" icon="material-symbols:add" />
          新建用户
        </n-button>
        <n-button class="ml-16" type="primary" @click="addDatabaseModal = true">
          <TheIcon :size="18" class="mr-5" icon="material-symbols:add" />
          新建数据库
        </n-button>
      </n-space>
      <n-button
        v-if="currentTab == 'config'"
        class="ml-16"
        type="primary"
        @click="handleSaveConfig"
      >
        <TheIcon :size="18" class="mr-5" icon="material-symbols:save-outline" />
        保存
      </n-button>
      <n-button
        v-if="currentTab == 'error-log'"
        class="ml-16"
        type="primary"
        @click="handleClearErrorLog"
      >
        <TheIcon :size="18" class="mr-5" icon="material-symbols:delete-outline" />
        清空日志
      </n-button>
      <n-button
        v-if="currentTab == 'slow-log'"
        class="ml-16"
        type="primary"
        @click="handleClearSlowLog"
      >
        <TheIcon :size="18" class="mr-5" icon="material-symbols:delete-outline" />
        清空慢日志
      </n-button>
    </template>
    <n-tabs v-model:value="currentTab" type="line" animated>
      <n-tab-pane name="status" tab="运行状态">
        <n-space vertical>
          <n-alert :type="statusType">
            {{ statusStr }}
          </n-alert>
          <n-space>
            <n-button type="success" @click="handleStart">
              <TheIcon :size="24" class="mr-5" icon="material-symbols:play-arrow-outline-rounded" />
              启动
            </n-button>
            <n-popconfirm @positive-click="handleStop">
              <template #trigger>
                <n-button type="error">
                  <TheIcon :size="24" class="mr-5" icon="material-symbols:stop-outline-rounded" />
                  停止
                </n-button>
              </template>
              停止 MySQL 会导致使用 MySQL 的网站无法访问，确定要停止吗？
            </n-popconfirm>
            <n-button type="warning" @click="handleRestart">
              <TheIcon :size="18" class="mr-5" icon="material-symbols:replay-rounded" />
              重启
            </n-button>
            <n-button type="primary" @click="handleReload">
              <TheIcon :size="20" class="mr-5" icon="material-symbols:refresh-rounded" />
              重载
            </n-button>
          </n-space>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="manage" tab="管理">
        <n-space vertical>
          <n-card title="数据库" :segmented="true" rounded-10>
            <n-data-table
              striped
              remote
              :loading="false"
              :columns="databaseColumns"
              :data="databases"
              :row-key="(row) => row.name"
            />
          </n-card>
          <n-card title="用户" :segmented="true" rounded-10>
            <n-data-table
              striped
              remote
              :loading="false"
              :columns="userColumns"
              :data="users"
              :row-key="(row) => row.user"
            />
          </n-card>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="config" tab="修改配置">
        <n-space vertical>
          <n-alert type="warning">
            此处修改的是 MySQL 主配置文件，如果你不了解各参数的含义，请不要随意修改！
          </n-alert>
          <n-alert type="info">提示：Ctrl+F 搜索关键字，Ctrl+S 保存，Ctrl+H 查找替换！</n-alert>
          <VAceEditor
            v-model:value="config"
            lang="sh"
            theme="monokai"
            style="height: 60vh"
            mt-8
            :printMargin="false"
            :options="{
              useWorker: true,
              animatedScroll: true,
              behavioursEnabled: true,
              enableAutoIndent: true,
              autoScrollEditorIntoView: true,
              enableLiveAutocompletion: true,
              enableBasicAutocompletion: true,
              enableSnippets: true
            }"
          />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="load" tab="负载状态">
        <n-data-table striped remote :loading="false" :columns="loadColumns" :data="load" />
      </n-tab-pane>
      <n-tab-pane name="error-log" tab="错误日志">
        <VAceEditor
          v-model:value="errorLog"
          lang="sh"
          theme="monokai"
          style="height: 60vh"
          readonly
          mt-8
          :printMargin="false"
          :options="{
            useWorker: true,
            animatedScroll: true,
            behavioursEnabled: true,
            enableAutoIndent: true,
            autoScrollEditorIntoView: true,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true,
            enableSnippets: true
          }"
        />
      </n-tab-pane>
      <n-tab-pane name="slow-log" tab="慢查询日志">
        <VAceEditor
          v-model:value="slowLog"
          lang="sh"
          theme="monokai"
          style="height: 60vh"
          readonly
          mt-8
          :printMargin="false"
          :options="{
            useWorker: true,
            animatedScroll: true,
            behavioursEnabled: true,
            enableAutoIndent: true,
            autoScrollEditorIntoView: true,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true,
            enableSnippets: true
          }"
        />
      </n-tab-pane>
    </n-tabs>
  </CommonPage>
  <n-modal v-model:show="addDatabaseModal" title="新建数据库">
    <n-card
      closable
      @close="() => (addDatabaseModal = false)"
      title="新建数据库"
      style="width: 60vw"
    >
      <n-form :model="addDatabaseModel">
        <n-form-item path="database" label="数据库名">
          <n-input
            v-model:value="addDatabaseModel.database"
            type="text"
            @keydown.enter.prevent
            placeholder="输入数据库名"
          />
        </n-form-item>
        <n-form-item path="user" label="用户名">
          <n-input
            v-model:value="addDatabaseModel.user"
            type="text"
            @keydown.enter.prevent
            placeholder="输入用户名"
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="addDatabaseModel.password"
            type="password"
            @keydown.enter.prevent
            placeholder="建议使用生成器生成随机密码"
          />
        </n-form-item>
      </n-form>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <n-button type="info" block @click="handleAddDatabase">提交</n-button>
        </n-col>
      </n-row>
    </n-card>
  </n-modal>
  <n-modal v-model:show="addUserModal" title="新建用户">
    <n-card closable @close="() => (addUserModal = false)" title="新建用户" style="width: 60vw">
      <n-form :model="addUserModel">
        <n-form-item path="user" label="用户名">
          <n-input
            v-model:value="addUserModel.user"
            type="text"
            @keydown.enter.prevent
            placeholder="输入用户名"
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="addUserModel.password"
            type="password"
            @keydown.enter.prevent
            placeholder="建议使用生成器生成随机密码"
          />
        </n-form-item>
        <n-form-item path="database" label="数据库名">
          <n-input
            v-model:value="addUserModel.database"
            type="text"
            @keydown.enter.prevent
            placeholder="输入授权给该用户的数据库名"
          />
        </n-form-item>
      </n-form>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <n-button type="info" block @click="handleAddUser">提交</n-button>
        </n-col>
      </n-row>
    </n-card>
  </n-modal>
</template>
