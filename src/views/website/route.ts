import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'website',
  path: '/',
  component: Layout,
  meta: {
    order: 1
  },
  children: [
    {
      name: 'website-index',
      path: 'website',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '网站管理',
        icon: 'mdi:web',
        role: ['admin'],
        requireAuth: true
      }
    },
    {
      name: 'website-edit',
      path: 'website/edit/:id',
      component: () => import('./EditView.vue'),
      isHidden: true,
      meta: {
        title: '编辑网站',
        icon: 'mdi:web',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
