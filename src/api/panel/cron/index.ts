import { request } from '@/utils'

export default {
  // 获取任务列表
  list: () => request.get('/panel/cron/list'),
  // 获取任务脚本
  script: (task: any) => request.get('/panel/cron/script', { params: { task } }),
  // 添加任务
  add: (task: any) => request.post('/panel/cron/add', { task }),
  // 修改任务
  update: (task: any) => request.post('/panel/cron/update', { task }),
  // 删除任务
  delete: (task: any) => request.post('/panel/cron/delete', { task }),
  // 获取任务日志
  log: (task: any) => request.get('/panel/cron/log', { params: { task } }),
  // 修改任务状态
  status: (task: any) => request.post('/panel/cron/status', { task })
}
