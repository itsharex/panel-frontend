<script setup lang="ts">
import { NButton, NPopconfirm, NPopselect, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import file from '@/api/panel/file'
import TheIcon from '@/components/custom/TheIcon.vue'

const loading = ref(false)
const path = defineModel<string>('path', { type: String, required: true })

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
                    // TODO 编辑文件
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

const getExt = (filename: string) => {
  const dot = filename.lastIndexOf('.')
  if (dot === -1 || dot === 0) {
    return ''
  }
  return filename.slice(dot + 1)
}

const getIconByExt = (ext: string) => {
  switch (ext) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'bi:file-earmark-image'
    case 'mp4':
    case 'avi':
    case 'mkv':
    case 'rmvb':
      return 'bi:file-earmark-play'
    case 'mp3':
    case 'flac':
    case 'wav':
    case 'ape':
      return 'bi:file-earmark-music'
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return 'bi:file-earmark-zip'
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
      return 'bi:file-earmark-word'
    case 'ppt':
    case 'pptx':
      return 'bi:file-earmark-ppt'
    case 'pdf':
      return 'bi:file-earmark-pdf'
    case 'txt':
    case 'md':
    case 'log':
    case 'conf':
    case 'ini':
    case 'yaml':
    case 'yml':
      return 'bi:file-earmark-text'
    case 'html':
    case 'htm':
    case 'xml':
    case 'json':
    case 'js':
    case 'css':
    case 'ts':
    case 'vue':
    case 'jsx':
    case 'tsx':
    case 'php':
    case 'java':
    case 'py':
    case 'go':
    case 'rb':
    case 'sh':
      return 'bi:file-earmark-code'
    case '':
      return 'bi:file-earmark-binary'
    default:
      return 'bi:file-earmark'
  }
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
    :row-key="(row) => row.full"
    max-height="60vh"
    remote
    striped
    virtual-scroll
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChange"
  />
</template>

<style scoped lang="scss"></style>
