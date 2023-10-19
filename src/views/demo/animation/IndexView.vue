<script lang="ts" setup>
import {shuffle} from 'lodash-es'

interface NumItem {
  id: number
  num: number
}

const numList = ref<NumItem[]>(
    new Array(81).fill(undefined).map((item, index) => ({id: index, num: (index % 9) + 1}))
)
</script>

<template>
  <CommonPage :show-footer="true">
    <n-button type="primary" @click="numList = shuffle(numList)"> 打乱</n-button>
    <transition-group
        bg-white
        dark:bg-dark
        f-c-c
        flex-wrap
        move-class="transition-500"
        mt-15
        p-30
        rounded-15
        tag="ul"
        w-510
    >
      <li
          v-for="item in numList"
          :key="item.id"
          bc-ccc
          border-1
          color-primary
          f-c-c
          h-40
          m-5
          rounded-full
          w-40
      >
        {{ item.num }}
      </li>
    </transition-group>
  </CommonPage>
</template>
