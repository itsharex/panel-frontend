import type {RouteModule, RoutesType, RouteType} from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export const basicRoutes: RoutesType = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/NotFound.vue'),
    isHidden: true
  },

  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/IndexView.vue'),
    isHidden: true,
    meta: {
      title: '登录页'
    }
  },

  {
    name: 'ExternalLink',
    path: '/external-link',
    component: Layout,
    meta: {
      title: '外部链接',
      icon: 'mdi:link-variant',
      order: 3
    },
    children: [
      {
        name: 'github',
        path: 'https://github.com/haozi-team',
        component: () => {
        },
        meta: {
          title: 'GitHub',
          icon: 'mdi:github'
        }
      },
      {
        name: 'weavatar',
        path: 'https://weavatar.com',
        component: () => {
        },
        meta: {
          title: 'WeAvatar',
          icon: 'simple-icons:gravatar'
        }
      }
    ]
  }
]

export const NOT_FOUND_ROUTE: RouteType = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true
}

export const EMPTY_ROUTE: RouteType = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: () => {
  }
}

const modules = import.meta.glob('@/views/**/route.ts', {
  eager: true
}) as RouteModule
const asyncRoutes: RoutesType = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export {asyncRoutes}
