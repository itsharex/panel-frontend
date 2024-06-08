import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/frp/status'),
  // 是否启用
  isEnabled: (): Promise<AxiosResponse<any>> => request.get('/plugins/frp/isEnabled'),
  // 重启
  restart: (service: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/frp/restart', { service }),
  // 启动
  start: (service: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/frp/start', { service }),
  // 停止
  stop: (service: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/frp/stop', { service }),
  // 自启动
  enable: (service: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/frp/enable', { service }),
  // 禁用自启动
  disable: (service: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/frp/disable', { service }),
  // 获取配置
  config: (service: string): Promise<AxiosResponse<any>> =>
    request.get('/plugins/frp/config', { params: { service } }),
  // 保存配置
  saveConfig: (service: string, config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/frp/config', { service, config })
}
