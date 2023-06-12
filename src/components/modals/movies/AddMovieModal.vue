<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto">Add Movie</h1>
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-4 sm:mt-6"></div>
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
          <Form class="flex flex-col mt-4 sm:mt-6" @submit="addMovie" enctype="multipart/form-data">
            <Field
              name="title_en"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="Movie name"
              v-model="title_en"
              rules="required"
            >
            </Field>
            <ErrorMessage name="title_en" class="text-red-600 mt-2" />
            <Field
              name="title_ka"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="ფილმის სახელი"
              v-model="title_ka"
              rules="required"
            >
            </Field>
            <ErrorMessage name="title_ka" class="text-red-600 mt-2" />

            <!-- <Field
              name="genre"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="ჟანრი"
              v-model="genre"
              rules="required"
            >
            </Field>
            <ErrorMessage name="genre" class="text-red-600 mt-2" /> -->

            <div
              class="flex w-full space-x-6 mt-4 border border-gray-500 bg-transparent sm:w-form sm:mt-6 px-2 py-3 rounded-md"
            >
              <select
                name="genres"
                id=""
                class="bg-transparent py-2 sm:w-32 outline-0 text-white bg-genre px-3 rounded"
                v-model="selectedGenre"
                @change="selectedGenreData"
              >
                <option v-for="genre in genres" :key="genre.id" class="py-2 mt-2 bg-slate-900">
                  {{ genre.name.en }}
                </option>
              </select>
              <div
                v-for="item in selected"
                :key="item.id"
                class="text-white bg-genre px-3 rounded items-center flex"
              >
                {{ item.value }}
              </div>
            </div>
            <Field
              type="number"
              name="date"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="წელი/Year"
              v-model="release_date"
              rules="required|min_value:1860|max_value:2099"
              step="10"
            >
            </Field>
            <ErrorMessage name="date" class="text-red-600 mt-2" />
            <Field
              type="text"
              name="director_en"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="Director"
              v-model="director_en"
              rules="required"
            >
            </Field>
            <ErrorMessage name="director_en" class="text-red-600 mt-2" />
            <Field
              type="text"
              name="director_ka"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="რეჟისორი"
              v-model="director_ka"
              rules="required"
            >
            </Field>
            <ErrorMessage name="director_ka" class="text-red-600 mt-2" />
            <Field
              as="textarea"
              type="text"
              name="description_en"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 h-20 p-2 rounded-md placeholder-top"
              placeholder="Movie description"
              v-model="description_en"
              rules="required"
            >
            </Field>
            <ErrorMessage name="description_en" class="text-red-600 mt-2" />
            <Field
              as="textarea"
              type="text"
              name="description_ka"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 h-20 py-2 rounded-md"
              placeholder="ფილმის აღწერა"
              v-model="description_ka"
              rules="required"
            >
            </Field>
            <ErrorMessage name="description_ka" class="text-red-600 mt-2" />
            <label
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 h-28 py-2 rounded-md"
            >
              <IconPhoto class="inline-block" />
              <span class="ml-2 text-sm lg:text-lg">Drag & drop your image here or</span>
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
                rules="required"
              >
              </Field>
              <ErrorMessage name="image" class="text-red-600 mt-2" />
            </label>

            <button
              class="bg-red-600 py-3 rounded flex items-center outline-0 mt-4 sm:mt-6 justify-center text-lg"
              type="submit"
            >
              Add movie
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
import { onMounted, ref } from 'vue'
import AxiosInstance from '../../../config/axios'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const user = ref(null)
const router = useRouter()
const title_en = ref('')
const title_ka = ref('')
const director_en = ref('')
const director_ka = ref('')
const description_en = ref('')
const description_ka = ref('')
// const genre = ref('')
const release_date = ref('')
const image = ref(null)

const genres = ref(null)
const selectedGenre = ref(null)
const selected = ref([])
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.back()
})

const selectedGenreData = () => {
  console.log(selectedGenre.value)
  if (selectedGenre.value) {
    selected.value.push({ id: Date.now(), value: selectedGenre.value })
  }
}

const addMovie = () => {
  const formData = new FormData()
  formData.append('poster', image.value)
  formData.append('title_en', title_en.value)
  formData.append('title_ka', title_ka.value)
  formData.append('director_en', director_en.value)
  formData.append('director_ka', director_ka.value)
  formData.append('description_en', description_en.value)
  formData.append('description_ka', description_ka.value)
  formData.append('genre', JSON.stringify(selected.value))
  formData.append('release_date', release_date.value)

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/add-movies`, formData)
    .then((res) => {
      console.log(res)
      router.push({ name: 'movie-list' })
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

onMounted(async () => {
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  const res = await axios.get(`${backendUrl}/api/genres`)
  genres.value = res.data.genres
  console.log(genres.value)
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
