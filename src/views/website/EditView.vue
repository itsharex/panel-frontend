<script setup lang="ts">
import type { WebsiteSetting } from '@/views/website/types'
import website from '@/api/panel/website'
import { NButton } from 'naive-ui'
import info from '@/api/panel/info'
import Editor from '@guolao/vue-monaco-editor'
import '@/utils/common/editor'

const route = useRoute()
const { id } = route.params

const setting = ref<WebsiteSetting | null>(null)
const installedDbAndPhp = ref({
  php: [
    {
      label: '',
      value: ''
    }
  ],
  db: [
    {
      label: '',
      value: ''
    }
  ]
})

const getPhpAndDb = async () => {
  const { data } = await info.installedDbAndPhp()
  installedDbAndPhp.value = data
}

const getWebsiteSetting = async () => {
  await website.config(Number(id)).then((res) => {
    setting.value = res.data
  })
}

const handleSave = async () => {
  await website.saveConfig(Number(id), setting.value).then(() => {
    getWebsiteSetting()
    window.$message.success('保存成功')
  })
}

const handleReset = async () => {
  await website.resetConfig(Number(id)).then(() => {
    getWebsiteSetting()
    window.$message.success('重置成功')
  })
}

const clearLog = async () => {
  await website.clearLog(Number(id)).then(() => {
    getWebsiteSetting()
    window.$message.success('清空成功')
  })
}

const title = computed(() => {
  if (setting.value) {
    return `编辑网站 - ${setting.value.name}`
  }
  return '编辑网站 - 加载中...'
})

onMounted(() => {
  getWebsiteSetting()
  getPhpAndDb()
})
</script>

<template>
  <CommonPage show-footer :title="title">
    <template #action>
      <div flex items-center>
        <n-tag type="warning">如果你修改了原文，那么点击保存后，其余的修改将不会生效！</n-tag>
        <n-button class="ml-16" type="primary" @click="handleSave">
          <TheIcon :size="18" class="mr-5" icon="material-symbols:save-outline" />
          保存
        </n-button>
      </div>
    </template>

    <n-tabs type="line" animated>
      <n-tab-pane name="domain" tab="域名端口">
        <n-form v-if="setting">
          <n-form-item label="域名">
            <n-dynamic-input
              v-model:value="setting.domains"
              placeholder="example.com"
              :min="1"
              show-sort-button
            />
          </n-form-item>
          <n-form-item label="端口">
            <n-dynamic-input
              v-model:value="setting.ports"
              placeholder="80"
              :min="1"
              show-sort-button
            />
          </n-form-item>
        </n-form>
        <n-skeleton v-else text :repeat="10" />
      </n-tab-pane>
      <n-tab-pane name="basic" tab="基本设置">
        <n-form v-if="setting">
          <n-form-item label="网站目录">
            <n-input v-model:value="setting.path" placeholder="输入网站目录（绝对路径）" />
          </n-form-item>
          <n-form-item label="运行目录">
            <n-input
              v-model:value="setting.root"
              placeholder="输入运行目录（Laravel等程序需要）（绝对路径）"
            />
          </n-form-item>
          <n-form-item label="默认文档">
            <n-input v-model:value="setting.index" placeholder="输入默认文档（多个用空格分隔）" />
          </n-form-item>
          <n-form-item label="PHP版本">
            <n-select
              v-model:value="setting.php"
              default-value="0"
              :options="installedDbAndPhp.php"
              placeholder="选择PHP版本"
              @keydown.enter.prevent
            >
            </n-select>
          </n-form-item>
          <n-form-item label="防跨站攻击">
            <n-switch v-model:value="setting.open_basedir" />
          </n-form-item>
        </n-form>
        <n-skeleton v-else text :repeat="10" />
      </n-tab-pane>
      <n-tab-pane name="waf" tab="防火墙">
        <n-alert type="info" mb-20>
          面板自带开源的 ngx_waf 防火墙
          <br />
          文档参考：<a
            href="https://docs.addesp.com/ngx_waf/zh-cn/advance/directive.html"
            target="_blank"
            >https://docs.addesp.com/ngx_waf/zh-cn/advance/directive.html</a
          >
        </n-alert>
        <n-form v-if="setting">
          <n-form-item label="总开关">
            <n-space vertical>
              <n-switch v-model:value="setting.waf" />
              <n-tag>只有打开了总开关，下面的设置才会生效！</n-tag>
            </n-space>
          </n-form-item>
          <n-form-item label="模式">
            <n-input v-model:value="setting.waf_mode" placeholder="DYNAMIC" />
          </n-form-item>
          <n-form-item label="CC">
            <n-input v-model:value="setting.waf_cc_deny" placeholder="rate=1000r/m duration=60m" />
          </n-form-item>
          <n-form-item label="缓存">
            <n-input v-model:value="setting.waf_cache" placeholder="capacity=50" />
          </n-form-item>
        </n-form>
        <n-skeleton v-else text :repeat="10" />
      </n-tab-pane>
      <n-tab-pane name="ssl" tab="SSL">
        <n-form v-if="setting">
          <n-form-item label="总开关">
            <n-space vertical>
              <n-switch v-model:value="setting.ssl" />
              <n-tag>只有打开了总开关，下面的设置才会生效！</n-tag>
            </n-space>
          </n-form-item>
        </n-form>
        <n-form v-if="setting" inline>
          <n-form-item label="HTTP跳转">
            <n-switch v-model:value="setting.http_redirect" />
          </n-form-item>
          <n-form-item label="HSTS">
            <n-switch v-model:value="setting.hsts" />
          </n-form-item>
        </n-form>
        <n-form v-if="setting">
          <n-form-item label="证书">
            <n-input
              v-model:value="setting.ssl_certificate"
              type="textarea"
              placeholder="输入pem证书文件的内容"
            />
          </n-form-item>
          <n-form-item label="私钥">
            <n-input
              v-model:value="setting.ssl_certificate_key"
              type="textarea"
              placeholder="输入key私钥文件的内容"
            />
          </n-form-item>
        </n-form>
        <n-skeleton v-else text :repeat="10" />
      </n-tab-pane>
      <n-tab-pane name="rewrite" tab="伪静态">
        <n-space vertical>
          <n-alert type="info">
            设置伪静态规则，填入
            <n-tag>location</n-tag>
            部分即可
          </n-alert>
          <Editor
            v-if="setting"
            v-model:value="setting.rewrite"
            language="ini"
            theme="vs-dark"
            height="60vh"
            :options="{
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true
            }"
          />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="config" tab="配置原文">
        <n-space vertical>
          <n-space flex items-center>
            <n-alert type="warning">
              如果您不了解配置规则，请勿随意修改，否则可能会导致网站无法访问或面板功能异常！如果已经遇到问题，可尝试重置配置！
            </n-alert>
            <n-popconfirm @positive-click="handleReset">
              <template #trigger>
                <n-button type="success">
                  <TheIcon :size="18" class="mr-5" icon="material-symbols:refresh" />
                  重置配置
                </n-button>
              </template>
              确定要重置配置吗？
            </n-popconfirm>
          </n-space>
          <Editor
            v-if="setting"
            v-model:value="setting.raw"
            language="ini"
            theme="vs-dark"
            height="60vh"
            :options="{
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true
            }"
          />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="log" tab="访问日志">
        <n-space vertical>
          <n-popconfirm @positive-click="clearLog">
            <template #trigger>
              <n-button type="primary">
                <TheIcon :size="18" icon="material-symbols:delete-outline" />
                清空日志
              </n-button>
            </template>
            确定要清空吗？
          </n-popconfirm>
          <Editor
            v-if="setting"
            v-model:value="setting.log"
            language="ini"
            theme="vs-dark"
            height="60vh"
            :line="999999"
            :options="{
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true,
              readOnly: true
            }"
          />
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </CommonPage>
</template>
