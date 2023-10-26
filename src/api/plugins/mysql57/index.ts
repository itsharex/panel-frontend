import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/mysql57/status'),
  // 重载
  reload: () => request.post('/plugins/mysql57/reload'),
  // 重启
  restart: () => request.post('/plugins/mysql57/restart'),
  // 启动
  start: () => request.post('/plugins/mysql57/start'),
  // 停止
  stop: () => request.post('/plugins/mysql57/stop'),
  // 负载状态
  load: () => request.get('/plugins/mysql57/load'),
  // 获取配置
  config: () => request.get('/plugins/mysql57/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/mysql57/config', { config }),
  // 获取错误日志
  errorLog: () => request.get('/plugins/mysql57/errorLog'),
  // 清空错误日志
  clearErrorLog: () => request.post('/plugins/mysql57/clearErrorLog'),
  // 获取慢查询日志
  slowLog: () => request.get('/plugins/mysql57/slowLog'),
  // 清空慢查询日志
  clearSlowLog: () => request.post('/plugins/mysql57/clearSlowLog'),
  // 获取 root 密码
  rootPassword: () => request.get('/plugins/mysql57/rootPassword'),
  // 修改 root 密码
  setRootPassword: (password: string) =>
    request.post('/plugins/mysql57/rootPassword', { password }),
  // 数据库列表
  databases: (page: number, limit: number) =>
    request.get('/plugins/mysql57/databases', { params: { page, limit } }),
  // 创建数据库
  addDatabase: (database: any) => request.post('/plugins/mysql57/databases', database),
  // 删除数据库
  deleteDatabase: (database: string) =>
    request.delete('/plugins/mysql57/databases', { data: { database } }),
  // 备份列表
  backups: (page: number, limit: number) =>
    request.get('/plugins/mysql57/backups', { params: { page, limit } }),
  // 创建备份
  addBackup: (database: string) => request.post('/plugins/mysql57/backups', { database }),
  // 上传备份
  uploadBackup: (backup: string) => request.put('/plugins/mysql57/backups', { backup }),
  // 删除备份
  deleteBackup: (backup: string) =>
    request.delete('/plugins/mysql57/backups', { data: { backup } }),
  // 还原备份
  restoreBackup: (backup: string, database: string) =>
    request.post('/plugins/mysql57/backups/restore', { backup, database }),
  // 用户列表
  users: (page: number, limit: number) =>
    request.get('/plugins/mysql57/users', { params: { page, limit } }),
  // 创建用户
  addUser: (user: any) => request.post('/plugins/mysql57/users', user),
  // 删除用户
  deleteUser: (user: string) => request.delete('/plugins/mysql57/users', { data: { user } }),
  // 设置用户密码
  setUserPassword: (user: string, password: string) =>
    request.post('/plugins/mysql57/users/password', { user, password }),
  // 设置用户权限
  setUserPrivileges: (user: string, database: string) =>
    request.post('/plugins/mysql57/users/privileges', { user, database })
}
