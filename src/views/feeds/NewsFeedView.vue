<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/4">
          <BaseSidebar
            :searchQuery="searchQuery"
            :searchResults="filteredQuotes"
            @updateSearchQuery="searchQuery = $event"
          />
        </div>
        <div>
          <SearchBar />
          <div
            v-for="quote in quotes"
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

            <div v-if="quotes">
              <div class="flex mt-6">
                <p class="italic">"{{ JSON.parse(quote.body).en }}"</p>
                <span class="ml-6 uppercase text-primary">{{ quote.movie.title.en }}</span>
                <span class="ml-1">({{ quote.movie.release_date }})</span>
              </div>
              <img
                :src="getImages(quote.thumbnail)"
                alt=""
                class="w-40 mt-4 sm:w-96 rounded-md mx-auto"
              />
              <div class="flex space-x-4">
                <div class="flex space-x-2" v-if="quote.comments">
                  <span>{{ quote.comments.length }}</span>
                  <IconComments />
                </div>
                <div class="flex space-x-2">
                  <span>{{ quote.likes.length ?? 0 }} </span>
                  <IconLikes @click="addLikes(quote)" />
                </div>
              </div>
              <div class="h-[1px] w-full lg:w-full bg-gray-600 mt-6"></div>

              <div v-for="comment in quote.comments" :key="comment.id">
                <div v-if="comment.quote_id === quote.id" class="py-4 flex items-center space-x-6">
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
                  </router-link>
                  <div class="w-full mt-8">
                    <p>{{ comment.content }}</p>
                    <div class="h-[1px] w-full lg:w-full bg-gray-600 mt-6"></div>
                  </div>
                </div>
              </div>

              <div v-if="quote && quote.user">
                <div
                  v-if="quote.user.profile_picture"
                  class="flex items-center mt-4 space-x-6 mb-6"
                >
                  <img
                    :src="getImages(quote.user.profile_picture)"
                    alt=""
                    class="object-fit w-10 lg:w-14 rounded-full"
                  />
                  <Form class="w-full">
                    <Field
                      name="comment"
                      class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
                      placeholder="write a comment"
                    >
                    </Field>
                  </Form>
                </div>
                <div v-else class="flex items-center mt-4 space-x-6 mb-6">
                  <img
                    src="@/assets/images/default_picture.jpg"
                    alt="profile"
                    class="object-fit w-10 rounded-full lg:w-14"
                  />
                  <Form class="w-full" @submit="addComment(quote)">
                    <Field
                      name="comment"
                      class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
                      placeholder="write a comment"
                      v-model="comment"
                    >
                    </Field>
                  </Form>
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
import { Form, Field } from 'vee-validate'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import SearchBar from '@/components/layout/SearchBar.vue'
import IconLikes from '@/components/icons/IconLikes.vue'
import IconComments from '@/components/icons/IconComments.vue'

import { ref, onMounted, computed } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'

// const router = useRouter()
const quotes = ref(null)
const quoteId = ref(null)
const comment = ref('')
const commentList = ref([])
const searchQuery = ref('')

const addComment = (quote) => {
  quoteId.value = quote.id

  AxiosInstance.post(`/api/add-comments`, {
    quote_id: quote.id,
    user_id: quote.user.id,
    content: comment.value
  })
    .then(() => {
      comment.value = ''
    })
    .catch((error) => {
      console.error(error)
    })
}

const addLikes = (quote) => {
  quoteId.value = quote.id

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
}

const filteredQuotes = computed(() => {
  if (!searchQuery.value) {
    return quotes.value
  }

  const query = searchQuery.value.toLowerCase()
  return quotes.value.filter((quote) => {
    const movieTitle = quote.movie.title.en.toLowerCase()
    const quoteBody = JSON.parse(quote.body).en.toLowerCase()
    return movieTitle.includes(query) || quoteBody.includes(query)
  })
})

onMounted(() => {
  AxiosInstance.get(`/api/news-feed`)
    .then((response) => {
      quotes.value = response.data.quotes
      commentList.value = response.data.quotes.map((quote) => {
        return quote.comments
      })
      console.log(commentList.value, 'commentList')
      console.log(quotes.value)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
