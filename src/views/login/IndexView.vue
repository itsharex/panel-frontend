<script lang="ts" setup>
import {useStorage} from '@vueuse/core'
import {getLocal, removeLocal, setLocal, setToken} from '@/utils'
import bgImg from '@/assets/images/login_bg.webp'
import {addDynamicRoutes} from '@/router'
import user from '@/api/panel/user'

const title: string = import.meta.env.VITE_APP_TITLE

const router = useRouter()
const route = useRoute()
const query = route.query

interface LoginInfo {
  username: string
  password: string
}

const loginInfo = ref<LoginInfo>({
  username: '',
  password: ''
})

const localLoginInfo = getLocal('loginInfo') as LoginInfo
if (localLoginInfo) {
  loginInfo.value.username = localLoginInfo.username || ''
  loginInfo.value.password = localLoginInfo.password || ''
}

const loging = ref<boolean>(false)
const isRemember = useStorage('isRemember', false)

async function handleLogin() {
  const {username, password} = loginInfo.value
  if (!username || !password) {
    window.$message.warning('请输入用户名和密码')
    return
  }
  try {
    user.login(username, password).then(async (res) => {
      loging.value = true
      window.$notification?.success({title: '登录成功！', duration: 2500})
      setToken(res.data.access_token)
      if (isRemember.value) {
        setLocal('loginInfo', {username, password})
      } else {
        removeLocal('loginInfo')
      }

      await addDynamicRoutes()
      if (query.redirect) {
        const path = query.redirect as string
        Reflect.deleteProperty(query, 'redirect')
        router.push({path, query})
      } else {
        router.push('/')
      }
    })
  } catch (error) {
    console.error(error)
  }
  loging.value = false
}
</script>

<template>
  <AppPage :show-footer="true" :style="{ backgroundImage: `url(${bgImg})` }" bg-cover>
    <div bg-opacity-60 bg-white card-shadow dark:bg-dark f-c-c m-auto min-w-345 p-15 rounded-10>
      <div hidden md:block px-20 py-35 w-380>
        <img alt="login_banner" src="@/assets/images/login_banner.png" w-full/>
      </div>

      <div flex-col px-20 py-35 w-320>
        <h5 color="#6a6a6a" f-c-c font-normal text-24>
          <img class="mr-10" height="50" src="@/assets/images/logo.png"/>{{ title }}
        </h5>
        <div mt-30>
          <n-input
              v-model:value="loginInfo.username"
              :maxlength="32"
              autofocus
              class="h-50 items-center pl-10 text-16"
              placeholder="用户名"
          />
        </div>
        <div mt-30>
          <n-input
              v-model:value="loginInfo.password"
              :maxlength="32"
              class="h-50 items-center pl-10 text-16"
              placeholder="密码"
              show-password-on="mousedown"
              type="password"
              @keydown.enter="handleLogin"
          />
        </div>

        <div mt-20>
          <n-checkbox
              :checked="isRemember"
              :on-update:checked="(val: boolean) => (isRemember = val)"
              label="记住我"
          />
        </div>

        <div mt-20>
          <n-button
              :loading="loging"
              h-50
              rounded-5
              text-16
              type="primary"
              w-full
              @click="handleLogin"
          >
            登录
          </n-button>
        </div>
      </div>
    </div>
  </AppPage>
</template>
