<script lang="ts" setup>
interface Props {
  showFooter?: boolean
  showHeader?: boolean
  title?: string
}

withDefaults(defineProps<Props>(), {
  showFooter: false,
  showHeader: true,
  title: undefined
})

const route = useRoute()
</script>

<template>
  <AppPage :show-footer="showFooter">
    <header v-if="showHeader" flex items-center justify-between mb-15 min-h-45 px-15>
      <slot v-if="$slots.header" name="header"/>
      <template v-else>
        <h2 font-normal text-22>
          {{ title || route.meta?.title }}
        </h2>
        <slot name="action"/>
      </template>
    </header>

    <n-card flex-1 rounded-10>
      <slot/>
    </n-card>
  </AppPage>
</template>
