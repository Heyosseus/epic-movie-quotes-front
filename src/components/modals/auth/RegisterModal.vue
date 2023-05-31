<template>
  <div
    class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
  >
    <div
      class="flex flex-col px-20 pt-6 pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
    >
      <h1 class="text-xl">Create an account</h1>
      <p class="text-sm text-gray-500">Start your journey</p>
      <Form class="flex flex-col space-y-4" @submit="register">
        <div class="flex flex-col w-96">
          <label for="">Name</label>
          <Field
            type="text"
            name="name"
            class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
            placeholder="At least 3 & max.15 lower case characters"
            v-model="name"
            rules="required|min_for_name:3|max:15|lowercase"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm font-normal" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">Email</label>
          <Field
            type="email"
            name="email"
            class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
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
            <IconShowPassword
              class="absolute right-2 top-3"
              @click="showPassword = !showPassword"
            />
          </div>

          <ErrorMessage name="password" class="text-red-500 text-sm font-normal" />
        </div>
        <div class="flex flex-col">
          <label for="">Password confirmation</label>
          <div class="relative">
            <Field
              v-bind:type="showPasswordConfirmation ? 'text' : 'password'"
              name="password_confirmation"
              class="py-2 px-2 rounded-md outline-0 text-black w-full font-normal bg-[#CED4DA]"
              placeholder="Confirm Password"
              v-model="password_confirmation"
              rules="required|confirmed:password"
            />
            <IconShowPassword
              class="absolute right-2 top-3"
              @click="showPasswordConfirmation = !showPasswordConfirmation"
            />
          </div>
          <ErrorMessage name="password_confirmation" class="text-red-500 text-sm font-normal" />
        </div>
        <div class="space-y-8">
          <button
            class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-2"
            type="submit"
          >
            Get started
          </button>

          <div>
            <a
              href="http://localhost:8000/auth/google/redirect"
              class="border border-white py-3 flex w-full items-center justify-center mx-auto"
            >
              <IconGoogle class="w-6 h-6 mr-2" />
              Sign up with Google</a
            >
          </div>

          <p class="text-center mt-6">
            Already have an account? <a href="/login" class="underline text-blue-600">Log in</a>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import IconGoogle from '../../icons/IconGoogle.vue'
import IconShowPassword from '../../icons/IconShowPassword.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

defineProps({
  isRegisterModalOpen: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const register = () => {
  console.log(email.value, password.value)
  axios
    .post('http://localhost:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    .then((res) => {
      console.log(res)
      router.push({ name: 'activation' })
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>