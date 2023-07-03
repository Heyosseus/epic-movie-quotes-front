<template>
  <div class="flex mx-auto w-full mt-4 ml-0 sm:flex lg:mt-10 justify-between lg:w-[921px]">
    <div
      class="w-full sm:bg-transparent flex lg:flex lg:bg-headerBg py-3 px-6 space-x-4 h-14 items-center lg:w-full"
    >
      <IconPencil />
      <router-link :to="{ name: 'write-quote' }" class="text-search">{{
        $t('base.write_quote')
      }}</router-link>
    </div>
    <form
      action=""
      class="h-16 ml-10 mt-3 w-[1840px]"
      v-if="showSearchBar"
      @submit.prevent="search"
    >
      <div class="flex bg-transparent">
        <IconSearch />
        <Field
          name="search"
          type="text"
          class="bg-transparent ml-6 w-full outline-0 text-search"
          :placeholder="$t('base.search_placeholder')"
          @input="$emit('update:searchQuery', $event.target.value)"
          :value="props.searchQuery"
        />
      </div>

      <div class="h-[1px] bg-[#EFEFEF4D] w-full mt-4"></div>
    </form>
    <div class="hidden sm:flex items-center h-14 ml-4" @click="handleShow" v-if="showButton">
      <IconSearch />
      <button class="bg-[#181624] h-14 w-28 rounded-full flex items-center justify-center">
        <p class="text-search">{{ $t('base.search_by') }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconSearch from '../icons/IconSearch.vue'
import { defineProps, ref, watch } from 'vue'
import AxiosInstance from '@/config/axios/index.js'
import { useSearchStore } from '@/stores/search'

const emit = defineEmits(['update-newsfeed'])

const props = defineProps({
  condition: {
    type: Boolean,
    default: false
  },
  searchQuery: {
    type: String,
    default: ''
  },
  searchResults: {
    type: Array,
    default: Array
  }
})
const showSearchBar = ref(false)
const showButton = ref(true)
const condition = ref(null)
const searchStore = useSearchStore()

const handleShow = () => {
  showSearchBar.value = !showSearchBar.value
  showButton.value = !showButton.value
}

const searchResults = ref(props.searchResults)

const search = () => {
  condition.value = props.searchQuery.startsWith('#')

  if (props.searchQuery.startsWith('@')) {
    searchMovies()
  } else if (props.searchQuery.startsWith('#')) {
    searchQuotes()
  }
}

const searchMovies = () => {
  const query = props.searchQuery.substring(1)
  AxiosInstance.get(`/api/search-movies/${query}`)
    .then((response) => {
      searchResults.value = response.data
      searchStore.setSearchResults(searchResults)
      emit('update-newsfeed', searchResults.value)
    })
    .catch((error) => {
      console.error(error)
    })
}

const searchQuotes = () => {
  const query = props.searchQuery.substring(1)
  AxiosInstance.get(`/api/search-quotes/${query}`)
    .then((response) => {
      searchResults.value = response.data
      searchStore.setSearchResults(searchResults)
      emit('update-newsfeed', searchResults.value)
    })
    .catch((error) => {
      console.error(error)
    })
}

watch(props.searchQuery, (newQuery) => {
  if (!newQuery) {
    searchStore.setSearchResults([])
  }
})
</script>
