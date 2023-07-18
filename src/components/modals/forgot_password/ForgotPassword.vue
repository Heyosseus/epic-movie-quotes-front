<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div
          class="flex flex-col px-6 py-12 md:px-20 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <h1 class="text-2xl md:text-4xl">{{ $t('login.forgot') }}</h1>
          <p class="text-sm md:text-base text-center">
            {{ $t('forgot.first_paragraph') }} <br />
            {{ $t('forgot.second_paragraph') }}
          </p>
          <Form class="flex flex-col w-full" @submit="recoveryPassword">
            <label for="email">{{ $t('login.email') }}</label>
            <Field
              type="email"
              name="email"
              :placeholder="$t('login.placeholder_email')"
              class="py-2 px-4 md:py-2.5 md:px-2 mt-2 rounded-md bg-[#CED4DA] text-black"
              v-model="email"
            />
            <ErrorMessage name="email" class="text-red-500" />
            <button
              class="py-2 px-6 md:py-2.5 md:px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
              type="submit"
            >
              {{ $t('forgot.send_instructions') }}
            </button>
          </Form>
          <router-link :to="{ name: 'login' }" class="flex items-center justify-center space-x-4">
            <IconArrowBack />
            <p class="text-[#6C757D] cursor-pointer">{{ $t('forgot.back_to_login') }}</p>
          </router-link>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import API from '@/services/api'
const router = useRouter()
const email = ref('')

const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'home' })
})

const recoveryPassword = () => {
  API.forgotPassword({
    email: email.value
  })
    .then(() => {
      router.push({ name: 'reset-password', params: { email: email.value } })
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>
