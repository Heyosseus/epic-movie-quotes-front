<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex">
        <BaseSidebar />
        <div class="py-12 px-20 w-profile">
          <p class="text-xl">My profile</p>
          <div class="relative"></div>
          <div class="bg-movie w-[800px] px-36 py-20 flex flex-col mt-20 ml-auto">
            <div v-if="user" class="absolute top-40">
              <img :src="user.profile_picture" alt="" v-if="user.profile_picture" />
              <div v-else>
                <img
                  src="@/assets/images/profile.jpg"
                  alt=""
                  class="object-contain w-40 ml-44 rounded-full"
                />
              </div>
            </div>
            <label for="fileInput" class="relative py-2 text-white rounded cursor-pointer">
              <span class="flex justify-center mt-4">Upload new photo</span>
              <Field
                id="fileInput"
                type="file"
                class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                v-model="profile_picture"
              />
            </label>
            <Form class="flex flex-col mt-6" @submit="addMovie" enctype="multipart/form-data">
              <label for="username">Username</label>
              <div class="flex space-x-3">
                <Field
                  type="text"
                  name="username"
                  class="py-3 px-2 rounded mt-2 outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  v-model="username"
                  rules="required"
                >
                </Field>
                <button class="" @click="editUsername = true">Edit</button>
              </div>
              <Field
                type="text"
                name="username"
                class="py-3 px-2 rounded mt-6 outline-0 text-black font-normal bg-[#CED4DA]"
                v-model="username"
                rules="required"
                v-if="editUsername"
              >
              </Field>
              <ErrorMessage name="quote_en" class="text-red-600" />

              <label for="profile_email" class="mt-6">Email</label>
              <div class="flex space-x-3">
                <Field
                  type="email"
                  name="profile_email"
                  class="py-3 px-2 rounded mt-2 outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  v-model="profile_email"
                  rules="required"
                >
                </Field>
                <button>Edit</button>
              </div>

              <ErrorMessage name="quote_ka" class="text-red-600" />

              <label for="profile_password" class="mt-6">Password</label>
              <div class="flex space-x-3">
                <Field
                  type="password"
                  name="profile_password"
                  class="py-3 px-2 rounded mt-2 outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  v-model="profile_password"
                  rules="required"
                >
                </Field>
                <button>Edit</button>
              </div>

              <ErrorMessage name="quote_ka" class="text-red-600" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'

const user = ref(null)
const editUsername = ref(false)
const editPassword = ref(false)

onMounted(() => {
  AxiosInstance.get('/api/user')
    .then((res) => {
      user.value = res.data
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
