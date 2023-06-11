import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: ref(false),
    isQuoteModalOpen: ref(true),
  }),
  actions: {
    setIsModalOpen() {
      this.isModalOpen.valueOf = !this.isModalOpen.valueOf
    }
  },
  getters: {
    getIsModalOpen() {
      return this.isModalOpen
    }
  }
})
