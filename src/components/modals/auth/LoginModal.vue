<template>
  <div class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg">
    <div class="flex flex-col px-6 py-12 md:px-20 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4">
      <h1 class="text-xl md:text-2xl">Log in to your account</h1>
      <p class="text-sm text-gray-500">Welcome back! Please enter your details.</p>
      <Form class="flex flex-col space-y-4" @submit="login">
        <div class="flex flex-col w-full md:w-96">
          <label for="email">Email</label>
          <Field
            type="email"
            name="email"
            class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
            :class="{ 'text-red-500': errors.email }"
            placeholder="Enter your email"
            v-model="email"
            rules="required|email"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm font-normal" />
        </div>
        <div class="flex flex-col">
          <label for="password">Password</label>
          <div class="relative">
            <Field
              v-bind:type="showPassword ? 'text' : 'password'"
              name="password"
              class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-[#CED4DA]"
              placeholder="Password"
              v-model="password"
              rules="required|min:8"
            />
            <IconShowPassword class="absolute right-2 top-3" @click="showPassword = !showPassword" />
          </div>
          <ErrorMessage name="password" class="text-red-500 text-sm font-normal" />
        </div>
        <div class="flex justify-between">
          <div class="space-x-2">
            <Field type="checkbox" name="remember" />
            <label for="remember">Remember me</label>
          </div>
          <a href="/forgot-password" class="underline text-blue-600">Forgot password</a>
        </div>
        <div class="space-y-8">
          <button
            class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-6"
            type="submit"
          >
            Sign in
          </button>
          <div>
            <a
              href="http://localhost:8000/auth/google/redirect"
              class="border border-white py-3 flex w-full items-center justify-center mx-auto"
            >
              <IconGoogle class="w-6 h-6 mr-2" />
              Sign in with Google
            </a>
          </div>
          <p class="text-center mt-6">
            Already have an account?
            <a href="/register" class="underline text-blue-600" @click="openRegisterModal">Sign up</a>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useField } from 'vee-validate'
import IconGoogle from '../../icons/IconGoogle.vue'
import { ref } from 'vue'

import IconShowPassword from '../../icons/IconShowPassword.vue'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'

const router = useRouter()

const { errors } = useField()
const showPassword = ref(false)
const email = ref('')
const password = ref('')

const login = async () => {
  await AxiosInstance.get('/sanctum/csrf-cookie').then(() => {})

  await AxiosInstance.post('/api/login', {
    email: email.value,
    password: password.value
  })
    .then((res) => {
      console.log(res)
      router.push({ name: 'news-feed' })
    })
    .catch((err) => {
      console.log(email.value, password.value)
      console.log(err.response)
      console.log(err.response.data)
    })

  await AxiosInstance.get('/api/user')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>
