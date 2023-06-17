<template>
  <div class="flex mx-auto w-full mt-4 ml-0 sm:flex lg:mt-10 justify-between lg:w-[921px]">
    <div
      class="w-full sm:bg-transparent flex lg:flex lg:bg-headerBg py-3 px-6 space-x-4 h-14 items-center lg:w-full"
    >
      <IconPencil />
      <router-link :to="{ name: 'write-quote' }" class="text-search">Write new quote</router-link>
    </div>
    <form action="" class="h-16 ml-10 mt-3 w-[1840px]" v-if="showSearchBar" @submit.prevent="search">
      <div class="flex">
        <IconSearch />
        <input
          type="text"
          placeholder="Enter @ to search movies, Enter # to search quotes"
          class="bg-transparent ml-6 w-full outline-0 text-search"
          v-model="searchQuery"
        />
      </div>

      <div class="h-[1px] bg-[#EFEFEF4D] w-full mt-4"></div>
    </form>
    <div class="hidden sm:flex items-center h-14 ml-4" @click="handleShow" v-if="showButton">
      <IconSearch />
      <button class="bg-[#181624] h-14 w-28 rounded-full flex items-center justify-center">
        <p class="text-search">Search by</p>
      </button>
    </div>
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        {{ result }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'
import IconSearch from '../icons/IconSearch.vue'
import { ref } from 'vue'
import AxiosInstance from '@/config/axios/index.js'
// import AxiosInstance from '../../config/axios'

const showSearchBar = ref(false)
const showButton = ref(true)
// const quotes = ref(null)

const handleShow = () => {
  showSearchBar.value = !showSearchBar.value
  showButton.value = !showButton.value
}

const searchQuery = ref('')
const searchResults = ref([])

const search = () => {
  console.log('searching')
  if (searchQuery.value.startsWith('@')) {
    searchMovies()
    console.log('searching movies')
  } else if (searchQuery.value.startsWith('#')) {
    searchQuotes()
    console.log('searching quotes')
  }
}

const searchMovies = () => {
  const query = searchQuery.value.substring(1)
  AxiosInstance.get(`/api/search-movies/${query}`)
    .then((response) => {
      searchResults.value = response.data
      console.log(searchResults.value)
    })
    .catch((error) => {
      console.error(error)
    })
}

const searchQuotes = () => {
  const query = searchQuery.value.substring(1)
  AxiosInstance.get(`/api/search-quotes/${query}`)
    .then((response) => {
      searchResults.value = response.data
      console.log(searchResults.value)
    })
    .catch((error) => {
      console.error(error)
    })
}

// onMounted(() => {
//   AxiosInstance.get(`/api/quotes`)
//     .then((response) => {
//       quotes.value = response.data.quotes
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// })
</script>
