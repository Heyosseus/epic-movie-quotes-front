<template>
  <h1 class="text-xl">Log in to your account</h1>
  <p class="text-sm text-gray-500">Welcome back! Please enter your details.</p>
  <Form class="flex flex-col space-y-4" @submit="login">
    <div class="flex flex-col w-96">
      <label for="">Email</label>
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
      <label for="">Password</label>
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
        <label for="">Remember me</label>
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
          Sign in with Google</a
        >
      </div>
      <p class="text-center mt-6">
        Already have an account?
        <a href="/register" class="underline text-blue-600" @click="openRegisterModal">Sign up</a>
      </p>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useField } from 'vee-validate'
import IconGoogle from '../icons/IconGoogle.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import IconShowPassword from '../icons/IconShowPassword.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const { errors } = useField()
const showPassword = ref(false)
const email = ref('')
const password = ref('')

function setCookie(name, value, minutes) {
  var expires = ''
  if (minutes) {
    var date = new Date()
    date.setTime(date.getTime() + minutes * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}

function getCookie(name) {
  var nameEQ = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
  }
  return null
}

onMounted(() => {
  axios
    .get('http://127.0.0.1:8000/api/user', {
      headers: {
        Authorization: 'Bearer ' + getCookie('token')
      }
    })
    .then(() => {
      router.push({ name: 'news-feed' })
    })
    .catch((err) => {
      console.log(err)
    })
})

const login = () => {
  axios
    .post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value
    })
    .then((res) => {
      console.log(res)
      setCookie('token', res.data.token, 1)
      router.push({ name: 'news-feed' })
    })
    .catch((err) => {
      console.log(email.value, password.value)
      console.log(err.response)
      console.log(err.response.data)
    })
}
</script>
