<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex">
        <BaseSidebar />
        <div class="w-full px-16 pr-56">
          <div class="flex items-center w-full justify-between mt-8 pl-4">
            <h1 class="text-lg w-full mt-10">My list of movies ({{ movies.length }})</h1>
            <Form method="GET" @keydown.enter.prevent="handleSearch">
              <div class="flex items-center">
                <IconSearch @click="handleSearch" />
                <Field
                  name="search"
                  type="text"
                  class="bg-transparent outline-0 w-36 flex items-center justify-center px-2"
                  placeholder="Search by"
                  v-model="search"
                />
              </div>
            </Form>
            <AddMovie />
          </div>

          <div class="mt-20" v-if="movies.length > 0">
            <div class="flex flex-wrap">
              <div v-for="movie in movies" :key="movie.id" class="w-1/3 pl-6 mb-8">
                <div class="flex flex-col items-center">
                  <img
                    :src="getImages(movie.poster)"
                    alt=""
                    class="rounded-2xl object-fit h-96 mr-auto"
                  />
                  <div class="flex space-x-4 mr-auto mt-4 mb-10">
                    <h1 class="uppercase">{{ movie.title.en }}</h1>
                    <p class="">({{ movie.release_date }})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h1 class="text-2xl text-center mt-96">No movie yet</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import { Form, Field } from 'vee-validate'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import AddMovie from '@/components/layout/AddMovie.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
const search = ref('')
const movies = ref([])

const handleSearch = () => {
  axios
    .get(`http://localhost:8000/api/movies?search=${search.value}`)
    .then((res) => {
      console.log(res.data)
      movies.value = res.data.movie
    })
    .catch((err) => {
      console.log(err)
    })
}

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

const getImages = (poster) => {
  return `http://localhost:8000/storage/${poster}`
}
</script>
