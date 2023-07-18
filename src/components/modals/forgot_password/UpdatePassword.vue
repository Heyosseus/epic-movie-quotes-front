<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-full flex flex-col items-center justify-center bg-transparentLandingBg overflow-y-auto"
      >
        <div
          class="flex flex-col px-6 py-12 md:px-20 md:pt-12 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <h1 class="text-2xl md:text-4xl">{{ $t('forgot.create_new_password') }}</h1>
          <p class="text-sm md:text-base text-center mt-4 md:mt-6">
            {{ $t('forgot.new_password') }} <br /> {{ $t('forgot.previous') }}
          </p>
          <Form class="w-full space-y-6" @submit="resetPassword">
            <div class="flex flex-col">
              <label for="update_password">{{ $t('login.password') }}</label>
              <div class="relative">
                <Field
                  v-bind:type="showPassword ? 'text' : 'password'"
                  name="update_password"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  :placeholder="$t('login.password')"
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
              <label for="update_password_confirmation">{{
                $t('register.confirm_password')
              }}</label>
              <div class="relative">
                <Field
                  v-bind:type="showPasswordConfirmation ? 'text' : 'password'"
                  name="update_password_confirmation"
                  class="py-2 px-2 rounded-md outline-0 w-full text-black font-normal bg-[#CED4DA]"
                  :placeholder="$t('register.confirm_password')"
                  v-model="password_confirmation"
                  rules="required|min:8|confirmed:@update_password"
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
              {{ $t('forgot.reset') }}
            </button>
          </Form>

          <router-link
            :to="{ name: 'login' }"
            class="flex items-center justify-center mt-4 md:mt-8 space-x-4"
          >
            <IconArrowBack />
            <p class="text-[#6C757D]">{{ $t('forgot.back_to_login') }}</p>
          </router-link>
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
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import API from '@/services/api'

const email = ref('')
const router = useRouter()

const update_password = ref(null)
const password_confirmation = ref(null)

const showPassword = ref(false)

const showPasswordConfirmation = ref(false)

const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'home' })
})
const resetPassword = async () => {
  await API.sanctum()
  await API.user().then((res) => (email.value = res.data.email))

  await API.resetPassword({
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
