<template>
  <div class="overflow-x-hidden">
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex-col lg:flex lg:flex-row">
        <BaseSidebar class="hidden sm:block" />
        <div class="flex-col lg:justify-between p-4 md:p-20 md:px-32">
          <div class="hidden sm:block text-2xl">{{ $t('base.description') }}</div>
          <div v-if="movie" class="w-full mb-8 sm:mt-10">
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import { getImages } from '@/config/axios/helpers'

import MovieData from '@/components/movie/MovieData.vue'
import QuoteData from '@/components/quote/QuoteData.vue'

const movie = ref(null)
const quotes = ref(null)
const router = useRouter()
const route = useRoute()
const quoteId = route.params.id
const genre = ref(null)

onMounted(() => {
  const movieId = router.currentRoute.value.params.id
  AxiosInstance.get(`/api/movies/${movieId}`)
    .then((response) => {
      movie.value = response.data.movie
      genre.value = JSON.parse(response.data.movie.genre)
    })
    .catch((error) => {
      console.error(error)
    })
})

onMounted(() => {
  AxiosInstance.get(`/api/quotes/${quoteId}`)
    .then((response) => {
      quotes.value = response.data.quote
    })
    .catch((error) => {
      console.error(error)
    })
})

const handleMovieDelete = () => {
  const movieId = router.currentRoute.value.params.id
  AxiosInstance.delete(`/api/movies/${movieId}`)
    .then((response) => {
      console.log(response)
      router.push({ name: 'movie-list' })
    })
    .catch((error) => {
      console.error(error)
    })
}
const handleQuoteDelete = (quoteId) => {
  AxiosInstance.delete(`/api/quotes/${quoteId}`)
}
</script>
