import { defineStore } from 'pinia'
export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'en'
  }),
  actions: {
    setLocale(value) {
      this.locale = value
    }
  },
  getters: {
    getLocale() {
      return this.locale
    }
  }
})
