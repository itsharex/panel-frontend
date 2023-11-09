<script setup lang="ts">
import website from '@/api/panel/website'
import { NButton, NDataTable, NInput, NPopconfirm, NSwitch, NTag, NTable } from 'naive-ui'
import { renderIcon } from '@/utils'
import type { Cert, DNS, User } from './types'
import cert from '@/api/panel/cert'

const currentTab = ref('cert')
const addCertModal = ref(false)
const addUserModal = ref(false)
const addDNSModal = ref(false)
const updateCertModal = ref(false)
const updateUserModal = ref(false)
const updateDNSModal = ref(false)
const updateCert = ref<any>()
const updateUser = ref<any>()
const updateDNS = ref<any>()

const caProviders = ref<any>([])
const dnsProviders = ref<any>([])
const algorithms = ref<any>([])
let websites: any = []
let dns: any = []
let users: any = []

const addCertModel = ref<any>({
  domains: [],
  dns_id: null,
  type: 'P256',
  user_id: null,
  website_id: null,
  auto_renew: true
})
const addUserModel = ref<any>({
  hmac_encoded: '',
  email: '',
  kid: '',
  key_type: 'P256',
  ca: 'letsencrypt'
})
const addDNSModel = ref<any>({
  data: {
    email: '',
    token: '',
    id: '',
    access_key: '',
    api_key: '',
    secret_key: ''
  },
  type: 'dnspod',
  name: ''
})
const updateCertModel = ref<any>({
  domains: [],
  dns_id: null,
  type: 'P256',
  user_id: null,
  website_id: null,
  auto_renew: true
})
const updateUserModel = ref<any>({
  hmac_encoded: '',
  email: '',
  kid: '',
  key_type: 'P256',
  ca: 'letsencrypt'
})
const updateDNSModel = ref<any>({
  data: {
    email: '',
    token: '',
    id: '',
    access_key: '',
    api_key: '',
    secret_key: ''
  },
  type: 'dnspod',
  name: ''
})

const certColumns: any = [
  {
    title: '域名',
    key: 'domains',
    width: 200,
    resizable: true,
    ellipsis: { tooltip: true },
    render(row: any) {
      return h(
        'span',
        {
          type: row.status == 'active' ? 'success' : 'error'
        },
        {
          default: () => row.domains.join(', ')
        }
      )
    }
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
    resizable: true,
    ellipsis: { tooltip: true },
    render(row: any) {
      return h(
        NTag,
        {
          type: 'info',
          bordered: false
        },
        {
          default: () => {
            switch (row.type) {
              case 'P256':
                return 'EC 256'
              case 'P384':
                return 'EC 384'
              case '2048':
                return 'RSA 2048'
              case '4096':
                return 'RSA 4096'
              default:
                return '未知'
            }
          }
        }
      )
    }
  },
  {
    title: '关联账号',
    key: 'user_id',
    width: 200,
    resizable: true,
    ellipsis: { tooltip: true },
    render(row: any) {
      return h(
        NTag,
        {
          type: row.user == null ? 'error' : 'success',
          bordered: false
        },
        {
          default: () => (row.user?.email == null ? '无' : row.user.email)
        }
      )
    }
  },
  {
    title: '关联网站',
    key: 'website_id',
    width: 150,
    resizable: true,
    ellipsis: { tooltip: true },
    render(row: any) {
      return h(
        NTag,
        {
          type: row.website == null ? 'error' : 'success',
          bordered: false
        },
        {
          default: () => (row.website?.name == null ? '无' : row.website.name)
        }
      )
    }
  },
  {
    title: '关联DNS',
    key: 'dns_id',
    width: 150,
    resizable: true,
    ellipsis: { tooltip: true },
    render(row: any) {
      return h(
        NTag,
        {
          type: row.dns == null ? 'error' : 'success',
          bordered: false
        },
        {
          default: () => (row.dns?.name == null ? '无' : row.dns.name)
        }
      )
    }
  },
  {
    title: '自动续签',
    key: 'auto_renew',
    width: 100,
    align: 'center',
    resizable: true,
    render(row: any) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row.auto_renew
        //onUpdateValue: () => handleAutoRenewUpdate(row)
      })
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 420,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    resizable: true,
    render(row: any) {
      return [
        row.cert_url == null
          ? h(
              NButton,
              {
                size: 'small',
                type: 'info',
                style: 'margin-left: 15px;',
                onClick: async () => {
                  window.$message.loading('请稍后...')
                  // 没有设置 DNS 接口则获取解析记录
                  if (row.dns_id == null) {
                    const { data } = await cert.manualDNS(row.id)
                    window.$message.info('请先前往域名处设置 DNS 解析，再继续签发')
                    const d = window.$dialog.info({
                      style: 'width: 60vw',
                      title: 'DNS 记录列表',
                      content: () => {
                        return h(NTable, [
                          h('thead', [
                            h('tr', [h('th', '域名'), h('th', '类型'), h('th', '记录值')])
                          ]),
                          h(
                            'tbody',
                            row.domains.map((item: any) =>
                              h('tr', [
                                h('td', data[item]?.key),
                                h('td', 'TXT'),
                                h('td', data[item]?.value)
                              ])
                            )
                          )
                        ])
                      },
                      positiveText: '签发',
                      onPositiveClick: async () => {
                        d.loading = true
                        await cert.obtain(row.id)
                        window.$message.success('签发成功')
                        onCertPageChange(1)
                      }
                    })
                  } else {
                    await cert.obtain(row.id)
                    window.$message.success('签发成功')
                    onCertPageChange(1)
                  }
                }
              },
              {
                default: () => '签发',
                icon: renderIcon('material-symbols:rocket-launch-outline-rounded', { size: 14 })
              }
            )
          : null,
        row.cert != '' && row.key != ''
          ? h(
              NButton,
              {
                size: 'small',
                type: 'success',
                style: 'margin-left: 15px;',
                onClick: async () => {
                  window.$message.loading('请稍后...')
                  await cert.renew(row.id)
                  window.$message.success('续签成功')
                  onCertPageChange(1)
                }
              },
              {
                default: () => '续签',
                icon: renderIcon('material-symbols:autorenew-outline-rounded', { size: 14 })
              }
            )
          : null,
        row.cert != '' && row.key != ''
          ? h(
              NButton,
              {
                size: 'small',
                type: 'tertiary',
                style: 'margin-left: 15px;',
                onClick: () => window.$message.info('暂不支持')
              },
              {
                default: () => '查看',
                icon: renderIcon('majesticons:eye-line', { size: 14 })
              }
            )
          : null,
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => {
              updateCert.value = row.id
              updateCertModel.value.domains = row.domains
              updateCertModel.value.dns_id = row.dns_id
              updateCertModel.value.type = row.type
              updateCertModel.value.user_id = row.user_id
              updateCertModel.value.website_id = row.website_id
              updateCertModel.value.auto_renew = row.auto_renew
              updateCertModal.value = true
            }
          },
          {
            default: () => '修改',
            icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: async () => {
              await cert.certDelete(row.id)
              window.$message.success('删除成功')
              onCertPageChange(1)
            }
          },
          {
            default: () => {
              return '确定删除证书吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  size: 'small',
                  type: 'error',
                  style: 'margin-left: 15px;'
                },
                {
                  default: () => '删除',
                  icon: renderIcon('material-symbols:delete-outline', { size: 14 })
                }
              )
            }
          }
        )
      ]
    }
  }
]
const userColumns: any = [
  { title: '邮箱', key: 'email', width: 150, resizable: true, ellipsis: { tooltip: true } },
  { title: 'CA', key: 'ca', width: 150, resizable: true, ellipsis: { tooltip: true } },
  { title: '密钥类型', key: 'key_type', width: 150, resizable: true, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 240,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            secondary: true,
            onClick: () => window.$message.info('暂不支持')
          },
          {
            default: () => '查看',
            icon: renderIcon('majesticons:eye-line', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => {
              updateUser.value = row.id
              updateUserModel.value.email = row.email
              updateUserModel.value.hmac_encoded = row.hmac_encoded
              updateUserModel.value.kid = row.kid
              updateUserModel.value.key_type = row.key_type
              updateUserModel.value.ca = row.ca
              updateUserModal.value = true
            }
          },
          {
            default: () => '修改',
            icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: async () => {
              await cert.userDelete(row.id)
              window.$message.success('删除成功')
              onUserPageChange(1)
            }
          },
          {
            default: () => {
              return '确定删除账号吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  size: 'small',
                  type: 'error',
                  style: 'margin-left: 15px;'
                },
                {
                  default: () => '删除',
                  icon: renderIcon('material-symbols:delete-outline', { size: 14 })
                }
              )
            }
          }
        )
      ]
    }
  }
]
const dnsColumns: any = [
  { title: '备注名称', key: 'name', width: 150, resizable: true, ellipsis: { tooltip: true } },
  { title: '类型', key: 'type', width: 150, resizable: true, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row: any) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            secondary: true,
            onClick: () => window.$message.info('暂不支持')
          },
          {
            default: () => '查看',
            icon: renderIcon('majesticons:eye-line', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => {
              updateDNS.value = row.id
              updateDNSModel.value.data.email = row.data.email
              updateDNSModel.value.data.token = row.data.token
              updateDNSModel.value.data.id = row.data.id
              updateDNSModel.value.data.access_key = row.data.access_key
              updateDNSModel.value.data.api_key = row.data.api_key
              updateDNSModel.value.data.secret_key = row.data.secret_key
              updateDNSModel.value.type = row.type
              updateDNSModel.value.name = row.name
              updateDNSModal.value = true
            }
          },
          {
            default: () => '修改',
            icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: async () => {
              await cert.dnsDelete(row.id)
              window.$message.success('删除成功')
              onDnsPageChange(1)
            }
          },
          {
            default: () => {
              return '确定删除 DNS 吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  size: 'small',
                  type: 'error',
                  style: 'margin-left: 15px;'
                },
                {
                  default: () => '删除',
                  icon: renderIcon('material-symbols:delete-outline', { size: 14 })
                }
              )
            }
          }
        )
      ]
    }
  }
]
const certData = ref<Cert[]>([] as Cert[])
const userData = ref<User[]>([] as User[])
const dnsData = ref<DNS[]>([] as DNS[])

const certPagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})
const userPagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})
const dnsPagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const onCertPageChange = (page: number) => {
  certPagination.page = page
  getCertList(page, certPagination.pageSize).then((res) => {
    certData.value = res.items
    certPagination.itemCount = res.total
    certPagination.pageCount = res.total / certPagination.pageSize + 1
  })
}

const onUserPageChange = (page: number) => {
  userPagination.page = page
  getUserList(page, userPagination.pageSize).then((res) => {
    userData.value = res.items
    userPagination.itemCount = res.total
    userPagination.pageCount = res.total / userPagination.pageSize + 1
  })
}

const onDnsPageChange = (page: number) => {
  dnsPagination.page = page
  getDnsList(page, dnsPagination.pageSize).then((res) => {
    dnsData.value = res.items
    dnsPagination.itemCount = res.total
    dnsPagination.pageCount = res.total / dnsPagination.pageSize + 1
  })
}

const onCertPageSizeChange = (pageSize: number) => {
  certPagination.pageSize = pageSize
  onCertPageChange(1)
}

const onUserPageSizeChange = (pageSize: number) => {
  userPagination.pageSize = pageSize
  onUserPageChange(1)
}

const onDnsPageSizeChange = (pageSize: number) => {
  dnsPagination.pageSize = pageSize
  onDnsPageChange(1)
}

const getCertList = async (page: number, limit: number) => {
  const { data } = await cert.certs(page, limit)
  return data
}

const getUserList = async (page: number, limit: number) => {
  const { data } = await cert.users(page, limit)
  return data
}

const getDnsList = async (page: number, limit: number) => {
  const { data } = await cert.dns(page, limit)
  return data
}

const handleAddCert = async () => {
  await cert.certAdd(addCertModel.value)
  window.$message.success('添加成功')
  addCertModal.value = false
  onCertPageChange(1)
  addCertModel.value.domains = []
  addCertModel.value.dns_id = null
  addCertModel.value.type = 'P256'
  addCertModel.value.user_id = null
  addCertModel.value.website_id = null
  addCertModel.value.auto_renew = true
  await getAsyncData()
}

const handleAddUser = async () => {
  window.$message.loading('正在向 CA 注册账号，请耐心等待')
  await cert.userAdd(addUserModel.value)
  window.$message.success('添加成功')
  addUserModal.value = false
  onUserPageChange(1)
  addUserModel.value.email = ''
  addUserModel.value.hmac_encoded = ''
  addUserModel.value.kid = ''
  await getAsyncData()
}

const handleAddDNS = async () => {
  await cert.dnsAdd(addDNSModel.value)
  window.$message.success('添加成功')
  addDNSModal.value = false
  onDnsPageChange(1)
  addDNSModel.value.data.email = ''
  addDNSModel.value.data.token = ''
  addDNSModel.value.data.id = ''
  addDNSModel.value.data.access_key = ''
  addDNSModel.value.data.api_key = ''
  addDNSModel.value.data.secret_key = ''
  addDNSModel.value.name = ''
  await getAsyncData()
}

const handleUpdateCert = async () => {
  await cert.certUpdate(updateCert.value, updateCertModel.value)
  window.$message.success('更新成功')
  updateCertModal.value = false
  onCertPageChange(1)
  updateCertModel.value.domains = []
  updateCertModel.value.dns_id = null
  updateCertModel.value.type = 'P256'
  updateCertModel.value.user_id = null
  updateCertModel.value.website_id = null
  updateCertModel.value.auto_renew = true
  await getAsyncData()
}

const handleUpdateUser = async () => {
  window.$message.loading('正在向 CA 注册账号，请耐心等待')
  await cert.userUpdate(updateUser.value, updateUserModel.value)
  window.$message.success('更新成功')
  updateUserModal.value = false
  onUserPageChange(1)
  updateUserModel.value.email = ''
  updateUserModel.value.hmac_encoded = ''
  updateUserModel.value.kid = ''
  await getAsyncData()
}

const handleUpdateDNS = async () => {
  await cert.dnsUpdate(updateDNS.value, updateDNSModel.value)
  window.$message.success('更新成功')
  updateDNSModal.value = false
  onDnsPageChange(1)
  updateDNSModel.value.data.email = ''
  updateDNSModel.value.data.token = ''
  updateDNSModel.value.data.id = ''
  updateDNSModel.value.data.access_key = ''
  updateDNSModel.value.data.api_key = ''
  updateDNSModel.value.data.secret_key = ''
  updateDNSModel.value.name = ''
  await getAsyncData()
}

const getAsyncData = async () => {
  const { data: websiteData } = await website.list(1, 10000)
  websites = []
  for (const item of websiteData.items) {
    websites.push({
      label: item.name,
      value: item.id
    })
  }

  const { data: dnsData } = await cert.dns(1, 10000)
  dns = []
  for (const item of dnsData.items) {
    dns.push({
      label: item.name,
      value: item.id
    })
  }

  const { data: userData } = await cert.users(1, 10000)
  users = []
  for (const item of userData.items) {
    users.push({
      label: item.email,
      value: item.id
    })
  }
}

const getCommonData = async () => {
  const { data: caProviderData } = await cert.caProviders()
  for (const item of caProviderData) {
    caProviders.value.push({
      label: item.name,
      value: item.ca
    })
  }

  const { data: dnsProviderData } = await cert.dnsProviders()
  for (const item of dnsProviderData) {
    dnsProviders.value.push({
      label: item.name,
      value: item.dns
    })
  }

  const { data: algorithmData } = await cert.algorithms()
  for (const item of algorithmData) {
    algorithms.value.push({
      label: item.name,
      value: item.key
    })
  }

  await getAsyncData()
}

onMounted(() => {
  getCommonData()
  onCertPageChange(1)
  onDnsPageChange(1)
  onUserPageChange(1)
})
</script>

<template>
  <CommonPage show-footer>
    <template #action>
      <div>
        <n-button
          v-if="currentTab == 'cert'"
          class="ml-16"
          type="primary"
          @click="addCertModal = true"
        >
          <TheIcon :size="18" class="mr-5" icon="material-symbols:add" />
          添加证书
        </n-button>
        <n-button
          v-if="currentTab == 'user'"
          class="ml-16"
          type="primary"
          @click="addUserModal = true"
        >
          <TheIcon :size="18" class="mr-5" icon="material-symbols:add" />
          添加账号
        </n-button>
        <n-button
          v-if="currentTab == 'dns'"
          class="ml-16"
          type="primary"
          @click="addDNSModal = true"
        >
          <TheIcon :size="18" class="mr-5" icon="material-symbols:add" />
          添加 DNS
        </n-button>
      </div>
    </template>

    <n-tabs v-model:value="currentTab" type="line" animated>
      <n-tab-pane name="cert" tab="证书列表">
        <n-data-table
          striped
          remote
          :loading="false"
          :scroll-x="1200"
          :columns="certColumns"
          :data="certData"
          :row-key="(row) => row.id"
          :pagination="certPagination"
          @update:page="onCertPageChange"
          @update:page-size="onCertPageSizeChange"
        />
      </n-tab-pane>
      <n-tab-pane name="user" tab="账号列表">
        <n-data-table
          striped
          remote
          :loading="false"
          :scroll-x="1200"
          :columns="userColumns"
          :data="userData"
          :row-key="(row) => row.id"
          :pagination="userPagination"
          @update:page="onUserPageChange"
          @update:page-size="onUserPageSizeChange"
        />
      </n-tab-pane>
      <n-tab-pane name="dns" tab="DNS 列表">
        <n-data-table
          striped
          remote
          :loading="false"
          :scroll-x="1200"
          :columns="dnsColumns"
          :data="dnsData"
          :row-key="(row) => row.id"
          :pagination="dnsPagination"
          @update:page="onDnsPageChange"
          @update:page-size="onDnsPageSizeChange"
        />
      </n-tab-pane>
    </n-tabs>
  </CommonPage>
  <n-modal
    v-model:show="addCertModal"
    preset="card"
    title="添加证书"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-alert type="info">
        可以通过选择网站 / DNS 中的任意一项来自动签发和部署证书，也可以手动输入域名并设置 DNS
        解析来签发证书
      </n-alert>
      <n-form :model="addCertModel">
        <n-form-item label="域名">
          <n-dynamic-input
            v-model:value="addCertModel.domains"
            placeholder="example.com"
            :min="1"
            show-sort-button
          />
        </n-form-item>
        <n-form-item path="type" label="密钥类型">
          <n-select
            v-model:value="addCertModel.type"
            placeholder="选择密钥类型"
            clearable
            :options="algorithms"
          />
        </n-form-item>
        <n-form-item path="website_id" label="网站">
          <n-select
            v-model:value="addCertModel.website_id"
            placeholder="选择用于部署证书的网站"
            clearable
            :options="websites"
          />
        </n-form-item>
        <n-form-item path="user_id" label="账号">
          <n-select
            v-model:value="addCertModel.user_id"
            placeholder="选择用于签发证书的账号"
            clearable
            :options="users"
          />
        </n-form-item>
        <n-form-item path="user_id" label="DNS">
          <n-select
            v-model:value="addCertModel.dns_id"
            placeholder="选择用于签发证书的DNS"
            clearable
            :options="dns"
          />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleAddCert">提交</n-button>
    </n-space>
  </n-modal>
  <n-modal
    v-model:show="addUserModal"
    preset="card"
    title="添加账号"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-alert type="info">
        除了 Let's Encrypt 和 Buypass 外，其他 CA 均需要先去官网申请账号获得 KID 和 HMAC 并填入
      </n-alert>
      <n-alert type="warning">
        大陆机器无法使用 Google CA，其他 CA 视网络情况而定，建议使用 Let's Encrypt
      </n-alert>
      <n-form :model="addUserModel">
        <n-form-item path="ca" label="CA">
          <n-select
            v-model:value="addUserModel.ca"
            placeholder="选择 CA"
            clearable
            :options="caProviders"
          />
        </n-form-item>
        <n-form-item path="key_type" label="密钥类型">
          <n-select
            v-model:value="addUserModel.key_type"
            placeholder="选择密钥类型"
            clearable
            :options="algorithms"
          />
        </n-form-item>
        <n-form-item path="email" label="邮箱">
          <n-input
            v-model:value="addUserModel.email"
            type="text"
            @keydown.enter.prevent
            placeholder="输入邮箱地址"
          />
        </n-form-item>
        <n-form-item path="kid" label="KID">
          <n-input
            v-model:value="addUserModel.kid"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 KID"
          />
        </n-form-item>
        <n-form-item path="hmac_encoded" label="HMAC">
          <n-input
            v-model:value="addUserModel.hmac_encoded"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 HMAC"
          />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleAddUser">提交</n-button>
    </n-space>
  </n-modal>
  <n-modal
    v-model:show="addDNSModal"
    preset="card"
    title="添加 DNS"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-form :model="addDNSModel">
        <n-form-item path="name" label="备注名称">
          <n-input
            v-model:value="addDNSModel.name"
            type="text"
            @keydown.enter.prevent
            placeholder="输入备注名称"
          />
        </n-form-item>
        <n-form-item path="type" label="DNS">
          <n-select
            v-model:value="addDNSModel.type"
            placeholder="选择 DNS"
            clearable
            :options="dnsProviders"
          />
        </n-form-item>
        <n-form-item v-if="addDNSModel.type == 'dnspod'" path="id" label="ID">
          <n-input
            v-model:value="addDNSModel.data.id"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 DnsPod ID"
          />
        </n-form-item>
        <n-form-item v-if="addDNSModel.type == 'dnspod'" path="token" label="Token">
          <n-input
            v-model:value="addDNSModel.data.token"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 DnsPod Token"
          />
        </n-form-item>
        <n-form-item v-if="addDNSModel.type == 'aliyun'" path="access_key" label="Access Key">
          <n-input
            v-model:value="addDNSModel.data.access_key"
            type="text"
            @keydown.enter.prevent
            placeholder="输入阿里云 Access Key"
          />
        </n-form-item>
        <n-form-item v-if="addDNSModel.type == 'aliyun'" path="secret_key" label="Secret Key">
          <n-input
            v-model:value="addDNSModel.data.secret_key"
            type="text"
            @keydown.enter.prevent
            placeholder="输入阿里云 Secret Key"
          />
        </n-form-item>
        <n-form-item v-if="addDNSModel.type == 'cloudflare'" path="email" label="邮箱">
          <n-input
            v-model:value="addDNSModel.data.email"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 Cloudflare 邮箱"
          />
        </n-form-item>
        <n-form-item v-if="addDNSModel.type == 'cloudflare'" path="api_key" label="API Key">
          <n-input
            v-model:value="addDNSModel.data.api_key"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 Cloudflare API Key"
          />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleAddDNS">提交</n-button>
    </n-space>
  </n-modal>
  <n-modal
    v-model:show="updateCertModal"
    preset="card"
    title="修改证书"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-alert type="info">
        可以通过选择网站 / DNS 中的任意一项来自动签发和部署证书，也可以手动输入域名并设置 DNS
        解析来签发证书
      </n-alert>
      <n-form :model="updateCertModel">
        <n-form-item label="域名">
          <n-dynamic-input
            v-model:value="updateCertModel.domains"
            placeholder="example.com"
            :min="1"
            show-sort-button
          />
        </n-form-item>
        <n-form-item path="type" label="密钥类型">
          <n-select
            v-model:value="updateCertModel.type"
            placeholder="选择密钥类型"
            clearable
            :options="algorithms"
          />
        </n-form-item>
        <n-form-item path="website_id" label="网站">
          <n-select
            v-model:value="updateCertModel.website_id"
            placeholder="选择用于部署证书的网站"
            clearable
            :options="websites"
          />
        </n-form-item>
        <n-form-item path="user_id" label="账号">
          <n-select
            v-model:value="updateCertModel.user_id"
            placeholder="选择用于签发证书的账号"
            clearable
            :options="users"
          />
        </n-form-item>
        <n-form-item path="user_id" label="DNS">
          <n-select
            v-model:value="updateCertModel.dns_id"
            placeholder="选择用于签发证书的DNS"
            clearable
            :options="dns"
          />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleUpdateCert">提交</n-button>
    </n-space>
  </n-modal>
  <n-modal
    v-model:show="updateUserModal"
    preset="card"
    title="修改账号"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-alert type="info">
        除了 Let's Encrypt 和 Buypass 外，其他 CA 均需要先去官网申请账号获得 KID 和 HMAC 并填入
      </n-alert>
      <n-alert type="warning">
        大陆机器无法使用 Google CA，其他 CA 视网络情况而定，建议使用 Let's Encrypt
      </n-alert>
      <n-form :model="updateUserModel">
        <n-form-item path="ca" label="CA">
          <n-select
            v-model:value="updateUserModel.ca"
            placeholder="选择 CA"
            clearable
            :options="caProviders"
          />
        </n-form-item>
        <n-form-item path="key_type" label="密钥类型">
          <n-select
            v-model:value="updateUserModel.key_type"
            placeholder="选择密钥类型"
            clearable
            :options="algorithms"
          />
        </n-form-item>
        <n-form-item path="email" label="邮箱">
          <n-input
            v-model:value="updateUserModel.email"
            type="text"
            @keydown.enter.prevent
            placeholder="输入邮箱地址"
          />
        </n-form-item>
        <n-form-item path="kid" label="KID">
          <n-input
            v-model:value="updateUserModel.kid"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 KID"
          />
        </n-form-item>
        <n-form-item path="hmac_encoded" label="HMAC">
          <n-input
            v-model:value="updateUserModel.hmac_encoded"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 HMAC"
          />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleUpdateUser">提交</n-button>
    </n-space>
  </n-modal>
  <n-modal
    v-model:show="updateDNSModal"
    preset="card"
    title="修改 DNS"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-form :model="updateDNSModel">
        <n-form-item path="name" label="备注名称">
          <n-input
            v-model:value="updateDNSModel.name"
            type="text"
            @keydown.enter.prevent
            placeholder="输入备注名称"
          />
        </n-form-item>
        <n-form-item path="type" label="DNS">
          <n-select
            v-model:value="updateDNSModel.type"
            placeholder="选择 DNS"
            clearable
            :options="dnsProviders"
          />
        </n-form-item>
        <n-form-item v-if="updateDNSModel.type == 'dnspod'" path="id" label="ID">
          <n-input
            v-model:value="updateDNSModel.data.id"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 DnsPod ID"
          />
        </n-form-item>
        <n-form-item v-if="updateDNSModel.type == 'dnspod'" path="token" label="Token">
          <n-input
            v-model:value="updateDNSModel.data.token"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 DnsPod Token"
          />
        </n-form-item>
        <n-form-item v-if="updateDNSModel.type == 'aliyun'" path="access_key" label="Access Key">
          <n-input
            v-model:value="updateDNSModel.data.access_key"
            type="text"
            @keydown.enter.prevent
            placeholder="输入阿里云 Access Key"
          />
        </n-form-item>
        <n-form-item v-if="updateDNSModel.type == 'aliyun'" path="secret_key" label="Secret Key">
          <n-input
            v-model:value="updateDNSModel.data.secret_key"
            type="text"
            @keydown.enter.prevent
            placeholder="输入阿里云 Secret Key"
          />
        </n-form-item>
        <n-form-item v-if="updateDNSModel.type == 'cloudflare'" path="email" label="邮箱">
          <n-input
            v-model:value="updateDNSModel.data.email"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 Cloudflare 邮箱"
          />
        </n-form-item>
        <n-form-item v-if="updateDNSModel.type == 'cloudflare'" path="api_key" label="API Key">
          <n-input
            v-model:value="updateDNSModel.data.api_key"
            type="text"
            @keydown.enter.prevent
            placeholder="输入 Cloudflare API Key"
          />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleUpdateDNS">提交</n-button>
    </n-space>
  </n-modal>
</template>
