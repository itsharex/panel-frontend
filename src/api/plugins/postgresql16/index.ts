import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/postgresql16/status'),
  // 重载
  reload: () => request.post('/plugins/postgresql16/reload'),
  // 重启
  restart: () => request.post('/plugins/postgresql16/restart'),
  // 启动
  start: () => request.post('/plugins/postgresql16/start'),
  // 停止
  stop: () => request.post('/plugins/postgresql16/stop'),
  // 负载状态
  load: () => request.get('/plugins/postgresql16/load'),
  // 获取配置
  config: () => request.get('/plugins/postgresql16/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/postgresql16/config', { config }),
  // 获取用户配置
  userConfig: () => request.get('/plugins/postgresql16/userConfig'),
  // 保存配置
  saveUserConfig: (config: string) => request.post('/plugins/postgresql16/userConfig', { config }),
  // 获取日志
  log: () => request.get('/plugins/postgresql16/log'),
  // 清空错误日志
  clearLog: () => request.post('/plugins/postgresql16/clearLog'),
  // 数据库列表
  databases: (page: number, limit: number) =>
    request.get('/plugins/postgresql16/databases', { params: { page, limit } }),
  // 创建数据库
  addDatabase: (database: any) => request.post('/plugins/postgresql16/databases', database),
  // 删除数据库
  deleteDatabase: (database: string) =>
    request.delete('/plugins/postgresql16/databases', { params: { database } }),
  // 备份列表
  backups: (page: number, limit: number) =>
    request.get('/plugins/postgresql16/backups', { params: { page, limit } }),
  // 创建备份
  createBackup: (database: string) =>
    request.post('/plugins/postgresql16/backups', { database }, { timeout: 0 }),
  // 上传备份
  uploadBackup: (backup: any) =>
    request.put('/plugins/postgresql16/backups', backup, { timeout: 0 }),
  // 删除备份
  deleteBackup: (name: string) =>
    request.delete('/plugins/postgresql16/backups', { params: { name } }),
  // 还原备份
  restoreBackup: (backup: string, database: string) =>
    request.post('/plugins/postgresql16/backups/restore', { backup, database }, { timeout: 0 }),
  // 用户列表
  users: (page: number, limit: number) =>
    request.get('/plugins/postgresql16/users', { params: { page, limit } }),
  // 创建用户
  addUser: (user: any) => request.post('/plugins/postgresql16/users', user),
  // 删除用户
  deleteUser: (user: string) => request.delete('/plugins/postgresql16/users', { params: { user } }),
  // 设置用户密码
  setUserPassword: (user: string, password: string) =>
    request.post('/plugins/postgresql16/users/password', { user, password })
}
