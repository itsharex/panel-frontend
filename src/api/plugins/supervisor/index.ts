import { request } from '@/utils'

export default {
  // 运行状态
  status: () => request.get('/plugins/supervisor/status'),
  // 重载
  reload: () => request.post('/plugins/supervisor/reload'),
  // 重启
  restart: () => request.post('/plugins/supervisor/restart'),
  // 启动
  start: () => request.post('/plugins/supervisor/start'),
  // 停止
  stop: () => request.post('/plugins/supervisor/stop'),
  // 负载状态
  load: () => request.get('/plugins/supervisor/load'),
  // 获取错误日志
  log: () => request.get('/plugins/supervisor/log'),
  // 清空错误日志
  clearLog: () => request.post('/plugins/supervisor/clearLog'),
  // 获取配置
  config: () => request.get('/plugins/supervisor/config'),
  // 保存配置
  saveConfig: (config: string) => request.post('/plugins/supervisor/config', { config }),
  // 进程列表
  processes: () => request.get('/plugins/supervisor/processes'),
  // 进程启动
  startProcess: (process: string) => request.post('/plugins/supervisor/startProcess', { process }),
  // 进程停止
  stopProcess: (process: string) => request.post('/plugins/supervisor/stopProcess', { process }),
  // 进程重启
  restartProcess: (process: string) =>
    request.post('/plugins/supervisor/restartProcess', { process }),
  // 进程日志
  processLog: (process: string) =>
    request.get('/plugins/supervisor/processLog', { params: { process } }),
  // 清空进程日志
  clearProcessLog: (process: string) =>
    request.post('/plugins/supervisor/clearProcessLog', { process }),
  // 进程配置
  processConfig: (process: string) =>
    request.get('/plugins/supervisor/processConfig', { params: { process } }),
  // 保存进程配置
  saveProcessConfig: (process: string, config: string) =>
    request.post('/plugins/supervisor/processConfig', { process, config }),
  // 添加进程
  addProcess: (process: any) => request.post('/plugins/supervisor/addProcess', process),
  // 删除进程
  removeProcess: (process: string) => request.post('/plugins/supervisor/removeProcess', { process })
}
