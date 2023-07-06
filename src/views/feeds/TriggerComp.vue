<template>
  <div ref="container" @scroll="handleScroll" style="overflow-y: auto; height: 400px">
    <div v-for="quote in quotes" :key="quote.id">
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
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AxiosInstance from '@/config/axios/index'
import NewsFeedQuoteData from '@/components/quote/NewsFeedQuoteData.vue'

const quotes = ref([])
const page = ref(1)
const container = ref(null)
const totalPages = ref(null)    

const fetchQuotes = () => {
  AxiosInstance.get(`/api/news-feed?page=${page.value}`)
    .then((response) => {
      const { data, current_page, last_page } = response.data.quotes
      if (current_page === 1) {
        quotes.value = data
        console.log(quotes.value)
      } else {
        quotes.value.push(...data)
        console.log(quotes.value)
      }
      page.value = current_page + 1
      totalPages.value = last_page
    })
    .catch((error) => {
      console.error(error)
    })
}

const handleScroll = () => {
  const scrollY = container.value.scrollTop
  const height = container.value.scrollHeight - container.value.clientHeight

  if (scrollY === height) {
    fetchQuotes()
    console.log(scrollY, height)
    console.log('bottom')
  }
}

onMounted(() => {
  fetchQuotes()
  container.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  container.value.removeEventListener('scroll', handleScroll)
})
</script>
