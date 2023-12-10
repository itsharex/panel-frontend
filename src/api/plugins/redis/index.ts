import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/redis/status'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/redis/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/redis/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/redis/stop'),
  // 负载状态
  load: (): Promise<AxiosResponse<any>> => request.get('/plugins/redis/load'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/redis/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/redis/config', { config })
}
