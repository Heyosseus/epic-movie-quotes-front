<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie px-4 sm:px-8 py-4 sm:py-8">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto sm:pl-8">Add Quote</h1>
            <IconClose class="ml-auto" />
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
          <h1>Rati Rukhadze</h1>
          <!-- ---------------------------------------- -->
          <div v-if="movie" class="w-full mb-4 sm:mb-8 mt-5 sm:mt-10">
            <div class="flex space-x-3  items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 w-full">
              <img :src="getImages(movie.poster)" alt="" class="w-36 sm:w-80 rounded-md" />
     
                <div class="flex flex-col">
                  <div class="flex space-x-4 mr-auto mb-4 sm:mb-10 mt-2 sm:mt-4 text-[#DDCCAA]">
                    <div class="flex space-x-2">
                      <h1 class="uppercase text-sm lg:text-lg">{{ movie.title.en }}</h1>
                      <p class="text-sm lg:text-lg">({{ movie.release_date }})</p>
                    </div>
                  </div>
                  <div class="flex space-x-4">
                    <p class="text-gray-400 text-sm lg:text-lg">Genre:</p>
                    <p class="text-white text-sm lg:text-lg">{{ movie.genre }}</p>
                  </div>
                  <div class="flex space-x-4 mt-2 sm:mt-6">
                    <p class="text-gray-400 text-sm lg:text-lg">Director:</p>
                    <p class="text-white text-sm lg:text-lg">{{ movie.director }}</p>
                  </div>
                </div>
         
            </div>
          </div>

          <!-- ----------------------------------------- -->
          <Form class="flex flex-col w-full mt-4 sm:mt-6" @submit="addMovie" enctype="multipart/form-data">
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
              class="hidden sm:block border border-gray-500 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-4 py-3 rounded-md"
            >
              <IconPhoto class="inline-block" />
              <span class="text-sm ml-2 lg:text-md">Drag & drop your image here or</span>
              <span
                class="inline-block bg-[#9747FF] px-2 py-1 rounded items-center outline-0 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
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
              <label
              class="block sm:hidden border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-4 py-3 rounded-md"
            >
              <IconPhoto class="inline-block" />
              <span class="text-sm ml-2 lg:text-md">Upload image</span>
              <span
                class="inline-block bg-[#9747FF] px-2 py-1 rounded items-center outline-0 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
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
              class="bg-red-600 py-2 rounded flex items-center outline-0 mt-4 sm:mt-6 sm:py-3 justify-center text-lg"
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
