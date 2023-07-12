import { createRouter, createWebHistory } from 'vue-router'

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
      component: import('@/views/HomeView.vue'),
      props: true,
      children: [
        {
          path: '/login',
          name: 'login',
          component: import('@/components/modals/auth/LoginModal.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: import('@/components/modals/auth/RegisterModal.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: import('@/components/modals/forgot_password/ForgotPassword.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/reset-password',
          name: 'reset-password',
          component: import('@/components/modals/forgot_password/ResetPassword.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/update-password',
          name: 'update-password',
          props: true,
          component: import('@/components/modals/forgot_password/UpdatePassword.vue'),
          beforeEnter: authGuard
        },
        {
          path: '/success',
          name: 'success',
          props: true,
          component: import('@/components/modals/forgot_password/SuccessModal.vue')
        },
        {
          path: '/success-email',
          name: 'success-email',
          component: import('@/components/modals/forgot_password/SuccessEmail.vue')
        },
        {
          path: '/link-expired',
          name: 'link-expired',
          component: import('@/components/modals/forgot_password/LinkExpired.vue')
        }
      ]
    },
    {
      path: '/activation',
      name: 'activation',
      component: import('@/views/ActivationView.vue')
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: import('@/views/ThankYouView.vue')
    },
    {
      path: '/thanks-google',
      name: 'thanks-google',
      component: import('@/views/ThanksForGoogle.vue')
    },
    {
      path: '/news-feed',
      name: 'news-feed',
      component: () => import('@/views/feeds/NewsFeedView.vue'),
      beforeEnter: authGuard,
      props: true,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: import('@/components/modals/MenuSidebar.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: import('@/components/modals/SearchHeader.vue'),
          props: true
        },
        {
          path: '/write-quote',
          name: 'write-quote',
          component: import('@/components/modals/quotes/WriteNewQuoteModal.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: import('@/views/errors/ErrorView.vue')
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: import('@/views/errors/ForbiddenView.vue')
    },

    {
      path: '/profile',
      name: 'profile',
      beforeEnter: authGuard,
      component: import('@/components/modals/ProfileModal.vue'),
      children: [
        {
          path: '/edit-username',
          name: 'edit-username',
          component: import('@/components/modals/profile/EditUsernameModal.vue'),
          props: true,
          children: [
            {
              path: '/username-update',
              name: 'are-you-sure',
              component: import('@/components/modals/profile/AreYouSure.vue'),
              props: true
            }
          ]
        },
        {
          path: '/edit-email',
          name: 'edit-email',
          component: import('@/components/modals/profile/EditEmailModal.vue'),
          props: true,
          children: [
            {
              path: '/email-update',
              name: 'are-you-sure-for-email',
              component: import('@/components/modals/profile/AreYouSureForEmail.vue'),
              props: true
            }
          ]
        },

        {
          path: '/flash-messages',
          name: 'flash-messages',
          component: import('@/components/modals/profile/FlashMessages.vue')
        }
      ]
    },
    {
      path: '/movie-list',
      name: 'movie-list',
      component: import('@/views/feeds/MovieListView.vue'),
      beforeEnter: authGuard,
      children: [
        {
          path: '/add-movie',
          name: 'add-movie',
          component: import('@/components/modals/movies/AddMovieModal.vue')
        },
        {
          path: '/update-movie/:id',
          name: 'update-movie',
          component: import('@/components/modals/movies/UpdateMovieModal.vue')
        }
      ]
    },
    {
      path: '/movie/:id',
      name: 'description',
      component: import('@/views/feeds/MovieDescriptionView.vue'),
      beforeEnter: authGuard,
      children: [
        {
          path: '/add-quote/:id',
          name: 'add-quote',
          component: import('@/components/modals/quotes/AddQuoteModal.vue')
        },
        {
          path: '/movie/:movie_id/update-quote/:id',
          name: 'update-quote',
          component: import('@/components/modals/quotes/UpdateQuoteModal.vue')
        },
        {
          path: '/movie/:movie_id/view-quote/:id',
          name: 'view-quote',
          component: import('@/components/modals/quotes/ViewQuoteModal.vue')
        }
      ]
    },
    {
      path: '/session-expired',
      name: 'session-expired',
      component: import('@/components/modals/forgot_password/SessionExpired.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.statusCode === 403) {
    next({ name: 'forbidden' })
  } else {
    next()
  }
})

export default router
