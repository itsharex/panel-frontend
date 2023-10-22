<script setup lang="ts">
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { getToken } from '@/utils'
import CryptoJS from 'crypto-js'
import ssh from '@/api/panel/ssh'

const msgData = '1'
const msgResize = '2'

const model = ref({
  host: '',
  port: 22,
  user: '',
  password: ''
})

const handleSave = () => {
  ssh
    .saveInfo(model.value.host, model.value.port, model.value.user, model.value.password)
    .then(() => {
      window.$message.success('保存成功')
    })
}

const getInfo = () => {
  ssh.info().then((res) => {
    model.value.host = res.data.host
    model.value.port = res.data.port
    model.value.user = res.data.user
    model.value.password = res.data.password
  })
}

const openSession = () => {
  const term = new Terminal({
    fontSize: 15,
    cursorBlink: true, // 光标闪烁
    theme: {
      foreground: '#ECECEC', // 字体
      background: '#000000', //背景色
      cursor: 'help' // 设置光标
    }
  })

  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)

  const token = String(getToken())
  let host = import.meta.env.VITE_BASE_API
  host = host.replace('https', 'wss')
  host = host.replace('http', 'ws')
  const ws = new WebSocket(`${host}/panel/ssh/session`, [token])
  ws.binaryType = 'arraybuffer'

  const enc = new TextDecoder('utf-8')
  ws.onmessage = (event) => {
    term.write(enc.decode(event.data))
  }

  ws.onopen = () => {
    term.open(document.getElementById('terminal') as HTMLElement)
    fitAddon.fit()
    term.write('\r\n欢迎来到耗子Linux面板SSH，连接成功。')
    term.write('\r\nWelcome to HaoZiPanel SSH. Connection success.\r\n')
    term.focus()
  }

  ws.onclose = () => {
    term.write('\r\nSSH连接已关闭，请刷新页面。')
    term.write('\r\nSSH connection closed. Please refresh the page.\r\n')
  }

  ws.onerror = (event) => {
    console.error(event)
    ws.close()
  }

  term.onData((data) => {
    ws.send(msgData + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)))
  })

  term.onResize(({ cols, rows }) => {
    if (ws.readyState === 1) {
      ws.send(
        msgResize +
          CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse(
              JSON.stringify({
                columns: cols,
                rows: rows
              })
            )
          )
      )
    }
  })

  window.addEventListener(
    'resize',
    () => {
      fitAddon.fit()
    },
    false
  )
}

onMounted(() => {
  getInfo()
  openSession()
})
</script>

<template>
  <CommonPage show-footer>
    <n-space vertical>
      <n-form inline>
        <n-form-item label="主机">
          <n-input v-model:value="model.host" placeholder="主机" clearable size="small" />
        </n-form-item>
        <n-form-item label="端口">
          <n-input-number v-model:value="model.port" placeholder="端口" clearable size="small" />
        </n-form-item>
        <n-form-item label="用户名">
          <n-input v-model:value="model.user" placeholder="用户名" clearable size="small" />
        </n-form-item>
        <n-form-item label="密码">
          <n-input v-model:value="model.password" placeholder="密码" clearable size="small" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="small" @click="handleSave">保存</n-button>
        </n-form-item>
      </n-form>
      <div
        id="terminal"
        style="width: 100%; height: 70vh; background-color: #000000; margin-top: 20px"
      ></div>
    </n-space>
  </CommonPage>
</template>
