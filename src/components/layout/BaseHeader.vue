<template>
  <div
    class="bg-headerBg flex flex-col sm:flex-row justify-between items-center px-6 sm:px-14 py-2 sm:py-5"
  >
    <router-link
      :to="{ name: 'home' }"
      class="hidden sm:block text-[#DDCCAA] uppercase cursor-pointer"
      >movie quotes</router-link
    >
    <div class="flex items-center justify-between w-full sm:w-64 sm:mt-0">
      <IconMenu class="block sm:hidden" @click="showMenu" />
      <router-link :to="{ name: 'menu' }"> </router-link>
      <div class="flex items-center sm:justify-between sm:w-80">
        <IconNotification class="mt-2" />
        <select
          name=""
          id=""
          class="hidden bg-transparent w-16 outline-0 ml-4 sm:ml-0 mt-4 sm:mt-0 sm:block"
        >
          <option value="" class="bg-transparent text-black">Eng</option>
          <option value="" class="bg-transparent text-black">Ka</option>
        </select>
        <button
          class="border border-white rounded-md px-2 py-2 ml-4 sm:ml-0 mt-4 sm:mt-0 sm:px-4 sm:py-3 text-sm"
          @click="logout"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconNotification from '@/components/icons/IconNotification.vue'
import IconMenu from '@/components/icons/IconMenu.vue'

import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
const router = useRouter()

const showMenu = () => {
  router.push({ name: 'menu' })
}

const logout = () => {
  AxiosInstance.post('/api/logout')
    .then((res) => {
      console.log(res)
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>
