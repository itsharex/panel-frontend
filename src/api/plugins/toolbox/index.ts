import { request } from '@/utils'

export default {
  // DNS
  dns: () => request.get('/plugins/toolbox/dns'),
  // 设置 DNS
  setDns: (dns1: string, dns2: string) => request.post('/plugins/toolbox/dns', { dns1, dns2 }),
  // SWAP
  swap: () => request.get('/plugins/toolbox/swap'),
  // 设置 SWAP
  setSwap: (size: number) => request.post('/plugins/toolbox/swap', { size }),
  // 时区
  timezone: () => request.get('/plugins/toolbox/timezone'),
  // 设置时区
  setTimezone: (timezone: string) => request.post('/plugins/toolbox/timezone', { timezone }),
  // Hosts
  hosts: () => request.get('/plugins/toolbox/hosts'),
  // 设置 Hosts
  setHosts: (hosts: string) => request.post('/plugins/toolbox/hosts', { hosts }),
  // 设置 Root 密码
  setRootPassword: (password: string) => request.post('/plugins/toolbox/rootPassword', { password })
}
