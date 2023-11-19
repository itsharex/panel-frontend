<script lang="ts" setup>
import { NButton, NDataTable, NSpace, NSwitch, NPopconfirm, NInput } from 'naive-ui'
import website from '@/api/panel/website'
import info from '@/api/panel/info'
import { generateRandomString, isNullOrUndef, renderIcon } from '@/utils'
import type { Website } from './types'
import Editor from '@guolao/vue-monaco-editor'

const router = useRouter()

const queryItems = ref<any>({})
const selectedRowKeys = ref<any>([])

const columns: any = [
  { type: 'selection', fixed: 'left' },
  { title: '网站名', key: 'name', width: 150, resizable: true, ellipsis: { tooltip: true } },
  {
    title: '运行',
    key: 'status',
    width: 60,
    align: 'center',
    render(row: any) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row.status,
        onUpdateValue: () => handleStatusChange(row)
      })
    }
  },
  { title: '目录', key: 'path', width: 200, resizable: true, ellipsis: { tooltip: true } },
  { title: 'PHP', key: 'php', width: 60, ellipsis: { tooltip: true } },
  {
    title: 'SSL',
    key: 'ssl',
    width: 60,
    align: 'center',
    render(row: any) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row.ssl,
        loading: row.ssl,
        onClick: () => handleEdit(row)
      })
    }
  },
  {
    title: '备注',
    key: 'remark',
    width: 200,
    resizable: true,
    ellipsis: { tooltip: true },
    render(row: any) {
      return h(NInput, {
        size: 'small',
        value: row.remark,
        onBlur: () => handleRemark(row),
        onUpdateValue(v) {
          row.remark = v
        }
      })
    }
  },
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
            secondary: true,
            onClick: () => handleEdit(row)
          },
          {
            default: () => '备份',
            icon: renderIcon('majesticons:eye-line', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleEdit(row)
          },
          {
            default: () => '修改',
            icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDelete(row.id),
            onNegativeClick: () => {
              window.$message.info('取消删除')
            }
          },
          {
            default: () => {
              return '确定删除网站吗？'
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

const data = ref<Website[]>([] as Website[])

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const addModal = ref(false)
const editDefaultPageModal = ref(false)
const buttonLoading = ref(false)
const buttonDisabled = ref(false)
const addModel = ref({
  name: '',
  domains: [] as Array<string>,
  ports: [] as Array<string>,
  php: '0',
  db: false,
  db_type: '0',
  db_name: '',
  db_user: '',
  db_password: '',
  path: '',
  remark: ''
})
const editDefaultPageModel = ref({
  index: '',
  stop: ''
})

const installedDbAndPhp = ref({
  php: [
    {
      label: '',
      value: ''
    }
  ],
  db: [
    {
      label: '',
      value: ''
    }
  ]
})

const getPhpAndDb = async () => {
  const { data } = await info.installedDbAndPhp()
  installedDbAndPhp.value = data
}

const onChecked = (rowKeys: any) => {
  selectedRowKeys.value = rowKeys
}

// 修改运行状态
const handleStatusChange = (row: any) => {
  if (isNullOrUndef(row.id)) return

  website.status(row.id, !row.status).then(() => {
    row.status = !row.status
    window.$message.success('已' + (row.status ? '启动' : '停止'))
  })
}

const getWebsiteList = async (page: number, limit: number) => {
  const { data } = await website.list(page, limit)
  return data
}

const getDefaultPage = async () => {
  const { data } = await website.defaultConfig()
  editDefaultPageModel.value = data
}

const onPageChange = (page: number) => {
  pagination.page = page
  getWebsiteList(page, pagination.pageSize).then((res) => {
    data.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
}

const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  onPageChange(1)
}

const handleRemark = (row: any) => {
  website.updateRemark(row.id, row.remark).then(() => {
    window.$message.success('修改成功')
  })
}

const handleEdit = (row: any) => {
  router.push({
    name: 'website-edit',
    params: {
      id: row.id
    }
  })
}

const handleDelete = (id: number) => {
  website.delete(id).then(() => {
    window.$message.success('删除成功')
    onPageChange(pagination.page)
  })
}

const handleSearch = () => {
  window.$message.info('暂不支持')
}

const handleSaveDefaultPage = () => {
  website
    .saveDefaultConfig(editDefaultPageModel.value.index, editDefaultPageModel.value.stop)
    .then(() => {
      window.$message.success('修改成功')
      editDefaultPageModal.value = false
    })
}

const handleAdd = async () => {
  buttonLoading.value = true
  buttonDisabled.value = true
  // 端口为空自动添加 80 端口
  if (addModel.value.ports.length === 0) {
    addModel.value.ports.push('80')
  }
  await website
    .add(addModel.value)
    .then(() => {
      window.$message.success('添加成功')
      getWebsiteList(pagination.page, pagination.pageSize).then((res) => {
        data.value = res.items
        pagination.itemCount = res.total
        pagination.pageCount = res.total / pagination.pageSize + 1
      })
      addModal.value = false
      addModel.value = {
        name: '',
        domains: [] as Array<string>,
        ports: [] as Array<string>,
        php: '0',
        db: false,
        db_type: '0',
        db_name: '',
        db_user: '',
        db_password: '',
        path: '',
        remark: ''
      }
      buttonLoading.value = false
      buttonDisabled.value = false
    })
    .catch(() => {
      buttonLoading.value = false
      buttonDisabled.value = false
    })
}

const batchDelete = async () => {
  if (selectedRowKeys.value.length === 0) {
    window.$message.info('请选择要删除的网站')
    return
  }

  for (const id of selectedRowKeys.value) {
    await website.delete(id).then(() => {
      let site = data.value.find((item) => item.id === id)
      window.$message.success('网站 ' + site?.name + ' 删除成功')
    })
  }

  onPageChange(pagination.page)
}

onMounted(() => {
  onPageChange(pagination.page)
  getPhpAndDb()
  getDefaultPage()
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <div>
        <n-button class="ml-16" type="primary" @click="addModal = true">
          <TheIcon :size="18" class="mr-5" icon="material-symbols:add" />
          新建网站
        </n-button>
      </div>
    </template>

    <div
      border="1 solid #ccc"
      bg="#fafafc"
      mb-30
      min-h-60
      flex
      items-start
      justify-between
      rounded-8
      p-15
      dark:bg-black
    >
      <n-space wrap :size="[35, 15]">
        <n-space>
          <n-popconfirm @positive-click="batchDelete">
            <template #trigger>
              <n-button type="error"> 批量删除 </n-button>
            </template>
            高危操作！确定删除选中的网站吗？
          </n-popconfirm>
          <n-button type="warning" @click="editDefaultPageModal = true">修改默认页</n-button>
          <n-button type="info">HTTPS 防窜站</n-button>
        </n-space>
      </n-space>

      <div flex-shrink-0>
        <div flex items-center>
          <div :style="{ width: '200px' }" flex-shrink-0>
            <n-input
              v-model:value="queryItems.title"
              placeholder="请输入网站名"
              type="text"
              @keydown.enter="handleSearch"
            />
          </div>
          <n-button ml-20 type="primary" @click="handleSearch">搜索</n-button>
        </div>
      </div>
    </div>
    <n-data-table
      striped
      remote
      :loading="false"
      :scroll-x="1200"
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      :pagination="pagination"
      @update:checked-row-keys="onChecked"
      @update:page="onPageChange"
      @update:page-size="onPageSizeChange"
    />
  </CommonPage>
  <n-modal
    v-model:show="addModal"
    title="新建网站"
    preset="card"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
    @close="addModal = false"
  >
    <n-form :model="addModel">
      <n-form-item path="name" label="网站名">
        <n-input
          v-model:value="addModel.name"
          type="text"
          @keydown.enter.prevent
          placeholder="网站名建议使用英文，设置后不可修改"
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="11">
          <n-form-item label="域名">
            <n-dynamic-input
              v-model:value="addModel.domains"
              placeholder="example.com"
              :min="1"
              show-sort-button
            />
          </n-form-item>
        </n-col>
        <n-col :span="2"></n-col>
        <n-col :span="11">
          <n-form-item label="端口">
            <n-dynamic-input
              v-model:value="addModel.ports"
              placeholder="80"
              :min="1"
              show-sort-button
            />
          </n-form-item>
        </n-col>
      </n-row>
      <n-row :gutter="[0, 24]">
        <n-col :span="11">
          <n-form-item path="php" label="PHP版本">
            <n-select
              v-model:value="addModel.php"
              :options="installedDbAndPhp.php"
              placeholder="选择PHP版本"
              @keydown.enter.prevent
            >
            </n-select>
          </n-form-item>
        </n-col>
        <n-col :span="2"></n-col>
        <n-col :span="11">
          <n-form-item path="db" label="数据库">
            <n-select
              v-model:value="addModel.db_type"
              :options="installedDbAndPhp.db"
              placeholder="选择数据库"
              @keydown.enter.prevent
              @update:value="
                () => {
                  addModel.db = addModel.db_type != '0'
                  addModel.db_name = addModel.name
                  addModel.db_user = addModel.name
                  addModel.db_password = generateRandomString(16)
                }
              "
            >
            </n-select>
          </n-form-item>
        </n-col>
      </n-row>
      <n-row :gutter="[0, 24]">
        <n-col :span="7">
          <n-form-item v-if="addModel.db" path="db_name" label="数据库名">
            <n-input
              v-model:value="addModel.db_name"
              type="text"
              @keydown.enter.prevent
              placeholder="数据库名"
            />
          </n-form-item>
        </n-col>
        <n-col :span="1"></n-col>
        <n-col :span="7">
          <n-form-item v-if="addModel.db" path="db_user" label="数据库用户名">
            <n-input
              v-model:value="addModel.db_user"
              type="text"
              @keydown.enter.prevent
              placeholder="数据库用户名"
            />
          </n-form-item>
        </n-col>
        <n-col :span="1"></n-col>
        <n-col :span="8">
          <n-form-item v-if="addModel.db" path="db_password" label="数据库密码">
            <n-input
              v-model:value="addModel.db_password"
              type="text"
              @keydown.enter.prevent
              placeholder="数据库密码"
            />
          </n-form-item>
        </n-col>
      </n-row>
      <n-form-item path="path" label="目录">
        <n-input
          v-model:value="addModel.path"
          type="text"
          @keydown.enter.prevent
          placeholder="网站根目录（不填默认为建站目录/网站名）"
        />
      </n-form-item>
      <n-form-item path="remark" label="备注">
        <n-input
          v-model:value="addModel.remark"
          type="textarea"
          @keydown.enter.prevent
          placeholder="备注"
        />
      </n-form-item>
    </n-form>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <n-button
          type="info"
          block
          :loading="buttonLoading"
          :disabled="buttonDisabled"
          @click="handleAdd"
        >
          提交
        </n-button>
      </n-col>
    </n-row>
  </n-modal>
  <n-modal
    v-model:show="editDefaultPageModal"
    preset="card"
    title="修改默认页"
    style="width: 80vw"
    size="huge"
    :bordered="false"
    :segmented="false"
    @close="handleSaveDefaultPage"
  >
    <n-tabs type="line" animated>
      <n-tab-pane name="index" tab="默认页">
        <Editor
          v-model:value="editDefaultPageModel.index"
          language="html"
          theme="vs-dark"
          height="60vh"
          mt-8
          :options="{
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true
          }"
        />
      </n-tab-pane>
      <n-tab-pane name="stop" tab="停止页">
        <Editor
          v-model:value="editDefaultPageModel.stop"
          language="html"
          theme="vs-dark"
          height="60vh"
          mt-8
          :options="{
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true
          }"
        />
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>
