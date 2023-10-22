import { request } from '@/utils'

export default {
  // 获取信息
  info: () => request.get('/panel/ssh/info'),
  // 保存信息
  saveInfo: (host: string, port: number, user: string, password: string) =>
    request.post('/panel/ssh/info', { host, port, user, password })
}
