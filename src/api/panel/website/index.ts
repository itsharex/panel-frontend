import { request } from '@/utils'

export default {
  // 列表
  list: (page: number, limit: number) =>
    request.get('/panel/websites', { params: { page, limit } }),
  // 添加
  add: (data: any) => request.post('/panel/websites', data),
  // 删除
  delete: (id: number) => request.delete('/panel/websites/' + id),
  // 获取默认配置
  defaultConfig: () => request.get('/panel/website/defaultConfig'),
  // 保存默认配置
  saveDefaultConfig: (index: string, stop: string) =>
    request.post('/panel/website/defaultConfig', { index, stop }),
  // 网站配置
  config: (id: number) => request.get('/panel/websites/' + id + '/config'),
  // 保存网站配置
  saveConfig: (id: number, data: any) => request.post('/panel/websites/' + id + '/config', data),
  // 清空日志
  clearLog: (id: number) => request.delete('/panel/websites/' + id + '/log'),
  // 更新备注
  updateRemark: (id: number, remark: string) =>
    request.post('/panel/websites/' + id + '/updateRemark', { remark }),
  // 获取备份列表
  backupList: () => request.get('/panel/website/backupList'),
  // 创建备份
  createBackup: (id: number) => request.post('/panel/websites/' + id + '/createBackup'),
  // 上传备份
  uploadBackup: (data: any) => request.post('/panel/website/uploadBackup', data),
  // 删除备份
  deleteBackup: (name: string) => request.delete('/panel/website/deleteBackup', { data: { name } }),
  // 恢复备份
  restoreBackup: (id: number, name: number) =>
    request.post('/panel/websites/' + id + '/restoreBackup', { name }),
  // 重置配置
  resetConfig: (id: number) => request.post('/panel/websites/' + id + '/resetConfig'),
  // 修改状态
  status: (id: number, status: boolean) =>
    request.post('/panel/websites/' + id + '/status', { status })
}
