import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    quotes: []
  }),
  actions: {
    addQuote(quote) {
      this.quotes.unshift(quote)
    }
  }
})
