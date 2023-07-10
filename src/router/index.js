import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const Activation = () => import('@/views/ActivationView.vue')
const ThankYouView = () => import('@/views/ThankYouView.vue')
const NewsFeedView = () => import('@/views/feeds/NewsFeedView.vue')
const MovieListView = () => import('@/views/feeds/MovieListView.vue')
const LoginModal = () => import('@/components/modals/auth/LoginModal.vue')
const RegisterModal = () => import('@/components/modals/auth/RegisterModal.vue')
const ErrorView = () => import('@/views/errors/ErrorView.vue')
const ForbiddenView = () => import('@/views/errors/ForbiddenView.vue')
const ForgotPassword = () => import('@/components/modals/forgot_password/ForgotPassword.vue')
const ResetPassword = () => import('@/components/modals/forgot_password/ResetPassword.vue')
const UpdatePassword = () => import('@/components/modals/forgot_password/UpdatePassword.vue')
const SuccessModal = () => import('@/components/modals/forgot_password/SuccessModal.vue')
const LinkExpired = () => import('@/components/modals/forgot_password/LinkExpired.vue')
const SessionExpired = () => import('@/components/modals/forgot_password/SessionExpired.vue')
const AddMovieModal = () => import('@/components/modals/movies/AddMovieModal.vue')
const MovieDescriptionView = () => import('@/views/feeds/MovieDescriptionView.vue')
const AddQuoteModal = () => import('@/components/modals/quotes/AddQuoteModal.vue')
const ProfileModal = () => import('@/components/modals/ProfileModal.vue')
const MenuSidebar = () => import('@/components/modals/MenuSidebar.vue')
const SearchHeader = () => import('@/components/modals/SearchHeader.vue')
const UpdateQuoteModal = () => import('@/components/modals/quotes/UpdateQuoteModal.vue')
const UpdateMovieModal = () => import('@/components/modals/movies/UpdateMovieModal.vue')
const ViewQuoteModal = () => import('@/components/modals/quotes/ViewQuoteModal.vue')
const SuccessEmail = () => import('@/components/modals/forgot_password/SuccessEmail.vue')
const WriteNewQuoteModal = () => import('@/components/modals/quotes/WriteNewQuoteModal.vue')
const EditUsernameModal = () => import('@/components/modals/profile/EditUsernameModal.vue')
const EditEmailModal = () => import('@/components/modals/profile/EditEmailModal.vue')
const AreYouSure = () => import('@/components/modals/profile/AreYouSure.vue')
const FlashMessages = () => import('@/components/modals/profile/FlashMessages.vue')
const AreYouSureForEmail = () => import('@/components/modals/profile/AreYouSureForEmail.vue')
const TriggerComp = () => import('@/views/feeds/TriggerComp.vue')
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
      props: true,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: MenuSidebar
        },
        {
          path: '/search',
          name: 'search',
          component: SearchHeader,
          props: true
        },
        {
          path: '/write-quote',
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
    {
      path: '/trigger',
      component: TriggerComp
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
              name: 'are-you-sure-for-email',
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
    },
    {
      path: '/session-expired',
      name: 'session-expired',
      component: SessionExpired
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
