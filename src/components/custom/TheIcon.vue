<script lang="ts" setup>
import { renderIcon } from '@/utils'

const props = withDefaults(defineProps<Props>(), {
  size: 14,
  color: undefined,
  type: 'iconify'
})

interface Props {
  icon: string
  size?: number
  color?: string
  /** iconify | custom */
  type?: string
}
</script>

<template>
  <component :is="renderIcon(props.icon, { size: props.size, color: props.color })" />
</template>
