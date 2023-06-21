<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex flex-col items-center lg:flex lg:flex-row lg:items-start">
        <BaseSidebar />
        <div class="py-4 px-0 lg:py-12 lg:px-20 lg:w-profile flex flex-col">
          <p class="text-xl">My profile</p>
          <div class="relative"></div>
          <div
            class="w-fit px-0 py-10 lg:bg-movie lg:w-[800px] lg:px-36 lg:py-20 flex flex-col mt-20 ml-auto"
          >
            <div v-if="user" class="absolute top-40">
              <img
                :src="getImages(user.profile_picture)"
                alt=""
                v-if="user.profile_picture"
                class="object-contain w-40 lg:ml-44 rounded-full"
              />
              <div v-else>
                <img
                  src="@/assets/images/default_picture.jpg"
                  alt=""
                  class="object-contain w-40 ml-20 lg:ml-44 rounded-full"
                />
              </div>
            </div>

            <Form
              class="w-full flex flex-col mt-6"
              @submit="addMovie"
              enctype="multipart/form-data"
              v-if="user"
            >
              <label for="fileInput" class="relative py-2 text-white rounded cursor-pointer">
                <span class="flex justify-center mt-16 text-xl lg:mt-4">Upload new photo</span>
                <Field
                  name="fileInput"
                  id="fileInput"
                  type="file"
                  class="w-full absolute top-0 left-0 lg:w-full h-full opacity-0 cursor-pointer"
                  v-model="picture"
                />
              </label>
              <label for="username" class="mt-8 lg:mt-10">Username</label>
              <div class="flex space-x-3">
                <div
                  class="py-3 px-2 rounded mt-2 bg-transparent outline-0 w-full text-black font-normal placeholder-white lg:bg-field"
                >
                  <p class="text-white lg:text-black">{{ user.name }}</p>
                </div>
                <button class="" @click="editUsername = true">Edit</button>
              </div>
              <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>
              <div v-if="editUsername" class="hidden sm:flex flex-col">
                <label for="new_username" class="mt-6">New username</label>
                <Field
                  type="text"
                  name="new_username"
                  class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
                  placeholder="New username"
                  v-model="new_username"
                  rules="required"
                >
                </Field>
                <ErrorMessage name="new_username" class="text-red-600" />
              </div>

              <label for="profile_email" class="mt-6">Email</label>
              <div class="flex space-x-3">
                <div
                  class="py-3 px-2 rounded mt-2 bg-transparent outline-0 w-full text-black font-normal placeholder-white lg:bg-field"
                >
                  <p class="text-white lg:text-black">{{ user.email }}</p>
                </div>
                <button @click="editEmail = true">Edit</button>
              </div>
              <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>

              <div v-if="editEmail" class="hidden sm:flex flex-col">
                <label for="new_email" class="mt-6">New email</label>
                <Field
                  type="text"
                  name="new_email"
                  class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
                  placeholder="New email"
                  v-model="new_email"
                  rules="required"
                >
                </Field>
                <ErrorMessage name="new_email" class="text-red-600" />
              </div>

              <label S class="mt-6">Password</label>
              <div class="flex space-x-3 items-center">
                <div
                  class="py-6 px-2 rounded mt-2 bg-transparent outline-0 w-full text-black font-normal placeholder-white lg:bg-field"
                >
                  <p class="text-white lg:text-black"></p>
                </div>
                <div @click="editPassword = !editPassword" class="cursor-pointer">Edit</div>
              </div>
              <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>

              <div v-if="editPassword" class="grid">
                <div class="border border-gray-600 px-6 py-7 mt-10 w-fit lg:w-[466px]">
                  <p>Password should contain:</p>
                  <div class="flex items-center space-x-3 mt-4">
                    <div class="rounded-full w-1 h-1 bg-gray-300"></div>
                    <p class="text-gray-300 text-sm">8 or more characters</p>
                  </div>
                  <div class="flex items-center space-x-3 mt-2">
                    <div class="rounded-full w-1 h-1 bg-green-600"></div>
                    <p class="text-gray-300 text-sm">15 lowercase characters</p>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label for="new_password" class="mt-6">New password</label>
                  <div class="relative">
                    <Field
                      v-bind:type="showPassword ? 'text' : 'password'"
                      name="new_password"
                      class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
                      placeholder="New password"
                      v-model="new_password"
                      rules="required"
                    >
                    </Field>
                    <IconShowPassword
                      class="absolute right-14 top-6"
                      @click="showPassword = !showPassword"
                    />
                  </div>

                  <ErrorMessage name="new_password" class="text-red-600" />
                </div>
                <div class="flex flex-col">
                  <label for="confirm_new_password" class="mt-6">Confirm New password</label>
                  <div class="relative">
                    <Field
                      v-bind:type="showPassword ? 'text' : 'password'"
                      name="confirm_new_password"
                      class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
                      placeholder="Confirm new password"
                      v-model="confirm_new_password"
                      rules="required"
                    >
                    </Field>
                    <IconShowPassword
                      class="absolute right-14 top-6"
                      @click="showPassword = !showPassword"
                    />
                  </div>

                  <ErrorMessage name="confirm_new_password" class="text-red-600" />
                </div>
              </div>
            </Form>
          </div>
          <div class="space-x-4 ml-auto mt-10">
            <router-link to="/news-feed" class="bg-transparent">Cancel</router-link>

            <router-link
              :to="{ name: 'reset-password' }"
              class="bg-red-700 py-3 px-4 rounded"
              @click="updateProfile"
            >
              Save changes
            </router-link>
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
import IconShowPassword from '@/components/icons/IconShowPassword.vue'

const user = ref(null)
const editUsername = ref(false)
const editEmail = ref(false)
const editPassword = ref(false)
const router = useRouter()
const picture = ref(null)
const showPassword = ref(false)

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
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/profile`, formData)
    .then(() => {
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
