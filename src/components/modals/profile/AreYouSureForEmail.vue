<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col justify-center items-center bg-transparentLandingBg lg:hidden"
      >
        <div
          class="flex flex-col w-full px-6 py-10 md:px-20 md:pt-6 md:pb-16 rounded-md items-center mx-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <p class="mb-10">{{ $t('profile.make_sure') }}</p>
          <div class="block h-[1px] w-full bg-gray-400"></div>

          <div class="flex justify-between px-4 w-full items-center mt-6">
            <router-link :to="{ name: 'edit-username' }" class="bg-transparent">{{
              $t('profile.cancel')
            }}</router-link>

            <router-link
              :to="{ name: 'are-you-sure' }"
              class="bg-red-700 py-3 px-4 rounded"
              @click="updateProfile"
            >
              {{ $t('profile.save') }}
            </router-link>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API from '@/services/api'
const router = useRouter()
const props = defineProps({
  email: String
})

const name = ref('')
const profile = ref('')

API.user().then((res) => {
  name.value = res.data.name
  profile.value = res.data.profile
})

const updateProfile = () => {
  const formData = new FormData()
  formData.append('email', props.email)
  formData.append('name', name.value)
  formData.append('profile', profile.value)
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
  axios
    .post(`${backendUrl}/api/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      router.push({ name: 'reset-password' })
    })
    .catch((err) => {
      console.log(err.response)
    })
}
</script>
