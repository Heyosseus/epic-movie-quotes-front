<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-full">
      <div class="flex flex-col w-full md:flex-row">
        <BaseSidebar />
        <div class="w-full  md:pl-16" v-if="!show">
          <div class="flex items-center w-full justify-between mt-8 md:mt-0 pl-4 lg:pr-56">
            <h1 class="text-sm w-full mb-2 md:w-full md:mt-10 lg:text-xl">
              {{ $t('base.list') }} ({{ movies.length }})
            </h1>
            <Form method="GET" @keydown.enter.prevent="handleSearch" class="hidden lg:flex mt-6">
              <div class="flex items-center">
                <IconSearch @click="handleSearch" />
                <Field
                  name="search"
                  type="text"
                  class="bg-transparent outline-0 w-36 md:w-auto flex items-center justify-center px-2"
                  :placeholder="$t('base.search_by')"
                  v-model="search"
                />
              </div>
            </Form>
            <AddMovie class="ml-1"/>
          </div>

          <div
            class="mt-8 md:mt-20 max-h-[870px] overflow-y-auto lg:pr-40"
            v-if="movies && movies.length > 0"
          >
            <div class="flex flex-wrap">
              <div
                v-for="movie in movies"
                :key="movie.id"
                class="w-full md:w-1/3 pl-4 md:pl-6 mb-8"
              >
                <div class="flex flex-col items-center" @click="redirectToMovie(movie.id)">
                  <img
                    :src="getImages(movie.poster)"
                    alt=""
                    class="rounded-2xl object-fit h-64 md:h-96 mr-auto cursor-pointer"
                  />
                  <div class="flex space-x-2 md:space-x-4 mr-auto mt-2 md:mt-4 mb-4 md:mb-10">
                    <h1 class="uppercase">{{ movie.title.en }}</h1>
                    <p class="">({{ movie.release_date }})</p>
                  </div>
                  <div class="flex space-x-3 items-center mr-auto" v-if="movie">
                    <span>{{ movie?.quotes?.length }}</span>
                    <IconComment />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h1 class="text-2xl text-center mt-32">{{ $t('base.no_movie') }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconComment from '@/components/icons/IconComment.vue'
import { Form, Field } from 'vee-validate'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import AddMovie from '@/components/layout/AddMovie.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getImages } from '@/config/axios/helpers'
import { useMovieStore } from '@/stores/movie.js'

const movieStore = useMovieStore()

const search = ref('')
const movies = ref([])
const show = ref(false)
const router = useRouter()

const redirectToMovie = (movie_id) => {
  router.push(`/movie/${movie_id}`)
  show.value = !show.value
}

const handleSearch = () => {
  const searchUrl = import.meta.env.VITE_PUBLIC_BACKEND_SEARCH_URL
  axios
    .get(`${searchUrl}?search=${search.value}`)
    .then((res) => {
      movies.value = res.data.data
      movieStore.movies = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const getMovies = () => {
  const backendURL = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .get(`${backendURL}/api/movies`)
    .then((res) => {
      movies.value = res.data.data
      movieStore.movies = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
onMounted(() => {
  getMovies()
})
</script>
