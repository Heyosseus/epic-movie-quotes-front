import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Activation from '@/views/ActivationView.vue'
import ThankYouView from '@/views/ThankYouView.vue'
import NewsFeedView from '@/views/feeds/NewsFeedView.vue'
import MovieListView from '@/views/feeds/MovieListView.vue'
import LoginModal from '@/components/modals/auth/LoginModal.vue'
import RegisterModal from '@/components/modals/auth/RegisterModal.vue'
import ErrorView from '@/views/errors/ErrorView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import ForgotPassword from '@/components/modals/forgot_password/ForgotPassword.vue'
import ResetPassword from '@/components/modals/forgot_password/ResetPassword.vue'
import UpdatePassword from '@/components/modals/forgot_password/UpdatePassword.vue'
import SuccessModal from '@/components/modals/forgot_password/SuccessModal.vue'
import LinkExpired from '@/components/modals/forgot_password/LinkExpired.vue'
import SessionExpired from '@/components/modals/forgot_password/SessionExpired.vue'
import AddMovieModal from '@/components/modals/movies/AddMovieModal.vue'
import MovieDescriptionView from '@/views/feeds/MovieDescriptionView.vue'
import AddQuoteModal from '@/components/modals/quotes/AddQuoteModal.vue'
import ProfileModal from '@/components/modals/ProfileModal.vue'
import MenuSidebar from '@/components/modals/MenuSidebar.vue'
import UpdateQuoteModal from '@/components/modals/quotes/UpdateQuoteModal.vue'
import UpdateMovieModal from '@/components/modals/movies/UpdateMovieModal.vue'

import { useAuthStore } from '@/stores/auth.js'

const authGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const isUserAuthenticated = authStore.getIsUserAuthenticated
  const isGoogleAuthenticated = authStore.getIsGoogleAuthenticated

  if (to.path === '/login') {
    next()
  } else if (isUserAuthenticated || isGoogleAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

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
          name: 'login',
          component: LoginModal
        },
        {
          path: '/register',
          name: 'register',
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
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   component: MenuSidebar
    // },
    {
      path: '/news-feed',
      name: 'news-feed',
      component: NewsFeedView,
      beforeEnter: authGuard,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: MenuSidebar
        }
      ]
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
      component: ForgotPassword,
      beforeEnter: authGuard
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      beforeEnter: authGuard
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePassword,
      beforeEnter: authGuard
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
    },
    {
      path: '/session-expired',
      name: 'session-expired',
      component: SessionExpired
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: authGuard,
      component: ProfileModal
    },
    {
      path: '/movie-list',
      name: 'movie-list',
      component: MovieListView,
      beforeEnter: authGuard,
      children: [
        {
          path: '/add-movie',
          name: 'add-movie',
          component: AddMovieModal
        },
        {
          path: '/update-movie/:id',
          name: 'update-movie',
          component: UpdateMovieModal
        }
      ]
    },
    {
      path: '/movie/:id',
      name: 'description',
      component: MovieDescriptionView,
      beforeEnter: authGuard,
      children: [
        {
          path: '/add-quote/:id',
          name: 'add-quote',
          component: AddQuoteModal
        },
        {
          path: '/update-quote/:id',
          name: 'update-quote',
          component: UpdateQuoteModal
        }
      ]
    }
  ]
})

export default router
