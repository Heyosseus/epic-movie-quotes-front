<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto sm:pl-8">Edit Quote</h1>
            <IconClose @click="router.back()" />
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
            @submit="editQuote"
            enctype="multipart/form-data"
          >
            <Field
              as="textarea"
              type="text"
              name="quote_en"
              class="border border-gray-500 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 h-20 p-2 rounded-md text-lg"
              placeholder='"Quote in English."'
              v-model="quote_en"
              rules="required"
            >
            </Field>
            <ErrorMessage name="quote_en" class="text-red-600" />

            <Field
              as="textarea"
              type="text"
              name="quote_ka"
              class="border border-gray-500 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 h-20 py-2 rounded-md text-lg"
              placeholder='"ციტატა ქართულ ენაზე."'
              v-model="quote_ka"
              rules="required"
            >
            </Field>
            <ErrorMessage name="quote_ka" class="text-red-600" />
            <div v-if="quotes" class="relative w-full">
              <div class="relative">
                <img
                  :src="getImages(quotes.thumbnail)"
                  alt=""
                  class="w-full object-contain h-96 rounded-md z-1 mt-8"
                />
                <label
                  for="fileInput"
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rounded cursor-pointer"
                >
                  <span
                    class="flex flex-col items-center justify-center text-md lg:text-md lg:mt-4 bg-transparentLandingBg rounded-xl px-4 py-6"
                  >
                    <IconPhotoVue />
                    <p class="mt-2">Change photo</p>
                  </span>
                  <Field
                    name="fileInput"
                    id="fileInput"
                    type="file"
                    class="w-full absolute top-0 left-0 lg:w-full h-full opacity-0 cursor-pointer"
                    v-model="image"
                  />
                </label>
              </div>
            </div>

            <button
              class="bg-red-600 py-2 rounded flex items-center outline-0 mt-4 sm:mt-6 sm:py-3 justify-center text-lg"
              type="submit"
            >
              Save changes
            </button>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'
import IconPhotoVue from '@/components/icons/IconPhoto.vue'
import IconClose from '@/components/icons/IconClose.vue'

const router = useRouter()
const route = useRoute()
const quotes = ref(null)
const quoteId = route.params.id
const movieId = route.params.movie_id
const quote_en = ref('')
const quote_ka = ref('')
const image = ref(null)
const user = ref(null)
const modalRef = ref(null)
const movie = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'movie-list' })
})
const editQuote = () => {
  const formData = new FormData()
  formData.append('thumbnail', image.value)
  formData.append('body_en', quote_en.value)
  formData.append('body_ka', quote_ka.value)
  formData.append('movie_id', parseInt(movieId))
  console.log(movieId)

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/update-quotes/${quoteId}`, formData)
    .then((res) => {
      console.log(res)
      router.back()
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

onMounted(() => {
  AxiosInstance.get(`/api/show-quotes/${quoteId}`)
    .then((response) => {
      quotes.value = response.data.quote
      console.log(quotes.value)
    })
    .catch((error) => {
      console.error(error)
    })
})
onMounted(() => {
  AxiosInstance.get(`/api/movies/1`)
    .then((res) => {
      movie.value = res.data.movie
    })
    .catch((err) => {
      console.log(err.response)
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
