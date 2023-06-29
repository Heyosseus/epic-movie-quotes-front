<template>
  <div class="hidden px-16 sm:block" v-if="user">
    <div class="flex justify-between w-64 pt-12">
      <div>
        <div
          :class="[
            'object-fit',
            'w-20',
            'rounded-full',
            { 'border-4': activeProfile, 'border-red-700': activeProfile }
          ]"
        >
          <img
            v-if="user && user.profile_picture"
            :src="getImages(user.profile_picture)"
            alt=""
            class="object-fit w-20 rounded-full"
          />
          <img
            v-else
            src="@/assets/images/default_picture.jpg"
            alt="profile"
            class="object-fit w-20 rounded-full"
          />
        </div>
      </div>
      <div>
        <h1 class="text-xl">{{ user.name }}</h1>
        <router-link to="/profile" class="text-[#CED4DA] text-sm mt-2"
          >Edit your profile</router-link
        >
      </div>
    </div>
    <div
      class="flex items-center justify-between w-52 text-center text-lg mt-12 cursor-pointer"
      @click="navigateToNewsFeed"
    >
      <IconActiveHome v-if="activeHome" />
      <IconHome v-else />
      <p>News feed</p>
    </div>

    <div
      class="flex items-center justify-between w-60 text-center text-lg mt-8 cursor-pointer"
      @click="navigateToMovieList"
    >
      <IconMovieList v-if="activeMovieList" />
      <IconActiveMovieList v-else />
      <p class="">List of Movies</p>
    </div>
  </div>
  <div v-else class="absolute inset-0 flex items-center justify-center">
    <img src="@/assets/images/loading.gif" alt="" class="w-12" />
  </div>
</template>
<script setup>
import IconActiveHome from '@/components/icons/IconActiveHome.vue'
import IconMovieList from '@/components/icons/IconMovieList.vue'
import IconHome from '../icons/IconHome.vue'
import IconActiveMovieList from '../icons/IconActiveMovieList.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'

const router = useRouter()
const activeHome = ref(false)
const activeMovieList = ref(true)
const user = ref(null)
const activeProfile = ref(false)

const navigateToMovieList = () => {
  router.push('/movie-list')
}

const navigateToNewsFeed = () => {
  router.push('/news-feed')
}

if (window.location.pathname === '/news-feed') {
  activeHome.value = !activeHome.value
} else if (window.location.pathname === '/profile') {
  activeProfile.value = !activeProfile.value
} else {
  activeMovieList.value = !activeMovieList.value
}
onMounted(() => {
  AxiosInstance.get(`/api/user`)
    .then((res) => {
      user.value = res.data
    })
    .catch((err) => {
      console.log(err.response)
    })
})
</script>
