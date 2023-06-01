<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col px-32 pt-6 pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <img src="@/assets/images/send.png" alt="" class="mt-10" />
          <h1 class="text-3xl">Thank you!</h1>
          <p class="text-md text-center mt-6">Your account has been activated.</p>
          <button
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
            @click="navigateToLogin"
          >
            Go to news feed
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateToLogin = () => {
  router.push({ name: 'login' })
}
</script>
