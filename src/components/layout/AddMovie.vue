<template>
  <router-link
    :to="{ name: 'add-movie' }"
    class="flex items-center space-x-4 mb-8 w-40 lg:w-fit lg:mb-0"
  >
    <div
      class="px-2 py-1 bg-red-600 w-52 lg:px-4 lg:py-3 rounded flex items-center space-x-4 mt-6 cursor-pointer"
    >
      <IconAddMovie />
      <button class="w-fit">
        <p class="text-search">{{ $t('base.add_movie') }}</p>
      </button>
      <router-view />
    </div>
  </router-link>
</template>
<script setup>
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
</script>
