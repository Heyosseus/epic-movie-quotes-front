<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg overflow-hidden"
      >
        <div
          class="flex flex-col px-6 py-10 md:px-20 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <h1 class="text-xl md:text-2xl">{{ $t('login.title') }}</h1>
          <p class="text-sm text-gray-500">{{ $t('login.paragraph') }}</p>
          <Form class="flex flex-col space-y-4 w-full md:w-96" @submit="login">
            <div class="flex flex-col">
              <label for="email">{{ $t('login.email') }}</label>
              <div class="relative">
                <Field
                  type="text"
                  name="email"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-field"
                  :class="{ 'border-2 border-red-500': errors.email }"
                  :placeholder="$t('login.placeholder_email')"
                  v-model="emailOrName"
                  :value="emailOrName"
                  autocomplete="email"
                  rules="required"
                />
                <div v-if="errors.email" class="absolute right-2 top-3"><IconInvalid /></div>
              </div>

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
                  :value="password"
                  autocomplete
                />
                <IconShowPassword
                  class="absolute right-2 top-3"
                  @click="showPassword = !showPassword"
                  v-if="!errors.password"
                />
                <div v-if="errors.password" class="absolute right-2 top-3"><IconInvalid /></div>
              </div>
              <ErrorMessage name="password" class="text-red-500 text-sm font-normal" />
              <span class="text-red-500 text-sm font-normal">{{ errors.password }}</span>
            </div>
            <div class="flex justify-between">
              <div class="space-x-2">
                <input type="checkbox" v-model="remember_me" name="remember" />
                <label for="remember">{{ $t('login.remember_me') }}</label>
              </div>
              <router-link :to="{ name: 'forgot-password' }" class="underline text-blue-600">{{
                $t('login.forgot')
              }}</router-link>
            </div>
            <div class="space-y-8">
              <button
                class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-6"
                type="submit"
              >
                {{ $t('login.login') }}
              </button>
              <div @click="authStore.setIsGoogleAuthenticated(true)">
                <a
                  :href="`${backendUrl}/auth/google/redirect`"
                  class="border border-white py-3 flex w-full items-center justify-center mx-auto"
                >
                  <IconGoogle class="w-6 h-6 mr-2" />
                  Sign in with Google
                </a>
              </div>
              <p class="text-center mt-6">
                {{ $t('login.dont_have_an_account') }}
                <router-link :to="{ name: 'register' }" class="underline text-blue-600">{{
                  $t('login.signup')
                }}</router-link>
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
import IconInvalid from '../../icons/IconInvalid.vue'
import IconGoogle from '../../icons/IconGoogle.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import IconShowPassword from '../../icons/IconShowPassword.vue'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import { onClickOutside } from '@vueuse/core'
const router = useRouter()

const showPassword = ref(false)
const emailOrName = ref(null)
const password = ref(null)
const remember_me = ref(false)
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

const errors = ref({
  email: '',
  password: ''
})
const authStore = useAuthStore()
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'home' })
})
const login = async () => {
  await AxiosInstance.get('/sanctum/csrf-cookie')

  const loginData = {
    password: password.value,
    remember_me: remember_me.value
  }

  if (emailOrName.value.includes('@')) {
    loginData.email = emailOrName.value
  } else {
    loginData.name = emailOrName.value
  }

  await AxiosInstance.post('/api/login', loginData)
    .then(() => {
      authStore.setIsUserAuthenticated(true)
      router.push({ name: 'news-feed' })
    })
    .catch((err) => {
      if (err.response.status === 401 && err.response.data.errors) {
        const fieldErrors = err.response.data.errors

        errors.value.email = fieldErrors.email ? fieldErrors.email[0] : ''
        errors.value.password = fieldErrors.password ? fieldErrors.password[0] : ''
      } else {
        errors.value.email = ''
        errors.value.password = ''
      }
    })
}

AxiosInstance.get('/api/cookie-credentials').then((res) => {
  emailOrName.value = res.data.email 
  password.value = res.data.password
})
</script>
