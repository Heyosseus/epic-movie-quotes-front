<template>
  <div class="bg-landingBg h-screen w-full flex flex-col items-center justify-center space-y-12">
    <div class="relative">
      <IconUnion class="absolute top-20 flex items-center justify-center w-full" />
      <IconGendalf class="z-1 relative mt-2" />
    </div>

    <div>
      <h1 class="text-2xl lg:text-5xl text-center">{{ $t('home.shall_not_pass') }}</h1>
      <p class="text-sm lg:text-lg mt-6 text-center">
        {{ $t('home.permission') }}
      </p>
    </div>
    <router-link
      :to="{ name: 'home' }"
      class="py-2 px-6 bg-red-700 text-white rounded flex items-center justify-center mx-auto mt-6"
    >
      {{ $t('home.return_home') }}
    </router-link>
  </div>
</template>
<script setup>
import IconGendalf from '@/components/icons/IconGendalf.vue'
import IconUnion from '../../components/icons/IconUnion.vue'
</script>
