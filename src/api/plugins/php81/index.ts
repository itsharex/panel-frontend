import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/php81/status'),
  // 重载
  reload: (): Promise<AxiosResponse<any>> => request.post('/plugins/php81/reload'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/php81/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/php81/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/php81/stop'),
  // 负载状态
  load: (): Promise<AxiosResponse<any>> => request.get('/plugins/php81/load'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/php81/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/php81/config', { config }),
  // 获取错误日志
  errorLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/php81/errorLog'),
  // 清空错误日志
  clearErrorLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/php81/clearErrorLog'),
  // 获取慢日志
  slowLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/php81/slowLog'),
  // 清空慢日志
  clearSlowLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/php81/clearSlowLog'),
  // 拓展列表
  extensions: (): Promise<AxiosResponse<any>> => request.get('/plugins/php81/extensions'),
  // 安装拓展
  installExtension: (slug: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/php81/extensions', { slug }),
  // 卸载拓展
  uninstallExtension: (slug: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/php81/extensions', { params: { slug } })
}
