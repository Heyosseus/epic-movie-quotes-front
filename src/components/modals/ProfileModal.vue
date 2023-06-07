<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex">
        <BaseSidebar />
        <div class="py-12 px-20 w-profile flex flex-col">
          <p class="text-xl">My profile</p>
          <div class="relative"></div>
          <div class="bg-movie w-[800px] px-36 py-20 flex flex-col mt-20 ml-auto">
            <div v-if="user" class="absolute top-40">
              <img
                :src="getImages(user.profile_picture)"
                alt=""
                v-if="user.profile_picture"
                class="object-contain w-40 ml-44 rounded-full"
              />
              <div v-else>
                <img
                  src="@/assets/images/profile.jpg"
                  alt=""
                  class="object-contain w-40 ml-44 rounded-full"
                />
              </div>
            </div>

            <Form class="flex flex-col mt-6" @submit="addMovie" enctype="multipart/form-data">
              <label for="fileInput" class="relative py-2 text-white rounded cursor-pointer">
                <span class="flex justify-center mt-4">Upload new photo</span>
                <Field
                  name="fileInput"
                  id="fileInput"
                  type="file"
                  class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  v-model="picture"
                />
              </label>
              <label for="username">Username</label>
              <div class="flex space-x-3">
                <Field
                  type="text"
                  name="username"
                  class="py-3 px-2 rounded mt-2 outline-0 w-full text-black font-normal bg-field placeholder-gray-700"
                  :placeholder="placeholderName"
                >
                </Field>
                <button class="" @click="editUsername = true">Edit</button>
              </div>
              <div v-if="editUsername" class="flex flex-col">
                <label for="new_username" class="mt-6">New username</label>
                <Field
                  type="text"
                  name="new_username"
                  class="py-3 px-2 rounded mt-2 outline-0 w-[466px] text-black font-normal bg-field placeholder-gray-400"
                  placeholder="New username"
                  v-model="new_username"
                  rules="required"
                >
                </Field>
                <ErrorMessage name="new_username" class="text-red-600" />
              </div>

              <label for="profile_email" class="mt-6">Email</label>
              <div class="flex space-x-3">
                <Field
                  type="email"
                  name="profile_email"
                  class="py-3 px-2 rounded mt-2 outline-0 w-full text-black font-normal bg-field placeholder-gray-700"
                  :placeholder="placeholderEmail"
                >
                </Field>
                <button @click="editEmail = true">Edit</button>
              </div>
              <div v-if="editEmail" class="flex flex-col">
                <label for="new_email" class="mt-6">New email</label>
                <Field
                  type="text"
                  name="new_email"
                  class="py-3 px-2 rounded mt-2 outline-0 w-[466px] text-black font-normal bg-field placeholder-gray-400"
                  placeholder="New email"
                  v-model="new_email"
                  rules="required"
                >
                </Field>
                <ErrorMessage name="new_email" class="text-red-600" />
              </div>

              <label for="profile_password" class="mt-6">Password</label>
              <div class="flex space-x-3">
                <Field
                  type="password"
                  name="profile_password"
                  class="py-3 px-2 rounded mt-2 outline-0 w-[466px] text-black font-normal bg-field"
                >
                </Field>
              </div>

              <ErrorMessage name="quote_ka" class="text-red-600" />
            </Form>
          </div>
          <div class="space-x-4 ml-auto mt-10">
            <router-link to="/news-feed" class="bg-transparent">Cancel</router-link>

            <button class="bg-red-700 py-3 px-4 rounded" @click="updateProfile">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AxiosInstance from '@/config/axios/index'

const user = ref(null)
const editUsername = ref(false)
const placeholderName = ref(null)
const placeholderEmail = ref(null)
const editEmail = ref(false)
const router = useRouter()
const picture = ref(null)

const new_username = ref(null)
const new_email = ref(null)
const profile_password = ref(null)

const getImages = (poster) => {
  const backendStorageURL = import.meta.env.VITE_PUBLIC_BACKEND_STORAGE_URL
  return `${backendStorageURL}/${poster}`
}
const updateProfile = () => {
  const formData = new FormData()
  formData.append('profile_picture', picture.value)
  formData.append('name', new_username.value)
  formData.append('email', new_email.value)
  formData.append('password', profile_password.value)
  // const backendUrl = import.meta.env.BACKEND_URL
  axios
    .post(`http://localhost:8000/api/profile`, formData)
    .then((res) => {
      console.log(res.data)
      router.push({ name: 'news-feed' })
    })
    .catch((err) => {
      console.log(err.response)
    })
}

onMounted(() => {
  AxiosInstance.get('/api/user')
    .then((res) => {
      user.value = res.data
      placeholderName.value = res.data.name
      placeholderEmail.value = res.data.email
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.response)
    })
})
</script>
<style>
.custom-file-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: none;
  background: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}
</style>
