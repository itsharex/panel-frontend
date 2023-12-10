import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/rsync/status'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/rsync/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/rsync/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/rsync/stop'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/rsync/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/rsync/config', { config }),
  // 模块列表
  modules: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/rsync/modules', { params: { page, limit } }),
  // 添加模块
  addModule: (module: any): Promise<AxiosResponse<any>> =>
    request.post('/plugins/rsync/modules', module),
  // 删除模块
  deleteModule: (name: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/rsync/modules/' + name),
  // 更新模块
  updateModule: (name: string, module: any): Promise<AxiosResponse<any>> =>
    request.post('/plugins/rsync/modules/' + name, module)
}
