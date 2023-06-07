<template>
  <div class="flex mt-10 ml-40 justify-between w-[921px]">
    <div class="flex bg-headerBg py-3 px-6 space-x-4 h-14 items-center w-full">
      <IconPencil />
      <router-link :to="{ name: 'add-quote', params: { id: 0 } }" class="text-search"
        >Write new quote</router-link
      >
    </div>
    <form action="" class="h-16 ml-10 mt-3 w-[1840px]" v-if="showSearchBar">
      <div class="flex">
        <IconSearch />
        <input
          type="text"
          placeholder="Enter @ to search movies, Enter # to search quotes"
          class="bg-transparent ml-6 w-full outline-0 text-search"
        />
      </div>

      <div class="h-[1px] bg-[#EFEFEF4D] w-full mt-4"></div>
    </form>
    <div class="flex items-center h-14 ml-4" @click="handleShow" v-if="showButton">
      <IconSearch />
      <button class="bg-[#181624] h-14 w-28 rounded-full flex items-center justify-center">
        <p class="text-search">Search by</p>
      </button>
    </div>
  </div>
</template>
<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'
import IconSearch from '../icons/IconSearch.vue'
import { ref, onMounted } from 'vue'
import AxiosInstance from '../../config/axios'

const showSearchBar = ref(false)
const showButton = ref(true)
const quotes = ref(null)

const handleShow = () => {
  showSearchBar.value = !showSearchBar.value
  showButton.value = !showButton.value
}

onMounted(() => {
  AxiosInstance.get(`/api/quotes/1}}`)
    .then((response) => {
      quotes.value = response.data.quote
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
