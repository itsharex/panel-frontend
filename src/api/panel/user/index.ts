import {request} from '@/utils'
import type {RequestConfig} from "~/types/axios";

export default {
  // 登录
  login: (username: string, password: string) => request.post('/user/login', {
    username,
    password,
  }, {noNeedToken: true} as RequestConfig),
  // 获取用户信息
  info: () => request.get('/user/info'),
  // 刷新 Token
  refresh: () => request.post('/user/refresh')
}
