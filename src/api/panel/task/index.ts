import { request } from '@/utils'

export default {
  // 获取状态
  status: () => request.get('/panel/task/status'),
  // 获取任务列表
  list: (page: number, limit: number) =>
    request.get('/panel/task/list', { params: { page, limit } }),
  // 获取任务日志
  log: (id: number) => request.get('/panel/task/log', { params: { id } }),
  // 删除任务
  delete: (id: number) => request.post('/panel/task/delete', { id })
}
