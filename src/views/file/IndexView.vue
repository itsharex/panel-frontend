<script setup lang="ts">
import { router } from '@/router'

const goHome = () => {
  router.push({ name: 'home-index' })
}
</script>

<template>
  <CommonPage show-footer>
    <n-result status="403" title="403 禁止访问" description="这里还在施工，暂时不能访问哦~">
      <template #footer>
        <n-button @click="goHome">回家</n-button>
      </template>
    </n-result>
  </CommonPage>
</template>
