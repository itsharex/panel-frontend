import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/redis/status'),
  // 重载
  reload: () => request.post('/plugins/redis/reload'),
  // 重启
  restart: () => request.post('/plugins/redis/restart'),
  // 启动
  start: () => request.post('/plugins/redis/start'),
  // 停止
  stop: () => request.post('/plugins/redis/stop'),
  // 负载状态
  load: () => request.get('/plugins/redis/load'),
  // 获取配置
  config: () => request.get('/plugins/redis/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/redis/config', { config })
}
