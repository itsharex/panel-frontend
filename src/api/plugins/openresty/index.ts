import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/openresty/status'),
  // 重载
  reload: () => request.post('/plugins/openresty/reload'),
  // 重启
  restart: () => request.post('/plugins/openresty/restart'),
  // 启动
  start: () => request.post('/plugins/openresty/start'),
  // 停止
  stop: () => request.post('/plugins/openresty/stop'),
  // 负载状态
  load: () => request.get('/plugins/openresty/load'),
  // 获取配置
  config: () => request.get('/plugins/openresty/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/openresty/config', { config }),
  // 获取错误日志
  errorLog: () => request.get('/plugins/openresty/errorLog'),
  // 清空错误日志
  clearErrorLog: () => request.post('/plugins/openresty/clearErrorLog')
}
