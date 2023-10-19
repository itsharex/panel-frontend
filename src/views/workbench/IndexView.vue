<script lang="ts" setup>
import {useUserStore} from '@/store'

const userStore = useUserStore()
</script>

<template>
  <AppPage :show-footer="true" min-w-375>
    <div flex-1 min-w-375>
      <n-watermark
          :content="userStore.name"
          :font-size="16"
          :height="128"
          :line-height="16"
          :rotate="-15"
          :width="192"
          :x-offset="12"
          :y-offset="28"
          cross
          selectable
      >
        <n-card rounded-10>
          <div flex items-center>
            <img :src="userStore.avatar" rounded-full width="60"/>
            <div ml-20>
              <p text-16>Hello, {{ userStore.name }} ！</p>
              <n-gradient-text
                  gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
                  mt-5
                  op-60
                  text-12
              >
                他日若遂凌云志，敢笑黄巢不丈夫~
              </n-gradient-text>
            </div>
            <div hidden items-center md:flex ml-auto>
              <n-statistic :value="4" label="待办" w-80>
                <template #suffix> / 10</template>
              </n-statistic>
              <n-statistic label="Stars" ml-20 w-80>
                <a href="https://github.com/zclzone/qs-admin">
                  <img allt="stars" src="https://badgen.net/github/stars/zclzone/qs-admin"/>
                </a>
              </n-statistic>
              <n-statistic label="Forks" ml-20 w-80>
                <a href="https://github.com/zclzone/qs-admin">
                  <img allt="forks" src="https://badgen.net/github/forks/zclzone/qs-admin"/>
                </a>
              </n-statistic>
            </div>
          </div>
        </n-card>
      </n-watermark>

      <n-card :segmented="true" mt-15 rounded-10 size="small" title="项目">
        <template #header-extra>
          <n-button text type="primary"> 更多</n-button>
        </template>
        <div flex flex-wrap justify-around>
          <n-card
              v-for="i in 20"
              :key="i"
              cursor-pointer
              flex-shrink-0
              hover:card-shadow
              mb-10
              mt-10
              size="small"
              title="耗子Admin"
              w-300
          >
            <p op-60>
              一个基于 Vue3、Vite3、TypeScript、Pinia、Unocss、Naive UI 的轻量级后台管理模板
            </p>
          </n-card>
          <div h-0 w-300/>
          <div h-0 w-300/>
          <div h-0 w-300/>
          <div h-0 w-300/>
        </div>
      </n-card>
    </div>
  </AppPage>
</template>
