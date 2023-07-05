import { defineStore } from 'pinia'
import AxiosInstance from '@/config/axios/index.js'

export const useAuthUser = defineStore('user', {
  state: () => ({
    authUser: null
  }),
  actions: {
    setAuthUser() {
      AxiosInstance.get('/api/user').then((response) => {
        this.authUser = response.data
      })
    }
  },
  getters: {
    getAuthUser() {
      return this.authUser
    }
  }
})
