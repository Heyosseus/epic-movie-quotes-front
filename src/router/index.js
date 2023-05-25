import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Activation from '@/views/ActivationView.vue'
import ThankYouView from '@/views/ThankYouView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import LoginModal from '@/components/modals/LoginModal.vue'
import RegisterModal from '@/components/modals/RegisterModal.vue'
import ErrorView from '@/views/errors/ErrorView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import ForgotPassword from '@/components/modals/forgot_password/ForgotPassword.vue'
import ResetPassword from '@/components/modals/forgot_password/ResetPassword.vue'
import UpdatePassword from '@/components/modals/forgot_password/UpdatePassword.vue'
import SuccessModal from '@/components/modals/forgot_password/SuccessModal.vue'
import LinkExpired from '@/components/modals/forgot_password/LinkExpired.vue'
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
    { path: '/forbidden', name: 'forbidden', component: ForbiddenView },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePassword
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessModal
    },
    {
      path: '/link-expired',
      name: 'link-expired',
      component: LinkExpired
    }
  ]
})

export default router
