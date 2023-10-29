import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/php74/status'),
  // 重载
  reload: () => request.post('/plugins/php74/reload'),
  // 重启
  restart: () => request.post('/plugins/php74/restart'),
  // 启动
  start: () => request.post('/plugins/php74/start'),
  // 停止
  stop: () => request.post('/plugins/php74/stop'),
  // 负载状态
  load: () => request.get('/plugins/php74/load'),
  // 获取配置
  config: () => request.get('/plugins/php74/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/php74/config', { config }),
  // 获取错误日志
  errorLog: () => request.get('/plugins/php74/errorLog'),
  // 清空错误日志
  clearErrorLog: () => request.post('/plugins/php74/clearErrorLog'),
  // 获取慢日志
  slowLog: () => request.get('/plugins/php74/slowLog'),
  // 清空慢日志
  clearSlowLog: () => request.post('/plugins/php74/clearSlowLog'),
  // 拓展列表
  extensions: () => request.get('/plugins/php74/extensions'),
  // 安装拓展
  installExtension: (slug: string) => request.post('/plugins/php74/extensions', { slug }),
  // 卸载拓展
  uninstallExtension: (slug: string) =>
    request.delete('/plugins/php74/extensions', { params: { slug } })
}
