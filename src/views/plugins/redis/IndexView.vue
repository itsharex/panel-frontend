<script setup lang="ts">
import { NButton, NDataTable, NPopconfirm } from 'naive-ui'
import { VAceEditor } from 'vue3-ace-editor'
import redis from '@/api/plugins/redis'
import '@/utils/common/ace-config'

const currentTab = ref('status')
const status = ref(false)
const config = ref('')

const statusType = computed(() => {
  return status.value ? 'success' : 'error'
})
const statusStr = computed(() => {
  return status.value ? '正常运行中' : '已停止运行'
})

const loadColumns: any = [
  { title: '属性', key: 'name', fixed: 'left', resizable: true, ellipsis: { tooltip: true } },
  { title: '当前值', key: 'value', width: 200, ellipsis: { tooltip: true } }
]

const load = ref<any[]>([])

const getLoad = async () => {
  const { data } = await redis.load()
  return data
}

const getStatus = async () => {
  await redis.status().then((res: any) => {
    status.value = res.data
  })
}

const getConfig = async () => {
  redis.config().then((res: any) => {
    config.value = res.data
  })
}

const handleSaveConfig = async () => {
  await redis.saveConfig(config.value)
  window.$message.success('保存成功')
}

const handleStart = async () => {
  await redis.start()
  window.$message.success('启动成功')
  await getStatus()
}

const handleStop = async () => {
  await redis.stop()
  window.$message.success('停止成功')
  await getStatus()
}

const handleRestart = async () => {
  await redis.restart()
  window.$message.success('重启成功')
  await getStatus()
}

onMounted(() => {
  getStatus()
  getLoad().then((res) => {
    load.value = res
  })
  getConfig()
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
    </template>
    <n-tabs v-model:value="currentTab" type="line" animated>
      <n-tab-pane name="status" tab="运行状态">
        <n-space vertical>
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
                      <TheIcon
                        :size="24"
                        class="mr-5"
                        icon="material-symbols:stop-outline-rounded"
                      />
                      停止
                    </n-button>
                  </template>
                  停止 Redis 会导致使用 Redis 的网站无法访问，确定要停止吗？
                </n-popconfirm>
                <n-button type="warning" @click="handleRestart">
                  <TheIcon :size="18" class="mr-5" icon="material-symbols:replay-rounded" />
                  重启
                </n-button>
              </n-space>
            </n-space>
          </n-card>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="config" tab="主配置">
        <n-space vertical>
          <n-alert type="warning">
            此处修改的是 Redis 主配置文件，如果你不了解各参数的含义，请不要随意修改！
          </n-alert>
          <n-alert type="info">提示：Ctrl+F 搜索关键字，Ctrl+S 保存，Ctrl+H 查找替换！</n-alert>
          <VAceEditor
            v-model:value="config"
            lang="sh"
            theme="monokai"
            style="height: 60vh"
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
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="load" tab="负载状态">
        <n-data-table striped remote :loading="false" :columns="loadColumns" :data="load" />
      </n-tab-pane>
    </n-tabs>
  </CommonPage>
</template>
