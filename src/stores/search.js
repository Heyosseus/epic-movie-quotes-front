import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('quoteStore', {
  state: () => ({
    quotes: []
  }),
  actions: {
    updateQuotes(quotes) {
      this.quotes = quotes
    }
  }
})
