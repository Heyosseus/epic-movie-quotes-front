import AxiosInstance from '@/config/axios/index'

const API = {
  login: (values) => {
    return AxiosInstance.post('/api/login', values)
  },
  register: (values) => {
    return AxiosInstance.post('/api/register', values)
  },
  logout: () => {
    return AxiosInstance.post('/api/logout')
  },
  sanctum: () => {
    return AxiosInstance.get('/sanctum/csrf-cookie')
  },
  cookies: () => {
    return AxiosInstance.get('/api/cookie-credentials')
  },
  user: () => {
    return AxiosInstance.get('/api/user')
  },
  notifications: () => {
    return AxiosInstance.get(`/api/notifications`)
  },
  quotes: () => {
    return AxiosInstance.get('/api/quotes')
  },
  movies: () => {
    return AxiosInstance.get('/api/movies')
  },
  addMovies: (values) => {
    return AxiosInstance.post('/api/add-movies', values)
  },
  checkSession: () => {
    return AxiosInstance.get('/api/check-session')
  },
  addComments: (values) => {
    return AxiosInstance.post('/api/add-comments', values)
  },
  commentNotification: (userId, quoteId) => {
    return AxiosInstance.post(`/api/notifications/${userId}/comment`, {
      quote_id: quoteId,
      user_id: userId
    })
  },
  addLike: (quoteId, userId) => {
    return AxiosInstance.post(`/api/quotes/${quoteId}/like/${userId}`, {
      quote_id: quoteId,
      user_id: userId
    })
  },

  addLikeNotification: (quoteId, userId) => {
    return AxiosInstance.post(`/api/notifications/${userId}/like`, {
      quote_id: quoteId,
      user_id: userId
    })
  },
  searchQuotesByQuery: (query) => {
    return AxiosInstance.get(`/api/quotes/?query=${query}`)
  },

  searchMoviesByQuery: (query) => {
    return AxiosInstance.get(`/api/movies/?query=${query}`)
  },
  markNotificationAsRead: (notificationId) => {
    return AxiosInstance.put(`/api/notifications/${notificationId}/mark-as-read`)
  },

  markAllNotificationsAsRead: () => {
    return AxiosInstance.put(`/api/notifications/mark-all-read`)
  },
  showQuotes: (quoteId) => {
    return AxiosInstance.get(`/api/show-quotes/${quoteId}`)
  },
  getMovie: (movieId) => {
    return AxiosInstance.get(`/api/movies/${movieId}`)
  },
  resetPassword: (values) => {
    return AxiosInstance.put('/api/reset-password', values)
  },
  forgotPassword: (values) => {
    return AxiosInstance.post('/api/forgot-password', values)
  }
}

export default API
