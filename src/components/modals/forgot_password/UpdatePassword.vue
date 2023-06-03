<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col p-6 md:p-20 lg:px-36 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-6"
        >
          <h1 class="text-2xl md:text-4xl">Create new password</h1>
          <p class="text-sm md:text-base text-center mt-4 md:mt-6">
            Your new password must be different from previous used passwords
          </p>
          <Form class="w-full space-y-4" @submit="resetPassword">
            <div class="flex flex-col">
              <label for="email">Email</label>
              <Field
                name="email"
                type="email"
                class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-[#CED4DA]"
                placeholder="Email"
                v-model="email"
              />
              <ErrorMessage name="email" class="text-red-500 text-sm font-normal" />
            </div>
            <div class="flex flex-col">
              <label for="update_password">Password</label>
              <div class="relative">
                <Field
                  v-bind:type="showPassword ? 'text' : 'password'"
                  name="update_password"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  placeholder="Password"
                  v-model="update_password"
                  rules="required|min:8"
                />
                <IconShowPassword
                  class="absolute right-2 top-3"
                  @click="showPassword = !showPassword"
                />
              </div>
              <ErrorMessage name="update_password" class="text-red-500 text-sm font-normal" />
            </div>
            <div class="flex flex-col">
              <label for="update_password_confirmation">Confirm Password</label>
              <div class="relative">
                <Field
                  v-bind:type="showPasswordConfirmation ? 'text' : 'password'"
                  name="update_password_confirmation"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  placeholder="Confirm Password"
                  v-model="password_confirmation"
                  rules="required|min:8"
                />
                <IconShowPassword
                  class="absolute right-2 top-3"
                  @click="showPasswordConfirmation = !showPasswordConfirmation"
                />
              </div>
              <ErrorMessage
                name="update_password_confirmation"
                class="text-red-500 text-sm font-normal"
              />
            </div>
            <button
              class="py-2.5 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-8 md:mt-12"
              type="submit"
            >
              Reset password
            </button>
          </Form>

          <div class="flex items-center justify-center mt-4 md:mt-8 space-x-4">
            <IconArrowBack />
            <router-link to="/login" class="text-[#6C757D]">back to log in</router-link>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import IconShowPassword from '@/components/icons/IconShowPassword.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref()
const update_password = ref(null)
const password_confirmation = ref(null)

const showPassword = ref(false)

const showPasswordConfirmation = ref(false)

const resetPassword = () => {
  console.log(update_password.value, password_confirmation.value)
  axios
    .put('http://localhost:8000/api/reset-password', {
      password: update_password.value,
      email: email.value
    })
    .then((res) => {
      console.log(res)
      router.push({ name: 'success' })
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>
