<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="fixed inset-0 w-screen min-h-screen flex flex-col items-center justify-center bg-transparentLandingBg overflow-auto"
      >
        <div class="bg-movie px-4 sm:px-8 py-4 sm:py-8 max-h-auto" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto">{{ $t('movie.add_movie') }}</h1>
            <IconClose @click="router.back()" />
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-4 sm:mt-6"></div>
          <router-link
            :to="{ name: 'profile' }"
            v-if="user"
            class="flex items-center mt-6 space-x-4"
          >
            <div v-if="user.profile_picture">
              <img
                :src="getImages(user.profile_picture)"
                alt=""
                class="object-fit w-20 rounded-full"
              />
            </div>
            <div v-else>
              <img
                src="@/assets/images/default_picture.jpg"
                alt="profile"
                class="object-fit w-20 rounded-full"
              />
            </div>
            <h1>{{ user.name }}</h1>
          </router-link>
          <Form class="flex flex-col mt-4 sm:mt-6" enctype="multipart/form-data">
            <Field
              name="title_en"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="Movie name"
              v-model="title_en"
              rules="required|english"
            >
            </Field>
            <ErrorMessage name="title_en" class="text-red-600 mt-2" />
            <Field
              name="title_ka"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="ფილმის სახელი"
              v-model="title_ka"
              rules="required|georgian"
            >
            </Field>
            <ErrorMessage name="title_ka" class="text-red-600 mt-2" />
            <div
              class="flex w-full space-x-6 mt-4 border border-gray-500 bg-transparent sm:w-form sm:mt-6 px-2 py-3 rounded-md overflow-x-auto"
            >
              <p class="text-gray-400 mt-1">{{ $t('movie.genres') }}</p>
              <select
                name="genres"
                id=""
                class="bg-transparent py-2 outline-0 text-white bg-genre px-2 rounded"
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
              rules="required|english"
            >
            </Field>
            <ErrorMessage name="director_en" class="text-red-600 mt-2" />
            <Field
              type="text"
              name="director_ka"
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 py-3 rounded-md"
              placeholder="რეჟისორი"
              v-model="director_ka"
              rules="required|georgian"
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
              rules="required|english"
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
              rules="required|georgian"
            >
            </Field>
            <ErrorMessage name="description_ka" class="text-red-600 mt-2" />
            <label
              class="border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-2 h-28 py-2 rounded-md"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
            >
              <IconPhoto class="inline-block" />
              <span class="ml-2 text-sm lg:text-lg">{{ $t('movie.drag_and_drop') }}</span>
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
              <ErrorMessage name="image" class="text-red-600 mt-2" />
            </label>
            <button
              class="bg-red-600 py-3 rounded flex items-center outline-0 mt-4 sm:mt-6 justify-center text-lg"
              @click="addMovie"
            >
              {{ $t('movie.add_movie') }}
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
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getImages } from '@/utils/images'
import { onClickOutside } from '@vueuse/core'
import IconClose from '@/components/icons/IconClose.vue'
import { useMovieStore } from '@/stores/movie.js'
import { useAuthUser } from '@/stores/user'
import { image } from '@vee-validate/rules'

const authUserStore = useAuthUser()
const movieStore = useMovieStore()

const user = ref(null)
const router = useRouter()
const title_en = ref('')
const title_ka = ref('')
const director_en = ref('')
const director_ka = ref('')
const description_en = ref('')
const description_ka = ref('')
const release_date = ref('')

const genres = ref(null)
const genres_id = ref([])
const selectedGenre = ref(null)
const selected = ref([])
const modalRef = ref(null)

const fileInput = ref(null)
const state = reactive({
  files: [],
  isDragging: false
})

onClickOutside(modalRef, () => {
  router.back()
})

const getGenreName = (genreId) => {
  const foundGenre = genres.value.find((genre) => genre.id === genreId)
  if (foundGenre) {
    return JSON.parse(foundGenre.name).en
  }
  return ''
}

const selectedGenreData = () => {
  if (selectedGenre.value && !selected.value.includes(selectedGenre.value)) {
    selected.value.push(selectedGenre.value)
  }
}

const addMovie = (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('poster', state.files[0] || image.value)
  formData.append('title_en', title_en.value)
  formData.append('title_ka', title_ka.value)
  formData.append('director_en', director_en.value)
  formData.append('director_ka', director_ka.value)
  formData.append('description_en', description_en.value)
  formData.append('description_ka', description_ka.value)
  formData.append('genre', JSON.stringify(selected.value))
  formData.append('release_date', release_date.value)
  formData.append('user_id', user.value.id)

  console.log(formData)
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios.post(`${backendUrl}/api/add-movies`, formData).then((res) => {
    console.log(res)
    movieStore.addMovie(res.data.data)
    router.push({ name: 'movie-list' })
  })
}

onMounted(async () => {
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  const res = await axios.get(`${backendUrl}/api/genres`)
  genres.value = res.data.genres
  genres_id.value = res.data.genres.map((genre) => genre.id)
})

onMounted(async () => {
  await authUserStore.setAuthUser()
  user.value = authUserStore.authUser
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
  }
  state.isDragging = false
}
</script>
