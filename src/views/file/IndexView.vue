<script setup lang="ts">
import PathInput from '@/views/file/PathInput.vue'
import ToolBar from '@/views/file/ToolBar.vue'
import ListTable from '@/views/file/ListTable.vue'
import type { Marked } from '@/views/file/types'
import ArchiveModal from '@/views/file/ArchiveModal.vue'

const path = ref('/www')
const selected = ref<string[]>([])
const marked = ref<Marked[]>([])

const archive = ref(false)
</script>

<template>
  <common-page show-footer>
    <n-flex vertical :size="20">
      <n-alert type="info"> 该页面尚未开发完善，如遇部分功能无法使用为正常现象 </n-alert>
      <path-input v-model:path="path" />
      <tool-bar
        v-model:path="path"
        v-model:selected="selected"
        v-model:marked="marked"
        v-model:archive="archive"
      />
      <list-table
        v-model:path="path"
        v-model:selected="selected"
        v-model:marked="marked"
        v-model:archive="archive"
      />
      <archive-modal v-model:show="archive" v-model:path="path" v-model:selected="selected" />
    </n-flex>
  </common-page>
</template>
