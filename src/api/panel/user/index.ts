import { request } from '@/utils'
import type { AxiosResponse } from 'axios'
import type { RequestConfig } from '~/types/axios'

export default {
  // 登录
  login: (username: string, password: string): Promise<AxiosResponse<any>> =>
    request.post(
      '/panel/user/login',
      {
        username,
        password
      },
      { noNeedToken: true } as RequestConfig
    ),
  // 获取用户信息
  info: (): Promise<AxiosResponse<any>> => request.get('/panel/user/info'),
  // 刷新 Token
  refresh: (): Promise<AxiosResponse<any>> => request.post('/panel/user/refresh')
}
