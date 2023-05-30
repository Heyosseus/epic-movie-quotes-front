<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] h-auto">
      <div class="flex">
        <BaseSidebar />
        <div class="w-full px-16 pr-56">
          <div class="flex items-center w-full justify-between mt-8 pl-4">
            <h1 class="text-lg w-full mt-10">My list of movies ({{ movies.length }})</h1>
            <AddMovie />
          </div>

          <div class="mt-20">
            <div class="flex flex-wrap">
              <div v-for="movie in movies" :key="movie.id" class="w-1/3 pl-6 mb-8">
                <div class="flex flex-col items-center">
                  <img :src="movie.poster" alt="" class="rounded-2xl" />
                  <div class="flex space-x-4 mr-auto mt-4 mb-10">
                    <h1 class="uppercase">{{ parseTitle(movie.title) }}</h1>
                    <p class="">({{ movie.release_date }})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import AddMovie from '@/components/layout/AddMovie.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const movies = ref([])

const getMovies = () => {
  axios
    .get('http://localhost:8000/api/movies')
    .then((res) => {
      console.log(res.data)
      movies.value = res.data.movie
      console.log(movies.value)
    })
    .catch((err) => {
      console.log(err)
    })
}
onMounted(() => {
  getMovies()
})

const parseTitle = (title) => {
  try {
    const parsedTitle = JSON.parse(title)
    return parsedTitle.en
  } catch (error) {
    console.log('Error parsing title:', error)
    return ''
  }
}
</script>
