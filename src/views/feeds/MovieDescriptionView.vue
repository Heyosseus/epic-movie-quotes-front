<template>
  <div class="overflow-x-hidden">
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex-col lg:flex lg:flex-row">
        <BaseSidebar class="hidden sm:block" />
        <div class="flex-col lg:justify-between p-4 md:p-20 md:px-32">
          <div class="hidden sm:block text-2xl">Movie description</div>
          <div v-if="movie" class="w-full mb-8 sm:mt-10">
            <div class="flex flex-col md:flex-row space-x-0 md:space-x-12 w-full">
              <div class="w-full h-[240px] rounded sm:w-form sm:h-posterHeight">
                <img
                  :src="getImages(movie.poster)"
                  alt=""
                  class="w-full sm:w-full h-full object-contain rounded-md cursor-pointer"
                />
              </div>

              <div>
                <div class="flex flex-col">
                  <div class="flex space-x-12 items-center mr-auto mb-10 mt-4 text-[#DDCCAA]">
                    <div class="flex space-x-2 text-xl">
                      <h1 class="uppercase">{{ movie.title.en }}</h1>
                      <p class="">({{ movie.release_date }})</p>
                    </div>
                    <div
                      class="hidden sm:flex space-x-6 bg-headerBg p-4 px-7 rounded-2xl cursor-pointer"
                    >
                      <router-link :to="{ name: 'update-movie' }">
                        <IconEdit />
                      </router-link>
                      <div class="w-[1px] bg-gray-400"></div>
                      <IconTrash @click="handleDelete" />
                    </div>
                  </div>
                  <div class="flex space-x-4 text-lg">
                    <div
                      v-for="item in genre"
                      :key="item.id"
                      class="text-white bg-genre py-1 px-3 rounded"
                    >
                      {{ item.value }}
                    </div>
                  </div>
                  <div class="flex space-x-4 text-lg mt-6">
                    <p class="text-gray-400">Director:</p>
                    <p class="text-white">{{ JSON.parse(movie.director).en }}</p>
                  </div>
                  <p class="mt-10 break-words w-form">{{ JSON.parse(movie.description).en }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- quotes -->
          <div>
            <div class="flex items-center lg:space-x-12 mt-20">
              <h1 v-if="quotes" class="hidden sm:block text-sm lg:text-xl">
                Quotes total ({{ quotes.length }})
              </h1>
              <h1 v-else class="hidden sm:block text-xl">No quotes yet</h1>
              <div
                class="px-2 py-2 bg-red-600 sm:w-48 sm:text-lg sm:bg-red-600 md:px-4 md:py-3 rounded flex items-center space-x-2"
              >
                <IconAddMovie />
                <button class="" v-if="movie">
                  <router-link :to="{ name: 'add-quote', params: { id: movie.id } }"
                    >Add Quote</router-link
                  >
                </button>
                <router-view />
              </div>
            </div>
            <div v-if="quotes" class="lg:w-form mt-10">
              <div
                v-for="quote in quotes"
                :key="quote.id"
                class="space-y-6 mt-16 bg-movie px-6 py-8 w-full lg:w-[800px] rounded-xl"
              >
                <div class="flex items-center space-x-2 break-words relative w-fit lg:w-full">
                  <img
                    :src="getImages(quote.thumbnail)"
                    alt=""
                    class="w-44 h-thumbnailHeight object-contain rounded-md"
                  />
                  <p class="italic text-gray-400">"{{ quote.body }}"</p>
                  <IconDots class="absolute top-1 right-2" />
                </div>
                <div class="h-[1px] w-full lg:w-form bg-gray-600 mt-6"></div>
              </div>
            </div>
          </div>
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
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
import IconDots from '@/components/icons/IconDots.vue'
import { getImages } from '@/config/axios/helpers'
// import UpdateMovieModal from '@/components/modals/UpdateMovieModal.vue'

const movie = ref(null)
const quotes = ref(null)
const router = useRouter()
const route = useRoute()
const movieId = route.params.id
const genre = ref(null)

onMounted(() => {
  const movieId = router.currentRoute.value.params.id
  AxiosInstance.get(`/api/movies/${movieId}`)
    .then((response) => {
      movie.value = response.data.movie
      genre.value = JSON.parse(response.data.movie.genre)
      console.log(genre.value)
    })
    .catch((error) => {
      console.error(error)
    })
})

onMounted(() => {
  AxiosInstance.get(`/api/quotes/${movieId}`)
    .then((response) => {
      quotes.value = response.data.quote
    })
    .catch((error) => {
      console.error(error)
    })
})

const handleDelete = () => {
  AxiosInstance.delete(`/api/movies/${movieId}`)
    .then((response) => {
      console.log(response)
      router.push({ name: 'movie-list' })
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
