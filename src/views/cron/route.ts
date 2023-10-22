import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'cron',
  path: '/cron',
  component: Layout,
  meta: {
    order: 5
  },
  children: [
    {
      name: 'cron-index',
      path: '',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '计划任务',
        icon: 'mdi:clock-outline',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
