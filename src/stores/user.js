import { defineStore } from 'pinia'
import AxiosInstance from '@/config/axios/index.js'

export const useAuthUser = defineStore('user', {
  state: () => ({
    authUser: null
  }),
  actions: {
    async setAuthUser() {
      try {
        const response = await AxiosInstance.get('/api/user')
        this.authUser = response.data
      } catch (error) {
        console.error('Error setting authenticated user:', error)
      }
    }
  },
  getters: {
    getAuthUser() {
      return this.authUser
    }
  }
})
