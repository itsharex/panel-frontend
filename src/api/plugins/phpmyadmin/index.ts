import { request } from '@/utils'

export default {
  // 获取信息
  info: () => request.get('/plugins/phpmyadmin/info'),
  // 设置端口
  port: (port: number) => request.post('/plugins/phpmyadmin/port', { port })
}
