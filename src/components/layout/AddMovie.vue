<template>
  <div class="flex items-center space-x-4 mb-8 w-48 lg:w-fit lg:mb-0">
    <div
      class="px-2 py-1 bg-red-600 w-52 lg:px-4 lg:py-3 rounded flex items-center space-x-4 mt-6 cursor-pointer"
    >
      <IconAddMovie />
      <button class="w-fit">
        <router-link :to="{ name: 'add-movie' }" class="text-search">{{
          $t('base.add_movie')
        }}</router-link>
      </button>
      <router-view />
    </div>
  </div>
</template>
<script setup>
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
</script>
