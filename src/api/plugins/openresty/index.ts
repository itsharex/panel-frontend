import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/openresty/status'),
  // 重载
  reload: (): Promise<AxiosResponse<any>> => request.post('/plugins/openresty/reload'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/openresty/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/openresty/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/openresty/stop'),
  // 负载状态
  load: (): Promise<AxiosResponse<any>> => request.get('/plugins/openresty/load'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/openresty/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/openresty/config', { config }),
  // 获取错误日志
  errorLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/openresty/errorLog'),
  // 清空错误日志
  clearErrorLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/openresty/clearErrorLog')
}
