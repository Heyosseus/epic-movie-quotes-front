<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col p-20 px-36 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <h1 class="text-4xl">Forgot password?</h1>
          <p class="text-sm text-center mt-6">
            Enter the email and we’ll send an email with <br />instructions to reset your password
          </p>
          <Form class="flex flex-col w-full" @submit="recoveryPassword">
            <label for="email">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              class="py-2.5 px-2 mt-2 rounded-md bg-[#CED4DA] text-black"
              v-model="email"
            />
            <ErrorMessage name="email" class="text-red-500" />
            <button
              class="py-2.5 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
              type="submit"
            >
              Send instructions
            </button>
          </Form>
          <div class="flex items-center justify-center space-x-4">
            <IconArrowBack @click="navigateToLogin" />
            <p class="text-[#6C757D]" @click="navigateToLogin">back to log in</p>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')

const navigateToLogin = () => {
  router.push({ name: 'Login' })
}

const recoveryPassword = () => {
  axios
    .post('http://localhost:8000/api/forgot-password', {
      email: email.value
    })
    .then((res) => {
      console.log(res)
      router.push({ name: 'reset-password' })
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>
