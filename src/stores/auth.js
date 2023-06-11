import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isUserAuthenticated: localStorage.getItem('isUserAuthenticated') === 'true'
  }),
  actions: {
    setIsUserAuthenticated(value) {
      this.isUserAuthenticated = value
      localStorage.setItem('isUserAuthenticated', value.toString())
    },
  },
  getters: {
    getIsUserAuthenticated() {
      return this.isUserAuthenticated
    }
  }
})

