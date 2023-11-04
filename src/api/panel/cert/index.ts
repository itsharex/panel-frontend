import { request } from '@/utils'

export default {
  // CA 供应商列表
  caProviders: () => request.get('/panel/cert/caProviders'),
  // DNS 供应商列表
  dnsProviders: () => request.get('/panel/cert/dnsProviders'),
  // 证书算法列表
  algorithms: () => request.get('/panel/cert/algorithms'),
  // ACME 用户列表
  users: (page: number, limit: number) =>
    request.get('/panel/cert/users', { params: { page, limit } }),
  // ACME 用户详情
  userInfo: (id: number) => request.get(`/panel/cert/users/${id}`),
  // ACME 用户添加
  userAdd: (data: any) => request.post('/panel/cert/users', data),
  // ACME 用户更新
  userUpdate: (id: number, data: any) => request.put(`/panel/cert/users/${id}`, data),
  // ACME 用户删除
  userDelete: (id: number) => request.delete(`/panel/cert/users/${id}`),
  // DNS 记录列表
  dns: (page: number, limit: number) => request.get('/panel/cert/dns', { params: { page, limit } }),
  // DNS 记录详情
  dnsInfo: (id: number) => request.get(`/panel/cert/dns/${id}`),
  // DNS 记录添加
  dnsAdd: (data: any) => request.post('/panel/cert/dns', data),
  // DNS 记录更新
  dnsUpdate: (id: number, data: any) => request.put(`/panel/cert/dns/${id}`, data),
  // DNS 记录删除
  dnsDelete: (id: number) => request.delete(`/panel/cert/dns/${id}`),
  // 证书列表
  certs: (page: number, limit: number) =>
    request.get('/panel/cert/certs', { params: { page, limit } }),
  // 证书详情
  certInfo: (id: number) => request.get(`/panel/cert/certs/${id}`),
  // 证书添加
  certAdd: (data: any) => request.post('/panel/cert/certs', data),
  // 证书更新
  certUpdate: (id: number, data: any) => request.put(`/panel/cert/certs/${id}`, data),
  // 证书删除
  certDelete: (id: number) => request.delete(`/panel/cert/certs/${id}`),
  // 签发
  obtain: (id: number) => request.post(`/panel/cert/obtain`, { id }),
  // 续签
  renew: (id: number) => request.post(`/panel/cert/renew`, { id }),
  // 获取 DNS 记录
  manualDNS: (id: number) => request.post(`/panel/cert/manualDNS`, { id })
}
