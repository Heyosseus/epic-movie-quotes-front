import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Activation from '@/views/ActivationView.vue'
import ThankYouView from '@/views/ThankYouView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import LoginModal from '@/components/modals/LoginModal.vue'
import RegisterModal from '@/components/modals/RegisterModal.vue'
import ErrorView from '@/views/errors/ErrorView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/login',
          component: LoginModal
        },
        {
          path: '/register',
          component: RegisterModal
        }
      ]
    },
    {
      path: '/activation',
      name: 'activation',
      component: Activation
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: ThankYouView
    },
    {
      path: '/news-feed',
      name: 'news-feed',
      component: NewsFeedView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: ErrorView
    },
    { path: '/forbidden', name: 'forbidden', component: ForbiddenView }
  ]
})

export default router
