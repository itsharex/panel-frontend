<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <div>
        <n-button class="ml-16" type="primary" @click="">
          <TheIcon :size="18" class="mr-5" icon="mdi:archive-sync-outline" />
          任务中心
        </n-button>
      </div>
    </template>
    <n-space vertical>
      <n-alert type="info">按钮点击一次即可，请勿重复点击以免重复执行！</n-alert>
    </n-space>
  </CommonPage>
</template>
