import {request} from '@/utils'
import type {RequestConfig} from '~/types/axios'

export default {
  // 面板名称
  name: () => request.get('/info/name', {noNeedToken: true} as RequestConfig),
  // 面板菜单
  menu: () => request.get('/info/menu'),
  // 首页插件
  homePlugins: () => request.get('/info/homePlugins'),
  // 实时监控
  nowMonitor: () => request.get('/info/nowMonitor'),
  // 系统信息
  systemInfo: () => request.get('/info/systemInfo'),
  // 已安装的数据库和PHP
  installedDbAndPhp: () => request.get('/info/installedDbAndPhp'),
  // 检查更新
  checkUpdate: () => request.get('/info/checkUpdate'),
  // 更新面板
  update: () => request.post('/info/update'),
  // 重启面板
  restart: () => request.get('/info/restart')
}
