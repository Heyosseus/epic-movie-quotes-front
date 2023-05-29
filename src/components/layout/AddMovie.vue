<template>
  <div class="flex items-center w-full justify-between h-10 mt-12 px-20">
    <h1 class="text-lg">My list of movies (total 25)</h1>
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
        <button>
          <p class="text-search">Add movie</p>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
</script>
