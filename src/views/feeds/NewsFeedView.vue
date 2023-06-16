<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex">
        <BaseSidebar />
        <div class="lg:ml-60">
          <SearchBar />
          <div
            v-for="quote in quotes"
            :key="quote.id"
            class="flex flex-col bg-movie px-6 py-4 rounded-lg mt-10 mb-20"
          >
            <router-link
              :to="{ name: 'profile' }"
              v-if="quote.movie && quote.movie.user"
              class="flex items-center mt-6 space-x-4"
            >
              <div v-if="quote.movie.user.profile_picture">
                <img
                  :src="getImages(quote.movie.user.profile_picture)"
                  alt=""
                  class="object-fit w-14 rounded-full"
                />
              </div>
              <div v-else>
                <img
                  src="@/assets/images/default_picture.jpg"
                  alt="profile"
                  class="object-fit w-14 rounded-full"
                />
              </div>
              <h1>{{ quote.movie.user.name }}</h1>
            </router-link>
            <!-- ------ -->
            <div v-if="quotes">
              <div class="flex mt-6">
                <p class="italic">"{{ JSON.parse(quote.body).en }}"</p>
                <span class="ml-6 uppercase text-primary">{{ quote.movie.title.en }}</span>
                <span class="ml-1">({{ quote.movie.release_date }})</span>
              </div>
              <img
                :src="getImages(quote.thumbnail)"
                alt=""
                class="w-36 sm:w-96 rounded-md mx-auto"
              />
              <div class="flex space-x-4">
                <IconComments />

                <IconLikes />
              </div>
              <div class="h-[1px] w-full lg:w-full bg-gray-600 mt-6"></div>
              <div v-if="quote.movie && quote.movie.user">
                <div
                  v-if="quote.movie.user.profile_picture"
                  class="flex items-center mt-4 space-x-6 mb-6"
                >
                  <img
                    :src="getImages(quote.movie.user.profile_picture)"
                    alt=""
                    class="object-fit w-14 rounded-full"
                  />
                  <Form class="w-full">
                    <Field
                      name="comment"
                      class="w-full sm:bg-transparent rounded-md outline-0 flex lg:flex lg:bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
                      placeholder="write a comment"
                    >
                    </Field>
                  </Form>
                </div>
                <div v-else class="flex items-center mt-4 space-x-6 mb-6">
                  <img
                    src="@/assets/images/default_picture.jpg"
                    alt="profile"
                    class="object-fit w-14 rounded-full "
                  />
                  <Form class="w-full">
                    <Field
                      name="comment"
                      class="w-full sm:bg-transparent rounded-md outline-0 flex lg:flex lg:bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
                      placeholder="write a comment"
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

import { ref, onMounted } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'

// const router = useRouter()
const quotes = ref(null)

onMounted(() => {
  AxiosInstance.get(`/api/news-feed`)
    .then((response) => {
      quotes.value = response.data.quotes
      console.log(quotes.value)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
