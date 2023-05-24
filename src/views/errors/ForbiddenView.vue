<template>
  <div class="bg-landingBg h-screen w-full flex flex-col items-center justify-center space-y-12">
    <div class="relative">
      <IconUnion class="absolute top-20 flex items-center justify-center w-full" />
      <IconGendalf class="z-1 relative mt-2" />
    </div>

    <div>
      <h1 class="text-2xl lg:text-5xl text-center">You shall not pass!</h1>
      <p class="text-sm lg:text-lg mt-6 text-center">
        Sorry, but you don't have permission to access this page
      </p>
    </div>
    <button
      class="py-2 px-6 bg-red-700 text-white rounded flex items-center justify-center mx-auto mt-6"
      @click="navigateToHome"
    >
      Return home
    </button>
  </div>
</template>
<script setup>
import IconGendalf from '@/components/icons/IconGendalf.vue'
import IconUnion from '../../components/icons/IconUnion.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateToHome = () => {
  router.push('/')
}
</script>
