import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/rsync/status'),
  // 重启
  restart: () => request.post('/plugins/rsync/restart'),
  // 启动
  start: () => request.post('/plugins/rsync/start'),
  // 停止
  stop: () => request.post('/plugins/rsync/stop'),
  // 获取配置
  config: () => request.get('/plugins/rsync/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/rsync/config', { config }),
  // 模块列表
  modules: (page: number, limit: number) =>
    request.get('/plugins/rsync/modules', { params: { page, limit } }),
  // 添加模块
  addModule: (module: any) => request.post('/plugins/rsync/modules', module),
  // 删除模块
  deleteModule: (name: string) => request.delete('/plugins/rsync/modules/' + name),
  // 更新模块
  updateModule: (name: string, module: any) =>
    request.post('/plugins/rsync/modules/' + name, module)
}
