import { request } from '@/utils'

export default {
  // 获取插件列表
  list: () => request.get('/panel/plugin/list'),
  // 安装插件
  install: (plugin: any) => request.post('/panel/plugin/install', { plugin }),
  // 卸载插件
  uninstall: (plugin: any) => request.post('/panel/plugin/uninstall', { plugin }),
  // 更新插件
  update: (plugin: any) => request.post('/panel/plugin/update', { plugin }),
  // 设置首页显示
  updateShow: (plugin: any) => request.post('/panel/plugin/updateShow', { plugin })
}
