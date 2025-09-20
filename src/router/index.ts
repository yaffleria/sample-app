import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../i18n'
import type { LocalizedText } from '@/types/discovery'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:lang(en|ko)/discovery', name: 'discovery', component: () => import('../views/DiscoveryView.vue') },
  ],
})

router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  if (typeof lang === 'string' && ['en', 'ko'].includes(lang)) {
    i18n.global.locale.value = lang as LocalizedText
  }
  next()
})

export default router
