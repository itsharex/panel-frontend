import type {RouteType} from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'Dashboard',
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    order: 0
  },
  children: [
    {
      name: 'Home',
      path: 'home',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '首页',
        icon: 'mdi:home'
      }
    }
  ]
} as RouteType
