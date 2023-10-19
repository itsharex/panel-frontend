<script lang="ts" setup>
import SideBar from './sidebar/IndexView.vue'
import AppHeader from './header/IndexView.vue'
import AppTab from './tab/IndexView.vue'
import AppMain from './AppMain.vue'

import {useThemeStore} from '@/store'

const themeStore = useThemeStore()
</script>

<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
        v-if="!themeStore.isMobile"
        :collapsed="themeStore.sider.collapsed"
        :collapsed-width="themeStore.sider.collapsedWidth"
        :native-scrollbar="false"
        :width="themeStore.sider.width"
        bordered
        collapse-mode="width"
    >
      <SideBar/>
    </n-layout-sider>
    <n-drawer
        v-else
        :auto-focus="false"
        :show="!themeStore.sider.collapsed"
        :width="themeStore.sider.width"
        display-directive="show"
        placement="left"
        @mask-click="themeStore.setCollapsed(true)"
    >
      <SideBar/>
    </n-drawer>

    <article flex-1 flex-col overflow-hidden>
      <header
          :style="`height: ${themeStore.header.height}px`"
          bc-eee
          bg-white
          border-b
          dark="bg-dark border-0"
          flex
          items-center
          px-15
      >
        <AppHeader/>
      </header>
      <section v-if="themeStore.tab.visible" bc-eee border-b dark:border-0 hidden sm:block>
        <AppTab/>
      </section>
      <section bg="#f5f6fb" dark:bg-hex-101014 flex-1 overflow-hidden>
        <AppMain/>
      </section>
    </article>
  </n-layout>
</template>
