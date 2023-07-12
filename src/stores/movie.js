import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    quotes: []

  }),
  actions: {
    addMovie(movie) {
      this.movies.unshift(movie)
    }
  },
  async onInit() {
    try {
      const backendURL = import.meta.env.VITE_PUBLIC_BACKEND_URL
      const response = await axios.get(`${backendURL}/api/movies`)
      this.movies = response.data.data
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }
})
