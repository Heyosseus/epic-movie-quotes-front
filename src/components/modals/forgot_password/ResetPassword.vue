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
          <img src="@/assets/images/send.png" alt="" class="mt-6 md:mt-10" />
          <h1 class="text-2xl md:text-4xl">Check your email</h1>
          <p class="text-md md:text-lg text-center mt-4">
            We have sent password recovery instructions <br />
            to your email
          </p>
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            class="py-2.5 px-6 md:py-3 md:px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-8 md:mt-12"
            target="_blank"
          >
            Go to my email
          </a>
          <router-link :to="{name: 'update-password'}" class="flex items-center justify-center mt-4 md:mt-8 space-x-4">
            <p class="text-[#6C757D] cursor-pointer">Skip, I'll confirm later</p>
          </router-link>
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
