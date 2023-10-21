import { defineStore } from 'pinia'
import { removeToken, toLogin } from '@/utils'
import { usePermissionStore, useTabStore } from '@/store'
import { resetRouter } from '@/router'

interface UserInfo {
  id?: string
  name?: string
  avatar?: string
  role?: Array<string>
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo>{}
    }
  },
  getters: {
    userId(): string {
      return this.userInfo.id || ''
    },
    name(): string {
      return this.userInfo.name || ''
    },
    avatar(): string {
      return this.userInfo.avatar || ''
    },
    role(): Array<string> {
      return this.userInfo.role || []
    }
  },
  actions: {
    async getUserInfo() {
      this.userInfo = {
        id: '1',
        name: 'admin',
        avatar: 'https://weavatar.com/avatar/',
        role: ['admin']
      }
    },
    async logout() {
      const { resetTabs } = useTabStore()
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetPermission()
      resetTabs()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    }
  }
})
