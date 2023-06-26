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
        <IconSearch class="mt-2 w-14 lg:hidden" @click="router.push({ name: 'search' })" />
        <div>
          <IconNotification
            class="mt-2 ml-2 w-6 lg:w-10 relative"
            @click="showNotifications = !showNotifications"
          />
          <div
            v-if="showNotifications"
            class="bg-movie w-notification absolute top-20 right-[100px] px-6 py-10"
          >
            <div class="flex items-center justify-between">
              <h1 class="text-2xl">Notifications</h1>
              <p class="underline">Mark as all read</p>
            </div>
            <div v-if="notification">
              <span>{{ notification }} </span>
            </div>
            <div v-else>hh</div>
          </div>
        </div>
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
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import MenuSidebar from '../modals/MenuSidebar.vue'
import instantiatePusher from '@/config/helpers/instantiatePusher'

const router = useRouter()

const authStore = useAuthStore()
const show = ref(false)
const showNotifications = ref(false)
const user = ref(null)
const notification = ref('')

const logout = () => {
  AxiosInstance.post('/api/logout')
    .then(() => {
      router.push({ name: 'home' })
      authStore.setIsUserAuthenticated(false)
    })
    .catch((err) => {
      console.log(err.response)
    })
}
onMounted(async () => {
  try {
    const response = await AxiosInstance.get('/api/user')
    user.value = response.data

    instantiatePusher()

    window.Echo.private(`notification-received.${user.value.id}`).listen(
      'NotificationReceived',
      (data) => {
        notification.value = data.notification
      }
    )
  } catch (error) {
    console.log(error.response)
  }
})


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
