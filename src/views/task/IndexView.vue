<script setup lang="ts">
import type { Task } from '@/views/task/types'
import { NButton, NDataTable, NPopconfirm } from 'naive-ui'
import { renderIcon } from '@/utils'
import task from '@/api/panel/task'
import { VAceEditor } from 'vue3-ace-editor'
import '@/utils/common/ace-config'

const taskLogModal = ref(false)
const taskLog = ref('')

const columns: any = [
  { type: 'selection', fixed: 'left' },
  { title: '任务名', key: 'name', resizable: true, ellipsis: { tooltip: true } },
  {
    title: '状态',
    key: 'status',
    width: 100,
    ellipsis: { tooltip: true },
    render(row: any) {
      return row.status === 'finished'
        ? '已完成'
        : row.status === 'waiting'
        ? '等待中'
        : row.status === 'failed'
        ? '已失败'
        : '运行中'
    }
  },
  { title: '创建时间', key: 'created_at', width: 160, ellipsis: { tooltip: true } },
  { title: '更新时间', key: 'updated_at', width: 160, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        row.status != 'waiting'
          ? h(
              NButton,
              {
                size: 'small',
                type: 'warning',
                secondary: true,
                onClick: () => handleShowLog(row)
              },
              {
                default: () => '日志',
                icon: renderIcon('material-symbols:visibility', { size: 14 })
              }
            )
          : null,
        row.status != 'waiting' && row.status != 'running'
          ? h(
              NPopconfirm,
              {
                onPositiveClick: () => handleDelete(row.id),
                onNegativeClick: () => {
                  window.$message.info('取消删除')
                }
              },
              {
                default: () => {
                  return '确定删除此任务记录吗？'
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
          : null
      ]
    }
  }
]

const tasks = ref<Task[]>([] as Task[])

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

const handleDelete = (id: number) => {
  task.delete(id).then(() => {
    window.$message.success('任务已删除')
    getTaskList(pagination.page, pagination.pageSize).then((res) => {
      tasks.value = res.items
      pagination.itemCount = res.total
      pagination.pageCount = res.total / pagination.pageSize + 1
    })
  })
}

const handleShowLog = (row: any) => {
  task.log(row.id).then((res) => {
    taskLogModal.value = true
    taskLog.value = res.data
  })
}

const getTaskList = async (page: number, limit: number) => {
  const { data } = await task.list(page, limit)
  return data
}

const onChecked = (rowKeys: any) => {
  selectedRowKeys.value = rowKeys
}

const onPageChange = (page: number) => {
  pagination.page = page
  getTaskList(page, pagination.pageSize).then((res) => {
    tasks.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
}

const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  onPageChange(1)
}

onMounted(() => {
  getTaskList(pagination.page, pagination.pageSize).then((res) => {
    tasks.value = res.items
    pagination.itemCount = res.total
    pagination.pageCount = res.total / pagination.pageSize + 1
  })
})
</script>

<template>
  <CommonPage show-footer>
    <n-data-table
      striped
      remote
      :loading="false"
      :columns="columns"
      :data="tasks"
      :row-key="(row) => row.id"
      :pagination="pagination"
      @update:checked-row-keys="onChecked"
      @update:page="onPageChange"
      @update:page-size="onPageSizeChange"
    />
  </CommonPage>
  <n-modal
    v-model:show="taskLogModal"
    preset="card"
    title="任务日志"
    style="width: 80vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <VAceEditor
      v-model:value="taskLog"
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
  </n-modal>
</template>
