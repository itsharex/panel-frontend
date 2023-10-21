import { request } from '@/utils'

export default {
  // 列表
  list: (page: number, limit: number) =>
    request.get('/panel/website/list', { params: { page, limit } }),
  // 添加
  add: (data: any) => request.post('/panel/website/add', data),
  // 删除
  delete: (id: number) => request.delete('/panel/website/delete/' + id),
  // 获取默认配置
  defaultConfig: () => request.get('/panel/website/defaultConfig'),
  // 保存默认配置
  saveDefaultConfig: (data: any) => request.post('/panel/website/defaultConfig', data),
  // 网站配置
  config: (id: number) => request.get('/panel/website/config/' + id),
  // 保存网站配置
  saveConfig: (id: number, data: any) => request.post('/panel/website/config/' + id, data),
  // 清空日志
  clearLog: (id: number) => request.delete('/panel/website/log/' + id),
  // 更新备注
  updateRemark: (id: number, remark: string) =>
    request.post('/panel/website/updateRemark/' + id, { remark }),
  // 获取备份列表
  backupList: (id: number) => request.get('/panel/website/backupList/' + id),
  // 创建备份
  createBackup: (id: number) => request.post('/panel/website/createBackup/' + id),
  // 上传备份
  uploadBackup: (id: number, data: any) => request.post('/panel/website/uploadBackup/' + id, data),
  // 删除备份
  deleteBackup: (id: number, backupId: number) =>
    request.delete('/panel/website/deleteBackup/' + id + '/' + backupId),
  // 恢复备份
  restoreBackup: (id: number, backupId: number) =>
    request.post('/panel/website/restoreBackup/' + id + '/' + backupId),
  // 重置配置
  resetConfig: (id: number) => request.post('/panel/website/resetConfig/' + id),
  // 修改状态
  status: (id: number, status: boolean) => request.post('/panel/website/status/', { id, status })
}
