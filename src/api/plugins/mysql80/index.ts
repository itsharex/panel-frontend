import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/mysql80/status'),
  // 重载
  reload: () => request.post('/plugins/mysql80/reload'),
  // 重启
  restart: () => request.post('/plugins/mysql80/restart'),
  // 启动
  start: () => request.post('/plugins/mysql80/start'),
  // 停止
  stop: () => request.post('/plugins/mysql80/stop'),
  // 负载状态
  load: () => request.get('/plugins/mysql80/load'),
  // 获取配置
  config: () => request.get('/plugins/mysql80/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/mysql80/config', { config }),
  // 获取错误日志
  errorLog: () => request.get('/plugins/mysql80/errorLog'),
  // 清空错误日志
  clearErrorLog: () => request.post('/plugins/mysql80/clearErrorLog'),
  // 获取慢查询日志
  slowLog: () => request.get('/plugins/mysql80/slowLog'),
  // 清空慢查询日志
  clearSlowLog: () => request.post('/plugins/mysql80/clearSlowLog'),
  // 获取 root 密码
  rootPassword: () => request.get('/plugins/mysql80/rootPassword'),
  // 修改 root 密码
  setRootPassword: (password: string) =>
    request.post('/plugins/mysql80/rootPassword', { password }),
  // 数据库列表
  databases: (page: number, limit: number) =>
    request.get('/plugins/mysql80/databases', { params: { page, limit } }),
  // 创建数据库
  addDatabase: (database: any) => request.post('/plugins/mysql80/databases', database),
  // 删除数据库
  deleteDatabase: (database: string) =>
    request.delete('/plugins/mysql80/databases', { params: { database } }),
  // 备份列表
  backups: (page: number, limit: number) =>
    request.get('/plugins/mysql80/backups', { params: { page, limit } }),
  // 创建备份
  createBackup: (database: string) => request.post('/plugins/mysql80/backups', { database }),
  // 上传备份
  uploadBackup: (backup: any) => request.put('/plugins/mysql80/backups', backup, { timeout: 0 }),
  // 删除备份
  deleteBackup: (name: string) => request.delete('/plugins/mysql80/backups', { params: { name } }),
  // 还原备份
  restoreBackup: (backup: string, database: string) =>
    request.post('/plugins/mysql80/backups/restore', { backup, database }),
  // 用户列表
  users: (page: number, limit: number) =>
    request.get('/plugins/mysql80/users', { params: { page, limit } }),
  // 创建用户
  addUser: (user: any) => request.post('/plugins/mysql80/users', user),
  // 删除用户
  deleteUser: (user: string) => request.delete('/plugins/mysql80/users', { params: { user } }),
  // 设置用户密码
  setUserPassword: (user: string, password: string) =>
    request.post('/plugins/mysql80/users/password', { user, password }),
  // 设置用户权限
  setUserPrivileges: (user: string, database: string) =>
    request.post('/plugins/mysql80/users/privileges', { user, database })
}
