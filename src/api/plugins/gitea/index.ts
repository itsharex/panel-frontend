import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/gitea/status'),
  // 是否启用
  isEnabled: (): Promise<AxiosResponse<any>> => request.get('/plugins/gitea/isEnabled'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/gitea/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/gitea/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/gitea/stop'),
  // 自启动
  enable: (): Promise<AxiosResponse<any>> => request.post('/plugins/gitea/enable'),
  // 禁用自启动
  disable: (): Promise<AxiosResponse<any>> => request.post('/plugins/gitea/disable'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/gitea/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/gitea/config', { config })
}
