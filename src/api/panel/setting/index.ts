import { request } from '@/utils'

export default {
  // 获取设置
  list: () => request.get('/panel/setting/list'),
  // 保存设置
  save: (settings: any) => request.post('/panel/setting/save', { settings })
}
