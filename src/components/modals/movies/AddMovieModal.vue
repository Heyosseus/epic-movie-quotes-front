<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie px-40 py-10">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto pl-40">Add Movie</h1>
            <IconClose class="ml-auto" />
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
          <Form class="flex flex-col mt-6" @submit="addMovie">
            <Field
              name="title_en "
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 py-3 rounded-md"
              placeholder="Movie name"
              v-model="title_en"
              rules="required"
            >
            </Field>
            <Field
              name="title_ka "
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 py-3 rounded-md"
              placeholder="ფილმის სახელი"
              v-model="title_ka"
              rules="required"
            >
            </Field>
            <Field
              name="genre"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 py-3 rounded-md"
              placeholder="ჟანრი"
              v-model="genre"
              rules="required"
            >
            </Field>
            <Field
              type="date"
              name="date"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 py-3 rounded-md"
              placeholder="წელი/Year"
              v-model="release_date"
              rules="required"
            >
            </Field>
            <Field
              type="text"
              name="director_en"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 py-3 rounded-md"
              placeholder="Director"
              v-model="director_en"
              rules="required"
            >
            </Field>
            <Field
              type="text"
              name="director_ka"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 py-3 rounded-md"
              placeholder="რეჟისორი"
              v-model="director_ka"
              rules="required"
            >
            </Field>
            <Field
              as="textarea"
              type="text"
              name="description_en"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 h-20 p-2 rounded-md placeholder-top"
              placeholder="Movie description"
              v-model="description_en"
              rules="required"
            >
            </Field>
            <Field
              as="textarea"
              type="text"
              name="description_ka"
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 h-20 py-2 rounded-md"
              placeholder="ფილმის აღწერა"
              v-model="description_ka"
              rules="required"
            >
            </Field>

            <label
              class="border border-gray-500 bg-transparent w-form mt-6 px-2 h-28 py-2 rounded-md"
            >
              <IconPhoto class="inline-block" />
              <span class="ml-2">Drag & drop your image here or</span>
              <span
                class="inline-block bg-[#9747FF] px-2 py-3 rounded items-center outline-0 mt-6 ml-4 justify-center text-md cursor-pointer"
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
              Add movie
            </button>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import IconClose from '@/components/icons/IconClose.vue'
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { ref } from 'vue'
import axiosInstance from '../../../config/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const title_en = ref('')
const title_ka = ref('')
const director_en = ref('')
const director_ka = ref('')
const description_en = ref('')
const description_ka = ref('')
const genre = ref('')
const release_date = ref('')
const image = ref(null)

// const uploadImage = () => {
//   const formData = new FormData()
//   formData.append('image', image.value)
//   console.log(image.value)
// }

const addMovie = () => {
  const data = {
    title_en: title_en.value,
    title_ka: title_ka.value,
    director_en: director_en.value,
    director_ka: director_ka.value,
    description_en: description_en.value,
    description_ka: description_ka.value,
    genre: genre.value,
    release_date: release_date.value,
    image: image.value
  }
  // const formData = new FormData()
  // formData.append('image', image.value)
  axiosInstance
    .post('/api/add-movies', data)
    .then((res) => {
      console.log(res)
      router.push({ name: 'movie-list' })
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}
</script>
