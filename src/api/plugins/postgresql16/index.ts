import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/postgresql16/status'),
  // 重载
  reload: (): Promise<AxiosResponse<any>> => request.post('/plugins/postgresql16/reload'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/postgresql16/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/postgresql16/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/postgresql16/stop'),
  // 负载状态
  load: (): Promise<AxiosResponse<any>> => request.get('/plugins/postgresql16/load'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/postgresql16/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/config', { config }),
  // 获取用户配置
  userConfig: (): Promise<AxiosResponse<any>> => request.get('/plugins/postgresql16/userConfig'),
  // 保存配置
  saveUserConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/userConfig', { config }),
  // 获取日志
  log: (): Promise<AxiosResponse<any>> => request.get('/plugins/postgresql16/log'),
  // 清空错误日志
  clearLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/postgresql16/clearLog'),
  // 数据库列表
  databases: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/postgresql16/databases', { params: { page, limit } }),
  // 创建数据库
  addDatabase: (database: any): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/databases', database),
  // 删除数据库
  deleteDatabase: (database: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/postgresql16/databases', { params: { database } }),
  // 备份列表
  backups: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/postgresql16/backups', { params: { page, limit } }),
  // 创建备份
  createBackup: (database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/backups', { database }),
  // 上传备份
  uploadBackup: (backup: any): Promise<AxiosResponse<any>> =>
    request.put('/plugins/postgresql16/backups', backup),
  // 删除备份
  deleteBackup: (name: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/postgresql16/backups', { params: { name } }),
  // 还原备份
  restoreBackup: (backup: string, database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/backups/restore', { backup, database }),
  // 用户列表
  users: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/postgresql16/users', { params: { page, limit } }),
  // 创建用户
  addUser: (user: any): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/users', user),
  // 删除用户
  deleteUser: (user: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/postgresql16/users', { params: { user } }),
  // 设置用户密码
  setUserPassword: (user: string, password: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/postgresql16/users/password', { user, password })
}
