import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: null,
    email: null,
    avatar: null,
    password: null
  }),
  actions: {
    updateProfile(profile) {
      this.name = profile.name
      this.email = profile.email
      this.avatar = profile.avatar
    }
  }
})
