<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-full overflow-y-auto">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/4">
          <BaseSidebar />
        </div>
        <div>
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
              @submit.prevent="loadQuotes"
            >
              <div class="flex bg-transparent">
                <IconSearch />
                <Field
                  name="search"
                  type="text"
                  class="bg-transparent ml-6 w-full outline-0 text-search"
                  :placeholder="$t('base.search_placeholder')"
                  v-model="searchQuery"
                />
              </div>

              <div class="h-[1px] bg-[#EFEFEF4D] w-full mt-4"></div>
            </form>
            <div
              class="hidden sm:flex items-center h-14 ml-4"
              @click="handleShow"
              v-if="showButton"
            >
              <IconSearch />
              <button class="bg-[#181624] h-14 w-28 rounded-full flex items-center justify-center">
                <p class="text-search">{{ $t('base.search_by') }}</p>
              </button>
            </div>
          </div>
          <div class="root mt-6" ref="root">
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
                    class="object-fit w-10 lg:w-16 rounded-full"
                  />
                </div>
                <div v-else>
                  <img
                    src="@/assets/images/default_picture.jpg"
                    alt="profile"
                    class="object-fit w-10 lg:w-16 rounded-full"
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
              <div ref="target"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <router-view />
</template>

<script setup>
import { Field } from 'vee-validate'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
// import SearchBar from '@/components/layout/SearchBar.vue'
import instantiatePusher from '@/config/helpers/instantiatePusher'
import { ref, onMounted, reactive, computed } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'
import NewsFeedQuoteData from '@/components/quote/NewsFeedQuoteData.vue'
import { useIntersectionObserver } from '@vueuse/core'

const quotes = ref([])
const quoteId = ref(null)
const comment = ref('')
const user = ref(null)
const likes = reactive([])
const page = ref(1)
const movies = ref([])
const condition = ref(null)
const searchQuery = ref('')
const searchResults = ref([])
const showSearchBar = ref(false)
const showButton = ref(true)

const handleShow = () => {
  showSearchBar.value = !showSearchBar.value
  showButton.value = !showButton.value
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

  loadQuotes()
})

const addComment = (quote) => {
  quoteId.value = quote.id

  AxiosInstance.post(`/api/add-comments`, {
    quote_id: quote.id,
    user_id: user.value.id,
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

const loadQuotes = () => {
  if (searchQuery.value) {
    if (searchQuery.value.startsWith('#')) {
      const quoteQuery = searchQuery.value.substring(1)
      AxiosInstance.get(`/api/quotes/?query=${quoteQuery}`).then((response) => {
        quotes.value = response.data.data
      })
    } else if (searchQuery.value.startsWith('@')) {
      const movieQuery = searchQuery.value.substring(1)
      AxiosInstance.get(`/api/movies/?query=${movieQuery}`).then((response) => {
        quotes.value = response.data.data
        console.error(quotes.value)
      })
    }
  } else {
    AxiosInstance.get('/api/quotes').then((response) => {
      quotes.value = response.data.data
      page.value += 1
    })
  }
}

AxiosInstance.get('/api/user').then((response) => {
  user.value = response.data
})
const root = ref(null)
const target = ref(null)
const isVisible = ref(false)
const perPage = 2

const isLoading = ref(false)
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    if (isIntersecting && !isLoading.value) {
      isLoading.value = true

      AxiosInstance.get(`/api/quotes?page=${page.value}&per_page=${perPage}`)
        .then((response) => {
          const newQuotes = response.data.data
          const meta = response.data.meta
          if (newQuotes.length > 0 && meta.current_page <= meta.last_page) {
            quotes.value.push(...newQuotes)
            page.value += 1
            isLoading.value = false
            console.log(response.data.meta)
          } else {
            stop()
          }
          isLoading.value = false
        })
        .catch((error) => {
          console.error(error)
          isLoading.value = false
        })
      console.log('intersecting')
    }
  },
  { root }
)
</script>
<style>
.root {
  height: 80vh;
  scroll-behavior: smooth;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.root::-webkit-scrollbar {
  width: 0.5rem;
  background-color: transparent;
}

.root::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.root::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
