import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/views/UserEditView.vue')
    }
  ]
})

export default router
