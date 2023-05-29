<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] h-screen">
      <div class="flex">
        <BaseSidebar />
        <AddMovie />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import AddMovie from '@/components/layout/AddMovie.vue';
</script>
