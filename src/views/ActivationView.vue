<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div
          class="flex flex-col px-6 pt-6 pb-12 md:px-16 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
          ref="modalRef"
        >
          <img src="@/assets/images/send.png" alt="" class="mt-10" />
          <h1 class="text-2xl md:text-3xl text-center">{{ $t('register.thanks') }}</h1>
          <p class="text-sm md:text-base text-center mt-6">
            {{ $t('register.first_paragraph') }} <br />
            {{ $t('register.second_paragraph') }}
          </p>
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
          >
            {{ $t('register.go_to_email') }}
          </a>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'home' })
})
</script>
