<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col p-20 px-36 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <h1 class="text-4xl">Create new password</h1>
          <p class="text-sm text-center mt-6">
            Your new password must be different from <br />previous used passwords
          </p>
          <Form class="w-full space-y-4">
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
              <label for="">Confirm Password</label>
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
          </Form>
          <button
            class="py-2.5 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
          >
            Reset password
          </button>

          <div class="flex items-center justify-center space-x-4">
            <IconArrowBack />
            <p class="text-[#6C757D]">back to log in</p>
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

import { ref } from 'vue'
const password = ref('')
const password_confirmation = ref('')
</script>
