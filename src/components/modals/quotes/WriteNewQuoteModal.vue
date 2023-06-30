<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto sm:pl-8">{{ $t('movie.write_quote') }}</h1>
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
            @submit="AddQuote"
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

            <label
              class="flex items-center border border-gray-500 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-4 py-5 rounded-md"
            >
              <IconPhoto class="inline-block" />
              <span class="hidden sm:block text-sm ml-2 lg:text-md">{{
                $t('movie.drag_and_drop')
              }}</span>
              <span class="flex lg:hidden text-sm ml-2">{{ $t('movie.upload_photo') }}</span>
              <p
                class="inline-block bg-[#9747FF] px-2 py-1 rounded items-center outline-0 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
              >
                {{ $t('movie.upload_photo') }}
              </p>
              <Field
                type="file"
                name="thumbnai1"
                class="hidden"
                v-model="thumbnail"
                placeholder="ფილმის აღწერა"
              >
              </Field>
            </label>

            <div class="flex items-center bg-black mt-6">
              <IconChooseMovie class="ml-5" />
              <select
                class="py-6 rounded-lg bg-black outline-none text-white px-4 w-full"
                v-model="selectedMovieId"
              >
                <option disabled selected value="" class="hidden">Choose a movie</option>
                <option
                  v-for="movie in movies"
                  :key="movie.id"
                  :value="movie.id"
                  class="p-2 bg-movie text-xl py-6"
                >
                  {{ movie.title.en }}
                </option>
              </select>
            </div>

            <button
              class="bg-red-600 py-2 rounded flex items-center outline-0 mt-4 sm:mt-6 sm:py-3 justify-center text-lg"
              type="submit"
            >
              {{ $t('movie.post') }}
            </button>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'
import IconChooseMovie from '../../icons/IconChooseMovie.vue'

const router = useRouter()
const movies = ref(null)

const quote_en = ref('')
const quote_ka = ref('')
const thumbnail = ref(null)
const user = ref(null)
const modalRef = ref(null)
const selectedMovieId = ref(null)

onClickOutside(modalRef, () => {
  router.back()
})

const AddQuote = () => {
  const formData = new FormData()
  formData.append('body_en', quote_en.value)
  formData.append('body_ka', quote_ka.value)
  formData.append('thumbnail', thumbnail.value)
  formData.append('movie_id', selectedMovieId.value)
  formData.append('user_id', user.value.id)

  console.log(thumbnail.value)

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/add-quotes`, formData)
    .then((res) => {
      console.log(res)
      console.log(thumbnail.value)
      router.back()
    })
    .catch((err) => {
      console.log(err.response.data)
      console.log(thumbnail.value)
    })
}

onMounted(() => {
  AxiosInstance.get(`/api/movies`)
    .then((response) => {
      movies.value = response.data.movies
      console.log(movies.value)
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
