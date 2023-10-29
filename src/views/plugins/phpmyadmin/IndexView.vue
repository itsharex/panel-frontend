<script setup lang="ts">
import { NButton } from 'naive-ui'
import phpmyadmin from '@/api/plugins/phpmyadmin'
import '@/utils/common/ace-config'

const hostname = ref(window.location.hostname)
const port = ref(0)
const path = ref('')
const newPort = ref(0)
const url = computed(() => {
  return `http://${hostname.value}:${port.value}/${path.value}`
})

const getInfo = async () => {
  phpmyadmin.info().then((res: any) => {
    path.value = res.data.path
    port.value = res.data.port
    newPort.value = res.data.port
  })
}

const handleSave = async () => {
  await phpmyadmin.port(newPort.value)
  window.$message.success('保存成功')
  await getInfo()
}

onMounted(() => {
  getInfo()
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <n-button class="ml-16" type="primary" @click="handleSave">
        <TheIcon :size="18" class="mr-5" icon="material-symbols:save-outline" />
        保存
      </n-button>
    </template>
    <n-space vertical>
      <n-card title="访问信息" rounded-10>
        <n-alert type="info">
          访问地址: <a :href="url" target="_blank">{{ url }}</a>
        </n-alert>
      </n-card>
      <n-card title="修改端口" rounded-10>
        <n-input-number v-model:value="newPort" min="1" />
        修改 phpMyAdmin 访问端口
      </n-card>
    </n-space>
  </CommonPage>
</template>
