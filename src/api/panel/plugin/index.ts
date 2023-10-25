import { request } from '@/utils'

export default {
  // 获取插件列表
  list: (page: number, limit: number) =>
    request.get('/panel/plugin/list', { params: { page, limit } }),
  // 安装插件
  install: (slug: string) => request.post('/panel/plugin/install', { slug }),
  // 卸载插件
  uninstall: (slug: string) => request.post('/panel/plugin/uninstall', { slug }),
  // 更新插件
  update: (slug: string) => request.post('/panel/plugin/update', { slug }),
  // 设置首页显示
  updateShow: (slug: string, show: boolean) =>
    request.post('/panel/plugin/updateShow', { slug, show })
}
