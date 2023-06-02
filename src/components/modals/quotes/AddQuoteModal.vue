<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie px-40 py-10">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto pl-40">Add Quote</h1>
            <IconClose class="ml-auto" />
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
          <h1>Rati Rukhadze</h1>
          <!-- ---------------------------------------- -->
          <div v-if="movie" class="w-full mb-8 mt-10">
            <div class="flex space-x-12 w-full">
              <img :src="getImages(movie.poster)" alt="" class="w-80 rounded-md" />
              <div>
                <div class="flex flex-col">
                  <div class="flex space-x-4 mr-auto mb-10 mt-4 text-[#DDCCAA]">
                    <div class="flex space-x-80 items-center">
                      <div class="flex space-x-2">
                        <h1 class="uppercase">{{ movie.title.en }}</h1>
                        <p class="">({{ movie.release_date }})</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-4">
                    <p class="text-gray-400">Genre:</p>
                    <p class="text-white">{{ movie.genre }}</p>
                  </div>
                  <div class="flex space-x-4 mt-6">
                    <p class="text-gray-400">Director:</p>
                    <p class="text-white">{{ movie.director }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ----------------------------------------- -->
          <Form class="flex flex-col mt-6" @submit="addMovie" enctype="multipart/form-data">
            <Field
              as="textarea"
              type="text"
              name="quote_en"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 h-20 p-2 rounded-md text-lg"
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
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 h-20 py-2 rounded-md text-lg"
              placeholder='"ციტატა ქართულ ენაზე."'
              v-model="quote_ka"
              rules="required"
            >
            </Field>
            <ErrorMessage name="quote_ka" class="text-red-600" />

            <label class="border border-gray-500 bg-transparent w-form mt-6 px-4 py-3 rounded-md">
              <IconPhoto class="inline-block" />
              <span class="ml-2">Drag & drop your image here or</span>
              <span
                class="inline-block bg-[#9747FF] px-2 py-2 rounded items-center outline-0 ml-4 justify-center text-md cursor-pointer"
              >
                Choose File
              </span>
              <Field
                type="file"
                name="image"
                class="hidden"
                placeholder="ფილმის აღწერა"
                v-model="image"
                rules="required"
              >
              </Field>
            </label>

            <button
              class="bg-red-600 py-3 rounded flex items-center outline-0 mt-6 justify-center text-lg"
              type="submit"
            >
              Add quote
            </button>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import IconClose from '@/components/icons/IconClose.vue'
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const movie = ref(null)

const quote_en = ref('')
const quote_ka = ref('')

const image = ref(null)

const addMovie = () => {
  const formData = new FormData()
  formData.append('thumbnail', image.value)

  formData.append('body_en', quote_en.value)
  formData.append('body_ka', quote_ka.value)
  formData.append('movie_id', movie.value.id)

  axios
    .post('http://localhost:8000/api/add-quotes', formData)
    .then((res) => {
      console.log(res)
      router.back()
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

onMounted(() => {
  const movieId = router.currentRoute.value.params.id
  AxiosInstance.get(`/api/movies/${movieId}`)
    .then((response) => {
      movie.value = response.data.movie
    })
    .catch((error) => {
      console.error(error)
    })
})

const getImages = (poster) => {
  return `http://localhost:8000/storage/${poster}`
}
</script>
