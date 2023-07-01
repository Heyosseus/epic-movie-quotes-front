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
import SearchHeader from '@/components/modals/SearchHeader.vue'
import UpdateQuoteModal from '@/components/modals/quotes/UpdateQuoteModal.vue'
import UpdateMovieModal from '@/components/modals/movies/UpdateMovieModal.vue'
import ViewQuoteModal from '@/components/modals/quotes/ViewQuoteModal.vue'
import SuccessEmail from '@/components/modals/forgot_password/SuccessEmail.vue'
import WriteNewQuoteModal from '@/components/modals/quotes/WriteNewQuoteModal.vue'
import EditUsernameModal from '@/components/modals/profile/EditUsernameModal.vue'
import EditEmailModal from '@/components/modals/profile/EditEmailModal.vue'
import AreYouSure from '@/components/modals/profile/AreYouSure.vue'
import FlashMessages from '@/components/modals/profile/FlashMessages.vue'
import AreYouSureForEmail from '@/components/modals/profile/AreYouSureForEmail.vue'

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
      props: true,
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
        },
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
          props: true,
          component: UpdatePassword,
          beforeEnter: authGuard
        },
        {
          path: '/success',
          name: 'success',
          props: true,
          component: SuccessModal
        },
        {
          path: '/success-email',
          name: 'success-email',
          component: SuccessEmail
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
      component: NewsFeedView,
      beforeEnter: authGuard,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: MenuSidebar
        },
        {
          path: '/search',
          name: 'search',
          component: SearchHeader
        },
        {
          path: 'write-quote',
          name: 'write-quote',
          component: WriteNewQuoteModal
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
      path: '/profile',
      name: 'profile',
      beforeEnter: authGuard,
      component: ProfileModal,
      children: [
        {
          path: '/edit-username',
          name: 'edit-username',
          component: EditUsernameModal,
          props: true,
          children: [
            {
              path: '/username-update',
              name: 'are-you-sure',
              component: AreYouSure,
              props: true
            }
          ]
        },
        {
          path: '/edit-email',
          name: 'edit-email',
          component: EditEmailModal,
          props: true,
          children: [
            {
              path: '/email-update',
              name: 'are-you-sure',
              component: AreYouSureForEmail,
              props: true
            }
          ]
        },

        {
          path: '/flash-messages',
          name: 'flash-messages',
          component: FlashMessages
        }
      ]
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
          path: '/movie/:movie_id/update-quote/:id',
          name: 'update-quote',
          component: UpdateQuoteModal
        },
        {
          path: '/movie/:movie_id/view-quote/:id',
          name: 'view-quote',
          component: ViewQuoteModal
        }
      ]
    }
  ]
})

export default router
