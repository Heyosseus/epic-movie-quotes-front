<template>
  <div class="bg-headerBg flex justify-between items-center px-14 py-5">
    <h1 class="text-[#DDCCAA] uppercase cursor-pointer" @click="router.push('/')">movie quotes</h1>
    <div class="flex items-center justify-between w-64">
      <IconNotification />
      <select name="" id="" class="bg-transparent w-16 outline-0">
        <option value="" class="bg-transparent text-black">Eng</option>
        <option value="" class="bg-transparent text-black">Ka</option>
      </select>
      <button class="border border-white rounded-md px-4 py-2" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script setup>
import IconNotification from '@/components/icons/IconNotification.vue'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
const router = useRouter()

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
