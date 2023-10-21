import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'home-index',
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    order: 0
  },
  children: [
    {
      name: '首页',
      path: 'home',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '首页',
        icon: 'mdi:home',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
