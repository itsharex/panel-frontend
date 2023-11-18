<script setup lang="ts">
import type { Plugin } from '@/views/plugin/types'
import { NButton, NDataTable, NPopconfirm, NSwitch } from 'naive-ui'
import plugin from '@/api/panel/plugin'
import { renderIcon } from '@/utils'
import { router } from '@/router'

const columns: any = [
  { type: 'selection', fixed: 'left' },
  { title: '插件名', key: 'name', width: 150, resizable: true, ellipsis: { tooltip: true } },
  { title: '描述', key: 'description', resizable: true, ellipsis: { tooltip: true } },
  { title: '已装版本', key: 'installed_version', width: 100, ellipsis: { tooltip: true } },
  { title: '最新版本', key: 'version', width: 100, ellipsis: { tooltip: true } },
  {
    title: '首页显示',
    key: 'show',
    width: 100,
    align: 'center',
    render(row: any) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row.show,
        onUpdateValue: () => handleShowChange(row)
      })
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        row.installed && row.installed_version != row.version
          ? h(
              NPopconfirm,
              {
                onPositiveClick: () => handleUpdate(row.slug)
              },
              {
                default: () => {
                  return '升级插件可能会重置相关配置到默认状态，确定继续吗？'
                },
                trigger: () => {
                  return h(
                    NButton,
                    {
                      size: 'small',
                      type: 'warning',
                      secondary: true
                    },
                    {
                      default: () => '升级',
                      icon: renderIcon('material-symbols:arrow-circle-up-outline-rounded', {
                        size: 14
                      })
                    }
                  )
                }
              }
            )
          : null,
        row.installed && row.installed_version == row.version
          ? h(
              NButton,
              {
                size: 'small',
                type: 'success',
                style: 'margin-left: 15px;',
                onClick: () => handleManage(row.slug)
              },
              {
                default: () => '管理',
                icon: renderIcon('material-symbols:settings-outline', { size: 14 })
              }
            )
          : null,
        row.installed && row.installed_version == row.version
          ? h(
              NPopconfirm,
              {
                onPositiveClick: () => handleUninstall(row.slug)
              },
              {
                default: () => {
                  return '确定卸载插件吗？'
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
                      default: () => '卸载',
                      icon: renderIcon('material-symbols:delete-outline', { size: 14 })
                    }
                  )
                }
              }
            )
          : null,
        !row.installed
          ? h(
              NPopconfirm,
              {
                onPositiveClick: () => handleInstall(row.slug)
              },
              {
                default: () => {
                  return '确定安装插件吗？'
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
                      default: () => '安装',
                      icon: renderIcon('material-symbols:download-rounded', { size: 14 })
                    }
                  )
                }
              }
            )
          : null
      ]
    }
  }
]

const plugins = ref<Plugin[]>([] as Plugin[])

const selectedRowKeys = ref<any>([])

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const handleShowChange = (row: any) => {
  plugin.updateShow(row.slug, !row.show).then(() => {
    window.$message.success('设置成功')
    row.show = !row.show
  })
}

const handleInstall = (slug: string) => {
  plugin.install(slug).then(() => {
    window.$message.success('任务已提交，请稍后查看任务进度')
  })
}

const handleUpdate = (slug: string) => {
  plugin.update(slug).then(() => {
    window.$message.success('任务已提交，请前往任务中心查看任务进度')
  })
}

const handleUninstall = (slug: string) => {
  plugin.uninstall(slug).then(() => {
    window.$message.success('任务已提交，请前往任务中心查看任务进度')
  })
}

const handleManage = (slug: string) => {
  router.push({ name: 'plugins-' + slug + '-index' })
}

const getPluginList = async (page: number, limit: number) => {
  const { data } = await plugin.list(page, limit)
  return data
}

const onChecked = (rowKeys: any) => {
  selectedRowKeys.value = rowKeys
}

const onPageChange = (page: number) => {
  pagination.page = page
  getPluginList(page, pagination.pageSize).then((res) => {
    plugins.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
}

const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  onPageChange(1)
}

const toTask = () => {
  router.push({ name: 'task-index' })
}

onMounted(() => {
  onPageChange(pagination.page)
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <div>
        <n-button class="ml-16" type="primary" @click="toTask">
          <TheIcon :size="18" class="mr-5" icon="mdi:archive-sync-outline" />
          任务中心
        </n-button>
      </div>
    </template>
    <n-space vertical>
      <n-alert type="info">按钮点击一次即可，请勿重复点击以免重复执行！</n-alert>
      <n-alert type="warning">升级插件前强烈建议先备份/快照，以免出现问题时无法回滚！</n-alert>
      <n-data-table
        striped
        remote
        :loading="false"
        :columns="columns"
        :data="plugins"
        :row-key="(row) => row.slug"
        :pagination="pagination"
        @update:checked-row-keys="onChecked"
        @update:page="onPageChange"
        @update:page-size="onPageSizeChange"
      />
    </n-space>
  </CommonPage>
</template>
