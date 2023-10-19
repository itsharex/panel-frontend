<script lang="ts" setup>
import BreadCrumb from './components/BreadCrumb.vue'
import MenuCollapse from './components/MenuCollapse.vue'
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
import ThemeMode from './components/ThemeMode.vue'
</script>

<template>
  <div flex items-center>
    <MenuCollapse/>
    <BreadCrumb hidden ml-15 sm:block/>
  </div>
  <div flex items-center ml-auto>
    <ThemeMode/>
    <FullScreen/>
    <UserAvatar/>
  </div>
</template>
