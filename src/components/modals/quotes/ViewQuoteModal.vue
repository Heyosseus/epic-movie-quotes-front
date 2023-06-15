<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto sm:pl-8">View Quote</h1>
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
            enctype="multipart/form-data"
            v-if="view_quotes"
          >
            <div
              class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
            >
              <Field
                type="text"
                name="quote_en"
                class="outline-0 bg-transparent w-fit sm:w-full px-2 p-1 rounded-md text-lg"
                v-model="quote_en"
                :placeholder="view_quotes.body_en"
              />
            </div>

            <div
              class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
            >
              <Field
                type="text"
                name="quote_ka"
                class="outline-0 bg-transparent w-full sm:w-full px-2 p-1 rounded-md text-lg"
                v-model="quote_ka"
              />
            </div>

            <div v-if="view_quotes">
              <img
                :src="getImages(view_quotes.thumbnail)"
                alt=""
                class="w-full object-contain h-96 rounded-md"
              />
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
import { useRouter, useRoute } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const route = useRoute()
const view_quotes = ref(null)

const user = ref(null)
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.back()
})

onMounted(() => {
  AxiosInstance.get(`/api/quotes/${route.params.id}`)
    .then((response) => {
      view_quotes.value = response.data.quote
      console.log(view_quotes.value, 'sssssssssssss')
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
