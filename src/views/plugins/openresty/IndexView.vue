<script setup lang="ts">
import { NButton, NDataTable, NPopconfirm } from 'naive-ui'
import openresty from '@/api/plugins/openresty'
import Editor from '@guolao/vue-monaco-editor'

const currentTab = ref('status')
const status = ref(false)
const config = ref('')
const errorLog = ref('')

const statusType = computed(() => {
  return status.value ? 'success' : 'error'
})

const statusStr = computed(() => {
  return status.value ? '正常运行中' : '已停止运行'
})

const columns: any = [
  { title: '属性', key: 'name', fixed: 'left', resizable: true, ellipsis: { tooltip: true } },
  { title: '当前值', key: 'value', width: 200, ellipsis: { tooltip: true } }
]

const load = ref<any[]>([])

const getLoad = async () => {
  const { data } = await openresty.load()
  return data
}

const getStatus = async () => {
  openresty.status().then((res: any) => {
    status.value = res.data
  })
}

const getErrorLog = async () => {
  const { data } = await openresty.errorLog()
  return data
}

const getConfig = async () => {
  const { data } = await openresty.config()
  return data
}

const handleSaveConfig = async () => {
  await openresty.saveConfig(config.value)
  window.$message.success('保存成功')
}

const handleClearErrorLog = async () => {
  await openresty.clearErrorLog()
  getErrorLog().then((res) => {
    errorLog.value = res
  })
  window.$message.success('清空成功')
}

const handleStart = async () => {
  await openresty.start()
  window.$message.success('启动成功')
  await getStatus()
}

const handleStop = async () => {
  await openresty.stop()
  window.$message.success('停止成功')
  await getStatus()
}

const handleRestart = async () => {
  await openresty.restart()
  window.$message.success('重启成功')
  await getStatus()
}

const handleReload = async () => {
  await openresty.reload()
  window.$message.success('重载成功')
  await getStatus()
}

onMounted(() => {
  getStatus()
  getLoad().then((res) => {
    load.value = res
  })
  getErrorLog().then((res) => {
    errorLog.value = res
  })
  getConfig().then((res) => {
    config.value = res
  })
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <n-button
        v-if="currentTab == 'config'"
        class="ml-16"
        type="primary"
        @click="handleSaveConfig"
      >
        <TheIcon :size="18" class="mr-5" icon="material-symbols:save-outline" />
        保存
      </n-button>
      <n-button
        v-if="currentTab == 'error-log'"
        class="ml-16"
        type="primary"
        @click="handleClearErrorLog"
      >
        <TheIcon :size="18" class="mr-5" icon="material-symbols:delete-outline" />
        清空日志
      </n-button>
    </template>
    <n-tabs v-model:value="currentTab" type="line" animated>
      <n-tab-pane name="status" tab="运行状态">
        <n-card title="运行状态" rounded-10>
          <n-space vertical>
            <n-alert :type="statusType">
              {{ statusStr }}
            </n-alert>
            <n-space>
              <n-button type="success" @click="handleStart">
                <TheIcon
                  :size="24"
                  class="mr-5"
                  icon="material-symbols:play-arrow-outline-rounded"
                />
                启动
              </n-button>
              <n-popconfirm @positive-click="handleStop">
                <template #trigger>
                  <n-button type="error">
                    <TheIcon :size="24" class="mr-5" icon="material-symbols:stop-outline-rounded" />
                    停止
                  </n-button>
                </template>
                停止 OpenResty 会导致所有网站无法访问，确定要停止吗？
              </n-popconfirm>
              <n-button type="warning" @click="handleRestart">
                <TheIcon :size="18" class="mr-5" icon="material-symbols:replay-rounded" />
                重启
              </n-button>
              <n-button type="primary" @click="handleReload">
                <TheIcon :size="20" class="mr-5" icon="material-symbols:refresh-rounded" />
                重载
              </n-button>
            </n-space>
          </n-space>
        </n-card>
      </n-tab-pane>
      <n-tab-pane name="config" tab="修改配置">
        <n-space vertical>
          <n-alert type="warning">
            此处修改的是 OpenResty 主配置文件，如果你不了解各参数的含义，请不要随意修改！
          </n-alert>
          <n-alert type="info">提示：Ctrl+F 搜索关键字，Ctrl+S 保存，Ctrl+H 查找替换！</n-alert>
          <Editor
            v-model:value="config"
            language="ini"
            theme="vs-dark"
            height="60vh"
            mt-8
            :options="{
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true
            }"
          />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="load" tab="负载状态">
        <n-data-table striped remote :loading="false" :columns="columns" :data="load" />
      </n-tab-pane>
      <n-tab-pane name="error-log" tab="错误日志">
        <Editor
          v-model:value="errorLog"
          language="ini"
          theme="vs-dark"
          height="60vh"
          :line="999999"
          mt-8
          :options="{
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
            readOnly: true
          }"
        />
      </n-tab-pane>
    </n-tabs>
  </CommonPage>
</template>
