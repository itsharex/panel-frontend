import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'container',
  path: '/container',
  component: Layout,
  meta: {
    order: 5
  },
  children: [
    {
      name: 'container-index',
      path: '',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '容器管理',
        icon: 'mdi:layers-outline',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
