<script setup lang="ts">
import { NButton, NPopconfirm, NPopselect, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import file from '@/api/panel/file'
import TheIcon from '@/components/custom/TheIcon.vue'
import { getExt, getIconByExt } from '@/utils/file'
import FileEdit from '@/views/file/FileEdit.vue'

const loading = ref(false)
const path = defineModel<string>('path', { type: String, required: true })
const editorModal = ref(false)
const editorFile = ref('')

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection'
  },
  {
    title: '名称',
    key: 'name',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      let icon = 'bi:file-earmark'
      if (row.dir) {
        icon = 'bi:folder'
      } else {
        icon = getIconByExt(getExt(row.name))
      }

      return h(
        NSpace,
        {
          onClick: () => {
            if (row.dir) {
              path.value = row.full
            }
          }
        },
        () => [h(TheIcon, { icon }), h('p', {}, row.name)]
      )
    }
  },
  { title: '权限', key: 'mode', width: '100' },
  { title: '所有者', key: 'owner', width: '100' },
  { title: '组', key: 'group', width: '100' },
  { title: '大小', key: 'size', width: '100' },
  { title: '修改时间', key: 'modify', width: '200' },
  {
    title: '操作',
    key: 'action',
    width: '340',
    render(row) {
      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                tertiary: true,
                size: 'small',
                onClick: () => {
                  if (row.dir) {
                    path.value = row.full
                  } else {
                    editorFile.value = row.full
                    editorModal.value = true
                  }
                }
              },
              {
                default: () => {
                  if (row.dir) {
                    return '打开'
                  } else {
                    return '编辑'
                  }
                }
              }
            ),
            h(
              NButton,
              {
                tertiary: true,
                size: 'small',
                onClick: () => {
                  if (row.dir) {
                    // TODO 压缩文件夹
                  } else {
                    // TODO 下载文件
                  }
                }
              },
              {
                default: () => {
                  if (row.dir) {
                    return '压缩'
                  } else {
                    return '下载'
                  }
                }
              }
            ),
            h(
              NButton,
              {
                tertiary: true,
                size: 'small',
                onClick: () => {}
              },
              { default: () => '重命名' }
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => {},
                onNegativeClick: () => {
                  window.$message.info('取消删除')
                }
              },
              {
                default: () => {
                  return '确定删除吗？'
                },
                trigger: () => {
                  return h(
                    NButton,
                    {
                      tertiary: true,
                      size: 'small',
                      type: 'error'
                    },
                    { default: () => '删除' }
                  )
                }
              }
            ),
            h(
              NPopselect,
              {
                options: [
                  { label: '权限', value: 'mode' },
                  { label: '压缩', value: 'archive' },
                  { label: '解压', value: 'unarchive' }
                ]
              },
              {
                default: () => {
                  return h(
                    NButton,
                    {
                      tertiary: true,
                      size: 'small'
                    },
                    { default: () => '更多' }
                  )
                }
              }
            )
          ]
        }
      )
    }
  }
]

const data = ref<RowData[]>([])

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 20,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [20, 50, 100, 200, 500, 1000]
})

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  handlePageChange(1)
}

const handlePageChange = async (page: number) => {
  loading.value = true
  await getList(path.value, page, pagination.pageSize!)
  loading.value = false
}

const getList = async (path: string, page: number, limit: number) => {
  await file.list(path, page, limit).then((res) => {
    data.value = res.data.items
    pagination.page = page
    pagination.itemCount = res.data.total
    pagination.pageCount = res.data.total / pagination.pageSize! + 1
  })
}

onMounted(() => {
  watch(
    path,
    () => {
      handlePageChange(1)
    },
    { immediate: true }
  )
})
</script>

<template>
  <n-data-table
    size="small"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="(row: any) => row.full"
    max-height="60vh"
    remote
    striped
    virtual-scroll
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChange"
  />

  <file-edit v-model:show="editorModal" v-model:file="editorFile" />
</template>

<style scoped lang="scss"></style>
