<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div
          class="flex flex-col px-6 py-12 md:px-20 md:pt-12 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <img src="@/assets/images/success.png" alt="" class="mt-10" />
          <h1 class="text-2xl md:text-4xl">{{ $t('forgot.success') }}</h1>
          <p class="text-sm md:text-base text-center mt-4 md:mt-6">
            {{ $t('forgot.password_update') }}
          </p>
          <router-link
            :to="{ name: 'login' }"
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-8 md:mt-12"
          >
            {{ $t('login.login') }}
          </router-link>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup props>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()

const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'home' })
})
</script>
