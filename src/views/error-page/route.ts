import type {RouteType} from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'error',
  path: '/error-page',
  component: Layout,
  redirect: '/error-page/404',
  meta: {
    title: '错误页',
    order: 99,
    icon: 'mdi:alert-circle-outline'
  },
  children: [
    {
      name: 'ERROR-404',
      path: '404',
      component: () => import('./NotFound.vue'),
      meta: {
        title: '404',
        icon: 'tabler:error-404'
      }
    }
  ]
} as RouteType
