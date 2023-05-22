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
        placeholder="Enter your email"
        v-model="email"
      />
      <ErrorMessage name="email" />
    </div>
    <div class="flex flex-col">
      <label for="">Password</label>
      <Field
        type="password"
        name="password"
        class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
        placeholder="Password"
        v-model="password"
      />
      <ErrorMessage name="password" />
    </div>
    <div class="flex justify-between">
      <div class="space-x-2">
        <Field type="checkbox" name="remember" />
        <label for="">Remember me</label>
      </div>

      <a href="#" class="underline text-blue-600">Forgot password</a>
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
        Already have an account? <a href="#" class="underline text-blue-600">Sign up</a>
      </p>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')

const getToken = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie')
  console.log('token')
}

const login = async () => {
  await getToken();
  axios
    .post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(email.value, password.value)
      console.log(err.response)
      console.log(err.response.data)
    })
}
</script>
