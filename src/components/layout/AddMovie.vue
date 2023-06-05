<template>
  <div class="flex items-center space-x-4">
    <div class="px-2 py-1 bg-red-600 lg:px-4 lg:py-3 rounded flex items-center space-x-4 mt-6">
      <IconAddMovie />
      <button class="w-24">
        <router-link :to="{ name: 'add-movie' }" class="text-search">Add movie</router-link>
      </button>
      <router-view />
    </div>
  </div>
</template>
<script setup>
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
</script>
