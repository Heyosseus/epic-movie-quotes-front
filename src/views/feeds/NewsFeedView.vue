<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] h-screen">
      <div class="flex">
        <BaseSidebar />
        <SearchBar />
      </div>
    </div>
  </div>

  <router-view />
</template>

<script setup>
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import SearchBar from '@/components/layout/SearchBar.vue'
</script>
