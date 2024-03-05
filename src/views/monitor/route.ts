import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'monitor',
  path: '/monitor',
  component: Layout,
  meta: {
    order: 3
  },
  children: [
    {
      name: 'monitor-index',
      path: '',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '资源监控',
        icon: 'mdi:monitor',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
