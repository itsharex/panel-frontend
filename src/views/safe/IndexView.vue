<script setup lang="ts">
import { NButton, NDataTable, NPopconfirm, NSpace } from 'naive-ui'
import type { FirewallRule } from '@/views/safe/types'
import safe from '@/api/panel/safe'
import { renderIcon } from '@/utils'

const model = ref({
  firewallStatus: false,
  sshStatus: false,
  pingStatus: false,
  sshPort: 22
})

const columns: any = [
  { type: 'selection', fixed: 'left' },
  { title: '端口', key: 'port', width: 200, resizable: true, ellipsis: { tooltip: true } },
  { title: '协议', key: 'protocol', resizable: true, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 140,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDelete(row),
            onNegativeClick: () => {
              window.$message.info('取消删除')
            }
          },
          {
            default: () => {
              return '确定删除规则吗？'
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

const data = ref<FirewallRule[]>([] as FirewallRule[])

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const selectedRowKeys = ref<any>([])

const addModel = ref({
  port: '',
  protocol: 'tcp'
})

const handleDelete = (row: any) => {
  safe.deleteFirewallRule(row.port, row.protocol).then(() => {
    window.$message.success('删除成功')
    getFirewallRules(pagination.page, pagination.pageSize).then((res) => {
      data.value = res.items
      pagination.itemCount = res.total
      pagination.pageCount = res.total / pagination.pageSize + 1
    })
  })
}

const handleAdd = () => {
  safe.addFirewallRule(addModel.value.port, addModel.value.protocol).then(() => {
    window.$message.success('添加成功')
    addModel.value.port = ''
    addModel.value.protocol = 'tcp'
  })
  getFirewallRules(pagination.page, pagination.pageSize).then((res) => {
    data.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
}

const getFirewallRules = async (page: number, limit: number) => {
  const { data } = await safe.firewallRules(page, limit)
  return data
}

const getSetting = async () => {
  safe.firewallStatus().then((res) => {
    model.value.firewallStatus = res.data
  })
  safe.sshStatus().then((res) => {
    model.value.sshStatus = res.data
  })
  safe.pingStatus().then((res) => {
    model.value.pingStatus = res.data
  })
  safe.sshPort().then((res) => {
    model.value.sshPort = res.data
  })
}

const handleFirewallStatus = () => {
  safe.setFirewallStatus(model.value.firewallStatus).then(() => {
    window.$message.success('设置成功')
  })
}

const handleSshStatus = () => {
  safe.setSshStatus(model.value.sshStatus).then(() => {
    window.$message.success('设置成功')
  })
}

const handlePingStatus = () => {
  safe.setPingStatus(model.value.pingStatus).then(() => {
    window.$message.success('设置成功')
  })
}

const handleSshPort = () => {
  safe.setSshPort(model.value.sshPort).then(() => {
    window.$message.success('设置成功')
  })
}

const batchDelete = async () => {
  if (selectedRowKeys.value.length === 0) {
    window.$message.info('请选择要删除的规则')
    return
  }

  for (const key of selectedRowKeys.value) {
    // 通过 / 分割端口和协议
    const [port, protocol] = key.split('/')
    if (!port || !protocol) {
      continue
    }

    await safe.deleteFirewallRule(port, protocol).then(() => {
      let rule = data.value.find((item) => item.port === port && item.protocol === protocol)
      window.$message.success('规则 ' + rule?.port + '/' + rule?.protocol + ' 删除成功')
    })
  }

  getFirewallRules(pagination.page, pagination.pageSize).then((res) => {
    data.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
}

const onChecked = (rowKeys: any) => {
  selectedRowKeys.value = rowKeys
}

const onPageChange = (page: number) => {
  pagination.page = page
  getFirewallRules(page, pagination.pageSize).then((res) => {
    data.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
}

const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  onPageChange(1)
}

onMounted(() => {
  getSetting()
  getFirewallRules(pagination.page, pagination.pageSize).then((res) => {
    data.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
})
</script>

<template>
  <CommonPage show-footer>
    <n-space vertical>
      <n-card flex-1 rounded-10>
        <n-form inline>
          <n-form-item label="防火墙状态">
            <n-switch
              v-model:value="model.firewallStatus"
              @update:value="handleFirewallStatus"
              checkedChildren="开启"
              unCheckedChildren="关闭"
            />
          </n-form-item>
          <n-form-item label="SSH状态">
            <n-switch
              v-model:value="model.sshStatus"
              @update:value="handleSshStatus"
              checkedChildren="开启"
              unCheckedChildren="关闭"
            />
          </n-form-item>
          <n-form-item label="Ping状态">
            <n-switch
              v-model:value="model.pingStatus"
              @update:value="handlePingStatus"
              checkedChildren="开启"
              unCheckedChildren="关闭"
            />
          </n-form-item>
          <n-form-item label="SSH端口">
            <n-input-number v-model:value="model.sshPort" @blur="handleSshPort" />
          </n-form-item>
        </n-form>
      </n-card>
      <n-space flex items-center>
        <n-popconfirm @positive-click="batchDelete">
          <template #trigger>
            <n-button type="warning"> 批量删除</n-button>
          </template>
          高危操作！确定删除选中的规则吗？
        </n-popconfirm>
        <n-text>端口控制</n-text>
        <n-input v-model:value="addModel.port" placeholder="例如：3306、1000-2000" />
        <n-select
          v-model:value="addModel.protocol"
          placeholder="协议"
          style="width: 120px"
          :options="[
            { label: 'TCP', value: 'tcp' },
            { label: 'UDP', value: 'udp' }
          ]"
        />
        <n-button type="primary" @click="handleAdd">添加</n-button>
      </n-space>

      <n-data-table
        striped
        remote
        :loading="false"
        :scroll-x="1200"
        :columns="columns"
        :data="data"
        :row-key="(row) => row.port + '/' + row.protocol"
        :pagination="pagination"
        @update:checked-row-keys="onChecked"
        @update:page="onPageChange"
        @update:page-size="onPageSizeChange"
      />
    </n-space>
  </CommonPage>
</template>

<style scoped lang="scss"></style>
