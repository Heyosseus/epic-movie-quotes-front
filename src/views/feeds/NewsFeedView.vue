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
              :likes="likes"
              @update:comment="comment = $event"
            ></news-feed-quote-data>
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
import { ref, onMounted, computed, reactive } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'
import NewsFeedQuoteData from '@/components/quote/NewsFeedQuoteData.vue'

const quotes = ref(null)
const quoteId = ref(null)
const comment = ref('')
const commentList = ref([])
const movies = ref([])
const condition = ref(null)
const searchQuery = ref('')
const searchResults = ref([])
const likes = reactive([])

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
    likes.push(data.like)
  })
})

const addComment = (quote) => {
  quoteId.value = quote.id

  AxiosInstance.post(`/api/add-comments`, {
    quote_id: quote.id,
    content: comment.value
  })
    .then(() => {
      comment.value = ''
      AxiosInstance.post(`/api/notifications/${quote.user.id}/comment`, {
        quote_id: quote.id,
        user_id: quote.user.id
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

const addLikes = (quote) => {
  AxiosInstance.post(`/api/quotes/${quote.id}/like/${quote.user.id}`, {
    quote_id: quote.id,
    user_id: quote.user.id
  })
    .then(() => {
      AxiosInstance.post(`/api/notifications/${quote.user.id}/like`, {
        quote_id: quote.id,
        user_id: quote.user.id
      }).then(() => {
        quote.likes.length += 1
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

const filteredQuotes = computed(() => {
  if (searchResults.value.length > 0) {
    const filteredIds = searchResults.value.map((result) => result.id)
    return quotes.value.filter((quote) => filteredIds.includes(quote.id))
  } else if (searchResults.value.length >= 0 && condition.value === 'movie') {
    const movieQuotes = movies.value.filter((result) => result.id).map((result) => result.quotes)
    return movieQuotes
  } else {
    return quotes.value
  }
})

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

const updateSearchResults = (results) => {
  searchResults.value = results
}
</script>
