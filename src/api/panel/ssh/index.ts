import { request } from '@/utils'

export default {
  // 获取信息
  info: () => request.get('/panel/ssh/info'),
  // 保存信息
  saveInfo: (info: any) => request.post('/panel/ssh/info', { info })
}
