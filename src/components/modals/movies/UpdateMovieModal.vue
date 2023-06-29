<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto sm:pl-8">Edit Movie</h1>
            <IconClose @click="router.back()"/>
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

          <Form @submit="editMovie" enctype="multipart/form-data">
            <div v-if="movies" class="flex flex-col w-full mt-2 sm:mt-4">
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Movie name:</label>
                <Field
                  type="text"
                  name="title_en"
                  class="outline-0 bg-transparent w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  :placeholder="movies.title.en"
                  v-model="title_en"
                />
              </div>

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">ფილმის სახელი:</label>
                <Field
                  type="text"
                  name="title_ka"
                  class="outline-0 bg-transparent w-full sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  :placeholder="movies.title.ka"
                  v-model="title_ka"
                />
              </div>
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">genre:</label>
                <div
                  v-for="genre in movies.genres"
                  :key="genre.id"
                  class="text-white bg-genre py-1 px-3 rounded text-sm cursor-pointer"
                  @click="removeGenre(genre)"
                >
                  {{ JSON.parse(genre.name).en }}
                </div>
                <select
                  name="genres"
                  id=""
                  class="bg-transparent py-2 outline-0 text-white bg-genre px-3 rounded w-40"
                  v-model="selectedGenre"
                  @change="selectedGenreData"
                >
                  <option
                    v-for="genre in genres"
                    :key="genre.id"
                    :value="genre.id"
                    class="py-2 mt-2 bg-slate-900 w-40"
                  >
                    {{ JSON.parse(genre.name).en }}
                  </option>
                </select>
                <div
                  v-for="item in selected"
                  :key="item.id"
                  class="text-white bg-genre px-3 rounded items-center flex"
                >
                  {{ getGenreName(item) }}
                </div>
              </div>
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Year/წელი:</label>
                <Field
                  type="number"
                  name="release_date"
                  class="outline-0 bg-transparent w-full sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  :placeholder="movies.release_date"
                  v-model="release_date"
                />
              </div>
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Director:</label>
                <Field
                  type="text"
                  name="director_en"
                  class="outline-0 bg-transparent w-full sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  :placeholder="JSON.parse(movies.director).en"
                  v-model="director_en"
                />
              </div>
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">რეჟისორი:</label>
                <Field
                  type="text"
                  name="director_ka"
                  class="outline-0 bg-transparent w-full sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  :placeholder="JSON.parse(movies.director).ka"
                  v-model="director_ka"
                />
              </div>
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 h-20 sm:mt-6 px-2 p-2 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Description:</label>
                <Field
                  as="textarea"
                  type="text"
                  name="description_en"
                  class="outline-0 bg-transparent w-full sm:w-full px-2 mt-6 rounded-md text-lg placeholder-white"
                  :placeholder="JSON.parse(movies.description).ka"
                  v-model="description_en"
                />
              </div>
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 h-20 sm:mt-6 px-2 p-2 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">ფილმის აღწერა:</label>
                <Field
                  as="textarea"
                  type="text"
                  name="description_ka"
                  class="outline-0 bg-transparent w-full sm:w-full px-2 mt-6 rounded-md text-lg placeholder-white"
                  :placeholder="JSON.parse(movies.description).ka"
                  v-model="description_ka"
                />
              </div>

              <div v-if="movies" class="flex mt-4">
                <img
                  :src="getImages(movies.poster)"
                  alt=""
                  class="w-full object-contain h-52 rounded-md"
                />
                <label
                  class="bg-transparent w-full text-center sm:w-form mt-4 sm:mt-6 px-2 h-28 py-2 rounded-md"
                >
                  <p class="uppercase text-primary mb-6">replace photo</p>
                  <IconPhoto class="inline-block" />
                  <span class="ml-2 text-sm lg:text-md">Drag & drop your image here or</span>
                  <span
                    class="inline-block bg-[#9747FF] px-2 py-3 rounded items-center outline-0 mt-4 sm:mt-6 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
                  >
                    Choose File
                  </span>
                  <Field
                    type="file"
                    name="image"
                    class="hidden"
                    placeholder="ფილმის აღწერა"
                    v-model="image"
                  >
                  </Field>
                </label>
              </div>

              <button
                class="bg-red-600 py-2 rounded flex items-center outline-0 mt-4 sm:mt-6 sm:py-3 justify-center text-lg"
                type="submit"
              >
                Save changes
              </button>
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
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'
import IconClose from '@/components/icons/IconClose.vue'

import IconPhoto from '@/components/icons/IconPhoto.vue'
const router = useRouter()
const route = useRoute()
const movies = ref(null)
const movieId = route.params.id

const title_en = ref('')
const title_ka = ref('')
const director_en = ref('')
const director_ka = ref('')
const description_en = ref('')
const description_ka = ref('')
const release_date = ref('')
const image = ref(null)
const genres = ref([])
const user = ref(null)
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.back()
})

const editMovie = () => {
  const formData = new FormData()
  formData.append('poster', image.value)
  formData.append('genre', genres.value)
  formData.append('release_date', release_date.value)
  formData.append('director_en', director_en.value)
  formData.append('director_ka', director_ka.value)
  formData.append('description_en', description_en.value)
  formData.append('description_ka', description_ka.value)
  formData.append('title_en', title_en.value)
  formData.append('title_ka', title_ka.value)

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/update-movies/${movieId}`, formData)
    .then((res) => {
      console.log(res)
      router.back()
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

onMounted(() => {
  AxiosInstance.get(`/api/movies/${movieId}`)
    .then((response) => {
      movies.value = response.data.movie
      genres.value = response.data.movie.genre
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

const removeGenre = (genre) => {
  movies.value.genres = movies.value.genres.filter((item) => item.id !== genre.id)
}

onMounted(async () => {
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  const res = await axios.get(`${backendUrl}/api/genres`)
  genres.value = res.data.genres
})
</script>
