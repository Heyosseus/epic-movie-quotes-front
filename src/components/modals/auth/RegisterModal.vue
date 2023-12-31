<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen px-4 flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div
          class="flex flex-col w-full lg:w-fit px-6 py-8 md:px-20 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <h1 class="text-xl md:text-2xl">{{ $t('register.title') }}</h1>
          <p class="text-sm text-gray-500">{{ $t('register.paragraph') }}</p>
          <Form class="flex flex-col space-y-4 w-full md:w-96" @submit="register">
            <div class="flex flex-col">
              <label for="name">{{ $t('register.name') }}</label>
              <Field
                type="text"
                name="name"
                class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-field"
                :placeholder="$t('register.name')"
                v-model="name"
                rules="required|min_for_name:3|max:15|lowercase"
              />
              <ErrorMessage name="name" class="text-red-500 text-sm font-normal" />
              <span class="text-red-500 text-sm font-normal">{{ errors.name }}</span>
            </div>
            <div class="flex flex-col">
              <label for="email">{{ $t('login.email') }}</label>
              <Field
                type="email"
                name="email"
                class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-field"
                :placeholder="$t('login.email')"
                v-model="email"
                rules="required|email"
              />
              <ErrorMessage name="email" class="text-red-500 text-sm font-normal" />
              <span class="text-red-500 text-sm font-normal">{{ errors.email }}</span>
            </div>
            <div class="flex flex-col">
              <label for="password">{{ $t('login.password') }}</label>
              <div class="relative">
                <Field
                  v-bind:type="showPassword ? 'text' : 'password'"
                  name="password"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-field"
                  :placeholder="$t('login.password')"
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
              <label for="password_confirmation">{{ $t('register.confirm_password') }}</label>
              <div class="relative">
                <Field
                  v-bind:type="showPasswordConfirmation ? 'text' : 'password'"
                  name="password_confirmation"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-field"
                  :placeholder="$t('register.confirm_password')"
                  v-model="password_confirmation"
                  rules="required|confirmed:@password"
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
                {{ $t('home.get_started') }}
              </button>
              <div>
                <a
                  :href="`${backendUrl}/auth/google/redirect`"
                  class="border border-white py-3 flex w-full items-center justify-center mx-auto"
                >
                  <IconGoogle class="w-6 h-6 mr-2" />
                  Sign up with Google
                </a>
              </div>
              <p class="text-center mt-6">
                {{ $t('register.have_an_account') }}
                <a href="/login" class="underline text-blue-600">{{ $t('home.login') }}</a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import IconGoogle from '../../icons/IconGoogle.vue'
import IconShowPassword from '../../icons/IconShowPassword.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import API from '@/services/api'

const router = useRouter()
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const modalRef = ref(null)

const errors = ref({
  email: '',
  name: ''
})
onClickOutside(modalRef, () => {
  router.push({ name: 'home' })
})
const register = async () => {
  await API.sanctum()
  await API.register({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  })
    .then(() => {
      router.push({ name: 'activation' })
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.errors) {
        const responseErrors = err.response.data.errors
        if (responseErrors.email && responseErrors.email.length > 0) {
          errors.value.email = 'email already exists'
        } else {
          errors.value.email = ''
        }
        if (responseErrors.name && responseErrors.name.length > 0) {
          errors.value.name = 'name already exists'
        } else {
          errors.value.name = ''
        }
      }
    })
}
</script>
