<script setup lang="ts">
import info from '@/api/panel/info'
import { NButton } from 'naive-ui'
import type { PanelInfo } from '@/views/home/types'
import { formatDateTime } from '@/utils'
import { router } from '@/router'

const versions = ref<PanelInfo[] | null>(null)

const getVersions = () => {
  info.updateInfo().then((res: any) => {
    versions.value = res.data.reverse()
  })
}

const handleUpdate = () => {
  window.$dialog.warning({
    title: '警告',
    content: '确定要更新面板？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      window.$message.loading('面板更新中...')
      info.update().then(() => {
        window.$message.success('面板更新成功')
        setTimeout(() => {
          setTimeout(() => {
            window.location.reload()
          }, 400)
          router.push({ name: 'home-index' })
        }, 2500)
      })
    },
    onNegativeClick: () => {
      window.$message.info('取消更新')
    }
  })
}

onMounted(() => {
  getVersions()
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <div>
        <n-button v-if="versions" class="ml-16" type="primary" @click="handleUpdate">
          <TheIcon
            :size="18"
            class="mr-5"
            icon="material-symbols:arrow-circle-up-outline-rounded"
          />
          立即更新
        </n-button>
      </div>
    </template>
    <n-timeline v-if="versions" pt-10>
      <n-timeline-item
        v-for="(item, index) in versions"
        :type="Number(index) == 0 ? 'info' : 'default'"
        :key="index"
        :title="item.version"
        :time="formatDateTime(item.date)"
      >
        <pre v-html="item.body" />
      </n-timeline-item>
    </n-timeline>
    <div v-else pt-40>
      <n-result status="418" title="Loading..." description="正在加载更新信息，稍等片刻">
      </n-result>
    </div>
  </CommonPage>
</template>
