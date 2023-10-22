import { request } from '@/utils'

export default {
  // 开关
  switch: (monitor: boolean) => request.post('/panel/monitor/switch', { monitor }),
  // 保存天数
  saveDays: (days: number) => request.post('/panel/monitor/saveDays', { days }),
  // 清空监控记录
  clear: () => request.post('/panel/monitor/clear'),
  // 监控记录
  list: (start: number, end: number) => request.get('/panel/monitor/list', { params: { start, end } }),
  // 开关和天数
  switchAndDays: () => request.get('/panel/monitor/switchAndDays')
}
