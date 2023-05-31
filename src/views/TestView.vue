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
          <Form class="flex flex-col mt-6" @submit="addMovie" enctype="multipart/form-data">
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const image = ref(null)


const addMovie = () => {
  const formData = new FormData()
  formData.append('poster', image.value)
  axios
    .post('http://localhost:8000/api/add-movies', formData)
    .then((res) => {
      console.log(res)
      router.push({ name: 'movie-list' })
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}
</script>
