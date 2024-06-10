import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/podman/status'),
  // 是否启用
  isEnabled: (): Promise<AxiosResponse<any>> => request.get('/plugins/podman/isEnabled'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/podman/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/podman/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/podman/stop'),
  // 自启动
  enable: (): Promise<AxiosResponse<any>> => request.post('/plugins/podman/enable'),
  // 禁用自启动
  disable: (): Promise<AxiosResponse<any>> => request.post('/plugins/podman/disable'),
  // 获取注册表配置
  registryConfig: (): Promise<AxiosResponse<any>> => request.get('/plugins/podman/registryConfig'),
  // 保存注册表配置
  saveRegistryConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/podman/registryConfig', { config }),
  // 获取存储配置
  storageConfig: (): Promise<AxiosResponse<any>> => request.get('/plugins/podman/storageConfig'),
  // 保存存储配置
  saveStorageConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/podman/storageConfig', { config })
}
