import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/country/:name',
      name: 'country-detail',
      component: DetailView,
      props: true,
    },
    // Catch all route - redirect to home if country not found
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
