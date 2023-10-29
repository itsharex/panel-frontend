import { request } from '@/utils'

export default {
  // 列表
  list: (page: number, limit: number) =>
    request.get('/plugins/s3fs/list', { params: { page, limit } }),
  // 添加
  add: (data: any) => request.post('/plugins/s3fs/add', data),
  // 删除
  delete: (id: number) => request.post('/plugins/s3fs/delete', { id })
}
