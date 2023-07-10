<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-full min-h-screen flex flex-col items-center justify-center bg-transparentLandingBg max-h-full overflow-auto"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto sm:pl-8">{{ $t('movie.add_quote') }}</h1>
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
                src="@/assets/images/default_picture.jpg"
                alt="profile"
                class="object-fit w-20 rounded-full"
              />
            </div>
            <h1>{{ user.name }}</h1>
          </div>
          <!-- ---------------------------------------- -->
          <div v-if="movie" class="w-full mb-4 sm:mb-8 mt-5 sm:mt-10">
            <div
              class="flex space-x-3 items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 w-full"
            >
              <img :src="getImages(movie.poster)" alt="" class="w-36 sm:w-80 rounded-md" />

              <div class="flex flex-col">
                <div class="flex space-x-4 mr-auto mb-4 sm:mb-10 mt-2 sm:mt-4 text-[#DDCCAA]">
                  <div class="flex space-x-2">
                    <h1 class="uppercase text-sm lg:text-lg">
                      {{ $i18n.locale === 'en' ? movie.title.en : movie.title.ka }}
                    </h1>
                    <p class="text-sm lg:text-lg">({{ movie.release_date }})</p>
                  </div>
                </div>
                <div class="flex flex-wrap">
                  <div
                    v-for="genre in movie.genres"
                    :key="genre.id"
                    class="text-white bg-genre py-1 px-3 rounded text-sm cursor-pointer m-2"
                  >
                    {{
                      $i18n.locale === 'en' ? JSON.parse(genre.name).en : JSON.parse(genre.name).ka
                    }}
                  </div>
                </div>
                <div class="flex space-x-4 mt-2 sm:mt-6">
                  <p class="text-gray-400 text-sm lg:text-lg">{{ $t('movie.director') }}</p>
                  <p class="text-white text-sm lg:text-lg">{{ JSON.parse(movie.director).en }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else></div>

          <!-- ----------------------------------------- -->
          <Form class="flex flex-col w-full mt-4 sm:mt-6" enctype="multipart/form-data">
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
              rules="required|georgian"
            >
            </Field>
            <ErrorMessage name="quote_ka" class="text-red-600" />

            <label
              class="hidden sm:block border border-gray-500 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-4 py-5 rounded-md"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
            >
              <IconPhoto class="inline-block" />

              <span class="text-sm ml-2 lg:text-md">{{ $t('movie.upload_photo') }}</span>
              <span
                class="inline-block bg-[#9747FF] px-2 py-1 rounded items-center outline-0 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
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

            <label
              class="block sm:hidden border border-gray-500 bg-transparent w-full sm:w-form mt-4 sm:mt-6 px-4 py-3 rounded-md"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
            >
              <IconPhoto class="inline-block" />

              <span class="text-sm ml-2 lg:text-md">{{ $t('movie.upload_photo') }}</span>
              <span
                class="inline-block bg-[#9747FF] px-2 py-1 rounded items-center outline-0 ml-2 sm:ml-4 justify-center text-md cursor-pointer"
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

            <button
              class="bg-red-600 py-2 rounded flex items-center outline-0 mt-4 sm:mt-6 sm:py-3 justify-center text-lg"
              @click="addQuote"
            >
              {{ $t('movie.add_quote') }}
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
import IconClose from '@/components/icons/IconClose.vue'
import { ref, onMounted,  reactive } from 'vue'
import AxiosInstance from '@/config/axios/index'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'
import { useQuoteStore } from '@/stores/quotes.js'
import { useAuthUser } from '@/stores/user'

const authUserStore = useAuthUser()
const quoteStore = useQuoteStore()
const router = useRouter()
const movie = ref(null)

const quote_en = ref('')
const quote_ka = ref('')
const user = ref(null)
const modalRef = ref(null)

onClickOutside(
  modalRef,
  () => {
    router.back()
  },
  { passive: true }
)

const addQuote = (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('thumbnail', state.files[0])
  formData.append('user_id', user.value.id)
  formData.append('body_en', quote_en.value)
  formData.append('body_ka', quote_ka.value)
  formData.append('movie_id', movie.value.id)

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/add-quotes`, formData)
    .then((res) => {
      quoteStore.addQuote(res.data.quote)
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
      movie.value = response.data.data
      user.value = response.data.data.user
    })
    .catch((error) => {
      console.error(error)
    })
})

const fileInput = ref(null)
const state = reactive({
  files: [],
  isDragging: false
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

onMounted(async () => {
  await authUserStore.setAuthUser()
  user.value = authUserStore.authUser
})
</script>
