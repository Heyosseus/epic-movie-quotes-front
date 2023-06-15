import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isUserAuthenticated: localStorage.getItem('isUserAuthenticated') === 'true',
    isGoogleAuthenticated: localStorage.getItem('isGoogleAuthenticated') === 'true'
  }),
  actions: {
    setIsUserAuthenticated(value) {
      this.isUserAuthenticated = value
      localStorage.setItem('isUserAuthenticated', value.toString())
    },
    setIsGoogleAuthenticated(value) {
      this.isGoogleAuthenticated = value
      localStorage.setItem('isGoogleAuthenticated', value.toString())
    }
  },
  getters: {
    getIsUserAuthenticated() {
      return this.isUserAuthenticated
    },
    getIsGoogleAuthenticated() {
      return this.isGoogleAuthenticated
    }
  }
})
