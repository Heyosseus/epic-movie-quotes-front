<template>
  <div class="bg-landingBg h-screen w-full flex flex-col items-center justify-center space-y-12">
    <IconNotFound />
    <IconEllipse />
    <div>
      <h1 class="text-2xl lg:text-5xl text-center">Whoops!</h1>
      <p class="text-sm lg:text-lg mt-6 text-center">We can't see the page you are looking for</p>
    </div>
    <router-link
      :to="{ name: 'home' }"
      class="py-2 px-6 bg-red-700 text-white rounded flex items-center justify-center mx-auto mt-6"
    >
      Return home
    </router-link>
  </div>
</template>
<script setup>
import IconNotFound from '@/components/icons/IconNotFound.vue'
import IconEllipse from '@/components/icons/IconEllipse.vue'
</script>
