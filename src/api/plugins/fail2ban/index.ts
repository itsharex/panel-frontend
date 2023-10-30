import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/fail2ban/status'),
  // 重载
  reload: () => request.post('/plugins/fail2ban/reload'),
  // 重启
  restart: () => request.post('/plugins/fail2ban/restart'),
  // 启动
  start: () => request.post('/plugins/fail2ban/start'),
  // 停止
  stop: () => request.post('/plugins/fail2ban/stop'),
  // 保护列表
  jails: (page: number, limit: number) =>
    request.get('/plugins/fail2ban/jails', { params: { page, limit } }),
  // 添加保护
  add: (data: any) => request.post('/plugins/fail2ban/jails', data),
  // 删除保护
  delete: (name: string) => request.delete('/plugins/fail2ban/jails', { params: { name } }),
  // 封禁列表
  jail: (name: string) => request.get('/plugins/fail2ban/jails/' + name),
  // 解封 IP
  unban: (name: string, ip: string) => request.post('/plugins/fail2ban/unban', { name, ip }),
  // 获取白名单
  whitelist: () => request.get('/plugins/fail2ban/whiteList'),
  // 设置白名单
  setWhitelist: (ip: string) => request.post('/plugins/fail2ban/whiteList', { ip })
}
