import type { Router } from 'vue-router'

import { title } from '@/main'

export function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title
    if (pageTitle) document.title = `${pageTitle} | ${title.value}`
    else document.title = title.value
  })
}
