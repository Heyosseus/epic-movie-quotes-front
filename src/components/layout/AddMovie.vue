<template>
  <div class="flex items-center space-x-4">
    <div class="bg-red-600 px-4 py-3 rounded flex items-center space-x-4">
      <IconAddMovie />
      <button class="w-24">
        <router-link to="/add-movie" class="text-search">Add movie</router-link>
      </button>
      <router-view />
    </div>
  </div>
</template>
<script setup>
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
</script>
