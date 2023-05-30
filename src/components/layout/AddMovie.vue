<template>
    <div class="flex items-center space-x-4">
      <div class="flex items-center">
        <IconSearch />
        <input
          type="text"
          class="bg-transparent outline-0 w-36 flex items-center justify-center px-2"
          placeholder="Search by"
        />
      </div>
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
import IconSearch from '@/components/icons/IconSearch.vue'
import IconAddMovie from '@/components/icons/IconAddMovie.vue'

</script>
