import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/pureftpd/status'),
  // 重启
  restart: () => request.post('/plugins/pureftpd/restart'),
  // 启动
  start: () => request.post('/plugins/pureftpd/start'),
  // 停止
  stop: () => request.post('/plugins/pureftpd/stop'),
  // 列表
  list: (page: number, limit: number) =>
    request.get('/plugins/pureftpd/list', { params: { page, limit } }),
  // 添加
  add: (username: string, password: string, path: string) =>
    request.post('/plugins/pureftpd/add', { username, password, path }),
  // 删除
  delete: (username: string) =>
    request.delete('/plugins/pureftpd/delete', { params: { username } }),
  // 修改密码
  changePassword: (username: string, password: string) =>
    request.post('/plugins/pureftpd/changePassword', { username, password }),
  // 获取端口
  port: () => request.get('/plugins/pureftpd/port'),
  // 修改端口
  setPort: (port: number) => request.post('/plugins/pureftpd/port', { port })
}
