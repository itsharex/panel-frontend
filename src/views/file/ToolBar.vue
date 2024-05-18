<script setup lang="ts">
const path = defineModel<string>('path', { type: String, required: true })

onMounted(() => {
  console.log('ToolBar mounted')
  console.log(path.value)
})
</script>

<template>
  <n-flex>
    <n-popselect
      :options="[
        { label: '文件', value: 'file' },
        { label: '文件夹', value: 'folder' }
      ]"
    >
      <n-button type="primary"> 新建 </n-button>
    </n-popselect>
    <n-button> 上传 </n-button>
    <n-button> 远程下载 </n-button>
    <div ml-auto>
      <n-flex>
        <n-button> 粘贴 </n-button>
        <n-button-group>
          <n-button> 复制 </n-button>
          <n-button> 移动 </n-button>
          <n-button> 压缩 </n-button>
          <n-button> 权限 </n-button>
          <n-button> 删除 </n-button>
        </n-button-group>
      </n-flex>
    </div>
  </n-flex>
</template>

<style scoped lang="scss"></style>
