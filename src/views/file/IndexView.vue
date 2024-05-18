<script setup lang="ts">
import PathInput from '@/views/file/PathInput.vue'
import ToolBar from '@/views/file/ToolBar.vue'
import ListTable from '@/views/file/ListTable.vue'

const path = ref('/www')
</script>

<template>
  <common-page show-footer>
    <n-flex vertical :size="20">
      <path-input v-model:path="path" />
      <tool-bar v-model:path="path" />
      <list-table v-model:path="path" />
    </n-flex>
  </common-page>
</template>
