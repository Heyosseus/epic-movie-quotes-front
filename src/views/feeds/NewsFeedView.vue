<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/4">
          <BaseSidebar />
        </div>
        <div>
          <SearchBar
            :condition="condition"
            :searchQuery="searchQuery"
            :searchResults="searchResults"
            @update:searchQuery="searchQuery = $event"
            @update-newsfeed="updateSearchResults"
          />
          <div v-if="true">
            <div
              v-for="quote in filteredQuotes"
              :key="quote.id"
              class="flex flex-col bg-movie px-6 py-4 rounded-lg mt-4 lg:mt-10 mb-20"
            >
              <router-link
                :to="{ name: 'profile' }"
                v-if="quote.user"
                class="flex items-center mt-2 lg:mt-6 space-x-4"
              >
                <div v-if="quote.user.profile_picture">
                  <img
                    :src="getImages(quote.user.profile_picture)"
                    alt=""
                    class="object-fit w-10 lg:w-14 rounded-full"
                  />
                </div>
                <div v-else>
                  <img
                    src="@/assets/images/default_picture.jpg"
                    alt="profile"
                    class="object-fit w-10 lg:w-14 rounded-full"
                  />
                </div>
                <h1>{{ quote.user.name }}</h1>
              </router-link>
              <news-feed-quote-data
                :quotes="quotes"
                :quote="quote"
                :add_likes="addLikes"
                :add_comment="addComment"
                :comment="comment"
                @update:comment="comment = $event"
              ></news-feed-quote-data>
            </div>
          </div>
          <div
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="flex flex-col bg-movie px-6 py-4 rounded-lg mt-4 lg:mt-10 mb-20"
          >
            <div class="flex flex-col space-y-4 w-fit text-xl my-6">
              <div class="flex flex-col lg:flex lg:flex-row relative">
                <img
                  :src="getImages(movie.poster)"
                  alt=""
                  class="rounded-2xl object-fit h-64 lg:w-96 mr-auto cursor-pointer"
                  @click="redirectToMovie(movie.id)"
                />
                <div class="ml-10">
                  <div class="flex space-x-2 mt-4 lg:mt-0">
                    <h1 class="uppercase">
                      {{ $i18n.locale === 'en' ? movie.title.en : movie.title.ka }}
                    </h1>
                    <p class="">({{ movie.release_date }})</p>
                  </div>
                  <p class="hidden lg:block mr-auto mt-8 text-sm">
                    <span class="text-gray-400">{{ $t('movie.description') }}</span>
                    {{
                      $i18n.locale === 'en'
                        ? JSON.parse(movie.description).en
                        : JSON.parse(movie.description).ka
                    }}
                  </p>
                  <div
                    @click="redirectToMovie(movie.id)"
                    class="absolute flex items-center w-full lg:w-80 lg:bottom-0 text-sm cursor-pointer"
                  >
                    {{ $t('movie.click_here_to_see') }} <IconEye class="ml-2 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <router-view />
</template>
<script setup>
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'

import SearchBar from '@/components/layout/SearchBar.vue'
import instantiatePusher from '@/config/helpers/instantiatePusher'
import { ref, onMounted, computed, watch } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'
import NewsFeedQuoteData from '@/components/quote/NewsFeedQuoteData.vue'
import axiosInstance from '../../config/axios'
import { useRouter } from 'vue-router'

import IconEye from '../../components/icons/IconEye.vue'
// import { useSearchStore } from '@/stores/search'

const quotes = ref(null)
const quoteId = ref(null)
const comment = ref('')
const commentList = ref([])
const movies = ref(null)
const router = useRouter()
// const searchStore = useSearchStore()

onMounted(() => {
  instantiatePusher()
  window.Echo.channel('notification').listen('CommentNotification', (data) => {
    const newComment = data.comment
    const quoteToUpdate = quotes.value.find((quote) => quote.id === newComment.quote_id)
    if (quoteToUpdate) {
      quoteToUpdate.comments.push(newComment)
    }
  })
  window.Echo.channel('like-notification').listen('LikeNotification', (data) => {
    const newLike = data.like
    const quoteToUpdate = quotes.value.find((quote) => quote.id === newLike.quote_id)
    if (quoteToUpdate) {
      quoteToUpdate.likes.push(newLike)
    }
  })
})

const addComment = (quote) => {
  quoteId.value = quote.id

  AxiosInstance.post(`/api/add-comments`, {
    quote_id: quote.id,
    user_id: quote.user.id,
    content: comment.value
  })
    .then(() => {
      comment.value = ''
      console.log('success')
    })
    .catch((error) => {
      console.error(error)
    })
  AxiosInstance.post(`/api/notifications/${quote.user.id}/comment`, {
    quote_id: quote.id
  })
}

const addLikes = (quote) => {
  AxiosInstance.post(`/api/add-likes`, {
    quote_id: quote.id,
    user_id: quote.user.id
  })
    .then(() => {
      console.log('success')
    })
    .catch((error) => {
      console.error(error)
    })
  AxiosInstance.post(`/api/notifications/${quote.user.id}/like`, {
    quote_id: quote.id
  })
}

onMounted(() => {
  AxiosInstance.get(`/api/news-feed`)
    .then((response) => {
      quotes.value = response.data.quotes
      commentList.value = response.data.quotes.map((quote) => {
        return quote.comments
      })
    })
    .catch((error) => {
      console.error(error)
    })
})

const condition = ref(null)

const searchQuery = ref('')
const searchResults = ref([])

const filteredQuotes = computed(() => {
  if (searchResults.value.length > 0) {
    const filteredIds = searchResults.value.map((result) => result.id)
    return quotes.value.filter((quote) => filteredIds.includes(quote.id))
  } else {
    return quotes.value
  }
})

const filteredMovies = computed(() => {
  if (searchResults.value.length > 0) {
    const filteredIds = searchResults.value.map((result) => result.id)
    return movies.value.filter((movie) => filteredIds.includes(movie.id))
  } else {
    return []
  }
})

watch(filteredMovies, () => {
  filteredMovies.value = []
})
const redirectToMovie = (movie_id) => {
  router.push(`/movie/${movie_id}`)
}
const updateSearchResults = (results) => {
  searchResults.value = results
}

axiosInstance.get('/api/movies').then((response) => {
  movies.value = response.data.movies
})
</script>
