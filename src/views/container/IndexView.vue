<script setup lang="ts">
import ContainerView from '@/views/container/ContainerView.vue'
import ImageView from '@/views/container/ImageView.vue'
import Network from '@/views/container/Network.vue'
import VolumeView from '@/views/container/VolumeView.vue'
import SettingView from '@/views/container/SettingView.vue'

const currentTab = ref('container')
</script>

<template>
  <CommonPage show-footer>
    <n-tabs v-model:value="currentTab" type="line" animated size="large">
      <n-tab-pane name="container" tab="容器">
        <ContainerView />
      </n-tab-pane>
      <n-tab-pane name="image" tab="镜像">
        <ImageView />
      </n-tab-pane>
      <n-tab-pane name="network" tab="网络">
        <Network />
      </n-tab-pane>
      <n-tab-pane name="volume" tab="卷">
        <VolumeView />
      </n-tab-pane>
      <n-tab-pane name="setting" tab="设置">
        <SettingView />
      </n-tab-pane>
    </n-tabs>
  </CommonPage>
</template>
