<template>
  <div class="relative">
    <teleport to="body">
      <div class="lg:hidden absolute w-full h-full flex flex-col bg-landingBg px-4 py-6">
        <form class="flex items-center" @submit.prevent="search">
          <IconArrowBackVue width="40" height="15" @click="router.push({ name: 'news-feed' })" />
          <input
            type="text"
            placeholder="Search"
            class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-white"
            v-model="searchQuery"
          />
        </form>
        <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>
        <button @click="search">send</button>

        <div class="text-gray-400 flex items-center space-y-2 flex-col just mt-10">
          <p>Enter @ to search movies</p>
          <p>Enter # to search quotes</p>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import IconArrowBackVue from '../icons/IconArrowBack.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { useQuoteStore } from '@/stores/search.js'

const quoteStore = useQuoteStore()
const router = useRouter()

const searchQuery = ref('')
const quotes = ref([])

const search = () => {
  if (searchQuery.value.startsWith('@')) {
    const movieQuery = searchQuery.value.substring(1)
    AxiosInstance.get(`/api/movies/?query=${movieQuery}`).then((response) => {
      quotes.value = response.data.data
      quoteStore.updateQuotes(quotes)
      router.push({ name: 'news-feed' })
      console.log(quotes.value)
    })
  } else if (searchQuery.value.startsWith('#')) {
    const quoteQuery = searchQuery.value.substring(1)
    AxiosInstance.get(`/api/quotes/?query=${quoteQuery}`).then((response) => {
      quotes.value = response.data.data
      quoteStore.updateQuotes(quotes)
      router.push({ name: 'news-feed' })
      console.log(quotes.value)
    })
  }
}
</script>
