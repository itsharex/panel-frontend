<script setup lang="ts">
import setting from '@/api/panel/setting'

const model = ref({
  name: '',
  username: '',
  password: '',
  email: '',
  port: '',
  entrance: '',
  website_path: '',
  backup_path: ''
})

const getSetting = () => {
  setting.list().then((res) => {
    model.value = res.data
  })
}

const handleSave = () => {
  setting.update(model.value).then(() => {
    window.$message.success('保存成功')
  })
}

onMounted(() => {
  getSetting()
})
</script>

<template>
  <CommonPage show-footer>
    <n-form>
      <n-form-item label="面板名称">
        <n-input v-model:value="model.name" placeholder="耗子 Linux 面板" />
      </n-form-item>
      <n-form-item label="用户名">
        <n-input v-model:value="model.username" placeholder="admin" />
      </n-form-item>
      <n-form-item label="密码">
        <n-input v-model:value="model.password" placeholder="admin" />
      </n-form-item>
      <n-form-item label="邮箱（以后可能会有用）">
        <n-input v-model:value="model.email" placeholder="admin@example.com" />
      </n-form-item>
      <n-form-item label="端口（保存后需要重启面板并修改浏览器地址栏的端口为新端口以访问面板）">
        <n-input v-model:value="model.port" placeholder="8888" />
      </n-form-item>
      <n-form-item label="安全入口（保存后需要重启面板并修改浏览器地址栏的入口为新入口以访问面板）">
        <n-input v-model:value="model.entrance" placeholder="admin" />
      </n-form-item>
      <n-form-item label="默认建站目录">
        <n-input v-model:value="model.website_path" placeholder="/www/wwwroot" />
      </n-form-item>
      <n-form-item label="默认备份目录">
        <n-input v-model:value="model.backup_path" placeholder="/www/backup" />
      </n-form-item>
    </n-form>
    <n-button type="primary" @click="handleSave"> 保存 </n-button>
  </CommonPage>
</template>

<style scoped lang="scss"></style>
