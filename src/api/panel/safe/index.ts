import { request } from '@/utils'

export default {
  // 获取防火墙状态
  firewallStatus: () => request.get('/panel/safe/firewallStatus'),
  // 设置防火墙状态
  setFirewallStatus: (status: boolean) => request.post('/panel/safe/firewallStatus', { status }),
  // 获取防火墙规则
  firewallRules: (page: number, limit: number) =>
    request.get('/panel/safe/firewallRules', { params: { page, limit } }),
  // 添加防火墙规则
  addFirewallRule: (port: string, protocol: string) =>
    request.post('/panel/safe/firewallRules', { port, protocol }),
  // 删除防火墙规则
  deleteFirewallRule: (port: string, protocol: string) =>
    request.delete('/panel/safe/firewallRules', { data: { port, protocol } }),
  // 获取SSH状态
  sshStatus: () => request.get('/panel/safe/sshStatus'),
  // 设置SSH状态
  setSshStatus: (status: boolean) => request.post('/panel/safe/sshStatus', { status }),
  // 获取SSH端口
  sshPort: () => request.get('/panel/safe/sshPort'),
  // 设置SSH端口
  setSshPort: (port: number) => request.post('/panel/safe/sshPort', { port }),
  // 获取Ping状态
  pingStatus: () => request.get('/panel/safe/pingStatus'),
  // 设置Ping状态
  setPingStatus: (status: boolean) => request.post('/panel/safe/pingStatus', { status })
}
