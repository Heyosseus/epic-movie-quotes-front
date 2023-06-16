<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center" v-if="view_quotes">
            <router-link :to="{ name: 'update-quote', params: { movie_id: movieId, id: quote_id } }"
              ><IconEdit class="cursor-pointer"
            /></router-link>
            <div class="w-[1px] bg-gray-500 h-6 ml-6"></div>
            <IconTrash class="cursor-pointer ml-5" @click="handleDeleteQuote" />
            <h1 class="text-2xl mx-auto sm:pl-8">View Quote</h1>
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
          <div v-if="user" class="flex items-center mt-6 space-x-4">
            <div v-if="user.profile_picture">
              <img
                :src="getImages(user.profile_picture)"
                alt=""
                class="object-fit w-20 rounded-full"
              />
            </div>
            <div v-else>
              <img
                src="@/assets/images/profile.jpg"
                alt="profile"
                class="object-fit w-20 rounded-full"
              />
            </div>
            <h1>{{ user.name }}</h1>
          </div>

          <Form
            class="flex flex-col w-full mt-4 sm:mt-6"
            enctype="multipart/form-data"
            v-if="view_quotes"
          >
            <div
              class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
            >
              <Field
                type="text"
                name="quote_en"
                class="outline-0 bg-transparent w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white italic"
                v-model="quote_en"
                :placeholder="JSON.parse(view_quotes.body).en"
              />
            </div>

            <div
              class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
            >
              <Field
                type="text"
                name="quote_ka"
                class="outline-0 bg-transparent w-full sm:w-full px-2 p-1 rounded-md text-lg placeholder-white italic"
                v-model="quote_ka"
                :placeholder="JSON.parse(view_quotes.body).ka"
              />
            </div>

            <div v-if="view_quotes">
              <img
                :src="getImages(image)"
                alt=""
                class="w-full object-contain h-96 rounded-md mt-8"
              />
            </div>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { useRouter, useRoute } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const router = useRouter()
const route = useRoute()
const view_quotes = ref(null)
const image = ref(null)
const user = ref(null)
const modalRef = ref(null)
const quote_id = route.params.id
const movieId = route.params.movie_id

onClickOutside(modalRef, () => {
  router.back()
})

onMounted(() => {
  AxiosInstance.get(`/api/show-quotes/${quote_id}`)
    .then((response) => {
      view_quotes.value = response.data.quote
      image.value = response.data.quote.thumbnail
      console.log(view_quotes.value)
    })
    .catch((error) => {
      console.error(error)
    })
})

onMounted(() => {
  AxiosInstance.get(`/api/user`)
    .then((res) => {
      user.value = res.data
    })
    .catch((err) => {
      console.log(err.response)
    })
})
</script>
