<template>
  <div class="">
    <BaseHeader />
    <div class="bg-[#181624] min-h-full overflow-x-hidden">
      <div class="flex-col lg:flex lg:flex-row">
        <BaseSidebar class="hidden sm:block" />
        <div
          class="flex-col lg:justify-between p-4 md:p-20 md:px-32 max-h-[90vh] overflow-x-hidden sm:overflow-y-auto sm:w-full"
        >
          <div class="hidden sm:block text-2xl">{{ $t('base.description') }}</div>
          <div v-if="movie" class="w-full mb-4 sm:mt-10">
            <div class="flex flex-col md:flex-row space-x-0 md:space-x-12 w-full">
              <div class="w-full h-[240px] rounded sm:w-form sm:h-posterHeight">
                <img
                  :src="getImages(movie.poster)"
                  alt=""
                  class="w-full sm:w-full h-full object-contain rounded-md cursor-pointer"
                />
              </div>
              <movie-data :movie="movie" :handle_movie_delete="handleMovieDelete"></movie-data>
            </div>
          </div>

          <quote-data
            :quote="quotes"
            :movie="movie"
            :handle_delete_quote="handleQuoteDelete"
          ></quote-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import { getImages } from '@/utils/images'

import MovieData from '@/components/movie/MovieData.vue'
import QuoteData from '@/components/quote/QuoteData.vue'
import { useQuoteStore } from '@/stores/quotes.js'

const quoteStore = useQuoteStore()
const movie = ref(null)
const quotes = ref(null)
const router = useRouter()

const movieId = router.currentRoute.value.params.id
AxiosInstance.get(`/api/movies/${movieId}`).then((response) => {
  movie.value = response.data.data
  quotes.value = response.data.data.quotes.reverse()
  quoteStore.quotes = response.data.data.quotes
})

const handleMovieDelete = () => {
  const movieId = router.currentRoute.value.params.id
  AxiosInstance.delete(`/api/movies/${movieId}`).then((response) => {
    console.log(response)
    router.push({ name: 'movie-list' })
  })
}
const handleQuoteDelete = async (quoteId) => {
  try {
    await AxiosInstance.delete(`/api/quotes/${quoteId}`)
    quoteStore.deleteQuote(quoteId)
  } catch (error) {
    console.error(error)
  }
}
</script>
