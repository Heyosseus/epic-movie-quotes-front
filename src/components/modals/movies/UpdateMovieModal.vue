<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="fixed inset-0 w-screen min-h-full flex flex-col items-center justify-center bg-transparentLandingBg overflow-auto"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8 max-h-full" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto">{{ $t('movie.edit_movie') }}</h1>
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

          <Form @submit="editMovie" enctype="multipart/form-data">
            <div v-if="movies" class="flex flex-col w-full mt-2 sm:mt-4">
              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Movie name:</label>
                <Field
                  name="title_en"
                  class="outline-0 bg-transparent w-40 lg:w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  v-model="title_en"
                  rules="english"
                />
              </div>
              <ErrorMessage name="title_en" class="text-red-500 text-sm" />

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">ფილმის სახელი:</label>
                <Field
                  name="title_ka"
                  class="outline-0 bg-transparent w-40 lg:w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  v-model="title_ka"
                  rules="georgian"
                />
              </div>
              <ErrorMessage name="title_ka" class="text-red-500 text-sm" />

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-10 lg:w-[164px]">{{
                  $t('movie.genres')
                }}</label>
                <div
                  v-for="genre in movies.genres"
                  :key="genre.id"
                  class="text-white bg-genre py-1 px-3 rounded text-sm cursor-pointer"
                  @click="removeGenre(genre)"
                >
                  {{
                    $i18n.locale === 'en' ? JSON.parse(genre.name).en : JSON.parse(genre.name).ka
                  }}
                </div>
                <select
                  name="genres"
                  id=""
                  class="bg-transparent py-2 outline-0 text-white bg-genre lg:px-3 rounded"
                  v-model="selectedGenre"
                  @change="selectedGenreData"
                >
                  <option
                    v-for="genre in genres"
                    :key="genre.id"
                    :value="genre.id"
                    class="py-2 mt-2 bg-slate-900"
                  >
                    {{
                      $i18n.locale === 'en' ? JSON.parse(genre.name).en : JSON.parse(genre.name).ka
                    }}
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
                  class="outline-0 bg-transparent w-40 lg:w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  v-model="release_date"
                />
              </div>
              <ErrorMessage name="release_date" class="text-red-500 text-sm" />

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Director:</label>
                <Field
                  type="text"
                  name="director_en"
                  class="outline-0 bg-transparent w-40 lg:w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  v-model="director_en"
                  rules="english"
                />
              </div>
              <ErrorMessage name="director_en" class="text-red-500 text-sm" />

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">რეჟისორი:</label>
                <Field
                  type="text"
                  name="director_ka"
                  class="outline-0 bg-transparent w-40 lg:w-fit sm:w-full px-2 p-1 rounded-md text-lg placeholder-white"
                  v-model="director_ka"
                  rules="georgian"
                />
              </div>
              <ErrorMessage name="director_ka" class="text-red-500 text-sm" />

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 h-20 sm:mt-6 px-2 p-2 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">Description:</label>
                <Field
                  as="textarea"
                  type="text"
                  name="description_en"
                  class="outline-0 bg-transparent w-40 lg:w-fit sm:w-full resize-none px-2 mt-6 rounded-md text-lg placeholder-white"
                  v-model="description_en"
                  rules="english"
                />
              </div>
              <ErrorMessage name="description_en" class="text-red-500 text-sm" />

              <div
                class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 h-20 sm:mt-6 px-2 p-2 rounded-md text-lg"
              >
                <label for="" class="text-gray-400 text-sm w-40">ფილმის აღწერა:</label>
                <Field
                  as="textarea"
                  type="text"
                  name="description_ka"
                  class="outline-0 text-white bg-transparent w-40 lg:w-fit sm:w-full resize-none px-2 mt-6 rounded-md text-lg placeholder-white"
                  v-model="description_ka"
                  rules="georgian"
                />
              </div>
              <ErrorMessage name="description_ka" class="text-red-500 text-sm" />

              <div v-if="movies" class="flex mt-4">
                <img
                  :src="getImages(movies.poster)"
                  alt=""
                  class="w-32 lg:w-80 object-contain h-40 lg:h-52 rounded-md"
                />
                <label
                  class="bg-transparent w-full text-center sm:w-form mt-4 sm:mt-6 px-2 h-28 py-2 rounded-md"
                  @dragover="dragover"
                  @dragleave="dragleave"
                  @drop="drop"
                >
                  <p class="uppercase text-primary mb-6">{{ $t('movie.replace_photo') }}</p>
                  <IconPhoto class="inline-block" />
                  <span class="ml-2 text-sm lg:text-md">{{ $t('movie.drag_and_drop') }}</span>
                  <span
                    class="inline-block bg-[#9747FF] px-2 py-3 rounded items-center outline-0 mt-4 sm:mt-6 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
                  >
                    {{ $t('movie.choose_file') }}
                  </span>
                  <input
                    type="file"
                    multiple
                    name="image"
                    id="fileInput"
                    class="hidden"
                    @change="onChange"
                    ref="fileInput"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              <button
                class="bg-red-600 py-2 rounded flex items-center outline-0 mt-4 sm:mt-6 sm:py-3 justify-center text-lg"
                type="submit"
              >
                {{ $t('profile.save') }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref, onMounted, reactive } from 'vue'
import AxiosInstance from '@/config/axios/index'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { getImages } from '@/utils/getImages'
import { onClickOutside } from '@vueuse/core'
import IconClose from '@/components/icons/IconClose.vue'

import IconPhoto from '@/components/icons/IconPhoto.vue'
import { useAuthUser } from '@/stores/user'

const authUserStore = useAuthUser()
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
const release_date = ref()
const image = ref(null)
const genres = ref([])
const user = ref(null)
const modalRef = ref(null)
const selectedGenre = ref(null)

const fileInput = ref(null)
const state = reactive({
  files: [],
  isDragging: false
})
onClickOutside(modalRef, () => {
  router.back()
})

const editMovie = () => {
  const formData = new FormData()
  formData.append('poster', state.files[0])
  formData.append('genre', selectedGenre.value)
  formData.append('release_date', release_date.value)
  formData.append('director_en', director_en.value)
  formData.append('director_ka', director_ka.value)
  formData.append('description_en', description_en.value)
  formData.append('description_ka', description_ka.value)
  formData.append('title_en', title_en.value)
  formData.append('title_ka', title_ka.value)
  formData.append('user_id', user.value.id)

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios.post(`${backendUrl}/api/update-movies/${movieId}`, formData).then((res) => {
    console.log(res)
    router.back()
  })
}

onMounted(() => {
  AxiosInstance.get(`/api/movies/${movieId}`).then((response) => {
    movies.value = response.data.data
    title_en.value = movies.value.title.en
    title_ka.value = movies.value.title.ka
    director_en.value = JSON.parse(movies.value.director).en
    director_ka.value = JSON.parse(movies.value.director).ka
    description_en.value = JSON.parse(movies.value.description).en
    description_ka.value = JSON.parse(movies.value.description).ka
    release_date.value = movies.value.release_date
    image.value = movies.value.poster
    console.log(movies.value)
  })
})

onMounted(async () => {
  await authUserStore.setAuthUser()
  user.value = authUserStore.authUser
})

const removeGenre = (genre) => {
  movies.value.genres = movies.value.genres.filter((item) => item.id !== genre.id)
}

onMounted(async () => {
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  const res = await axios.get(`${backendUrl}/api/genres`)
  genres.value = res.data.genres
})

const onChange = () => {
  state.files.push(...fileInput.value.files)
}

const dragover = (e) => {
  e.preventDefault()
  state.isDragging = true
}

const dragleave = (e) => {
  e.preventDefault()
  state.isDragging = false
}

const drop = (e) => {
  e.preventDefault()
  if (e.dataTransfer.files) {
    state.files = Array.from(e.dataTransfer.files)
    onChange()
    console.log(state.files)
  }
  state.isDragging = false
}
</script>
