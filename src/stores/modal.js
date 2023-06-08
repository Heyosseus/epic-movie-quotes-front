import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  function show() {
    isOpen.value = true
  }

  return { isOpen, show }
})
