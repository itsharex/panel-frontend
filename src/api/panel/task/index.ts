import { request } from '@/utils'

export default {
  // 获取状态
  status: () => request.get('/panel/task/status'),
  // 获取任务列表
  list: () => request.get('/panel/task/list'),
  // 获取任务日志
  log: (task: any) => request.get('/panel/task/log', { params: { task } }),
  // 删除任务
  delete: (task: any) => request.post('/panel/task/delete', { task })
}
