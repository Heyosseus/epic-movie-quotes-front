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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

function getCookie(name) {
  var nameEQ = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
  }
  return null
}

const logout = () => {
  const token = getCookie('token')
  axios
    .post('http://localhost:8000/api/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      window.location.href = '/'
    })
}
</script>
