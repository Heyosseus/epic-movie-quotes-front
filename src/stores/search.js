import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchResults: [],
    searchQuery: '',
    condition: Boolean
  }),
  actions: {
    setSearchResults(results) {
      this.searchResults = results
    }
  },
  getters: {
    getSearchResults() {
      return this.searchResults
    }
  }
})
