import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    quotes: []
  }),
  actions: {
    addQuote(quote) {
      this.quotes.unshift(quote)
    },
    deleteQuote(quoteId) {
      const index = this.quotes.findIndex((quote) => quote.id === quoteId)
      if (index !== -1) {
        this.quotes.splice(index, 1)
      }
    } 
  }
})
