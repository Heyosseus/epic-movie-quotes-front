<template>
  <div class="relative">
    <teleport to="body">
      <div class="lg:hidden absolute w-full h-full flex flex-col bg-landingBg px-4 py-6">
        <div class="flex items-center">
          <IconArrowBackVue width="40" height="15" @click="router.push({ name: 'news-feed' })" />
          <input
            type="text"
            placeholder="Search"
            class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-white"
          />
        </div>
        <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>
        <div class="text-gray-400 flex items-center space-y-2 flex-col just mt-10">
          <p>Enter @ to search movies</p>
          <p>Enter # to search quotes</p>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import IconArrowBackVue from '../icons/IconArrowBack.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
