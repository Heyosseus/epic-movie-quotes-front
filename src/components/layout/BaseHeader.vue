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
      <IconMenu class="block sm:hidden" @click="show = true" />
      <div v-if="show"><MenuSidebar /></div>

      <router-link :to="{ name: 'menu' }"> </router-link>
      <div class="flex items-center sm:justify-between sm:w-80">
        <IconSearch class="mt-2 w-14" @click="router.push({ name: 'search' })" />
        <IconNotification class="mt-2 ml-2 w-6 lg:w-10" />
        <select
          name=""
          id=""
          class="hidden bg-transparent w-16 outline-0 ml-4 sm:ml-0 mt-4 sm:mt-0 sm:block"
        >
          <option value="" class="bg-transparent text-black">Eng</option>
          <option value="" class="bg-transparent text-black">Ka</option>
        </select>

        <button
          class="border border-white rounded-md px-2 py-2 ml-4 sm:ml-0 mt-2 sm:mt-0 sm:px-4 sm:py-3 text-[11px]"
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
import IconSearch from '@/components/icons/IconSearch.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import MenuSidebar from '../modals/MenuSidebar.vue'

const router = useRouter()
// import axios from 'axios'

const authStore = useAuthStore()
const show = ref(false)

const logout = () => {
  AxiosInstance.post('/api/logout')
    .then((res) => {
      console.log(res)
      router.push({ name: 'home' })
      authStore.setIsUserAuthenticated(false)
    })
    .catch((err) => {
      console.log(err.response)
    })
}

AxiosInstance.get('/api/check-session').then((response) => {
  const isSessionActive = response.data.isSessionActive
  const isGoogleAuthenticated = response.data.isGoogleAuthenticated

  if (isSessionActive || isGoogleAuthenticated) {
    authStore.setIsUserAuthenticated(true)
  } else {
    authStore.setIsUserAuthenticated(false)
    router.push({ name: 'forbidden' })
  }
})
</script>
