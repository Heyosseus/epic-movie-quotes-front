<template>
  <div class="px-16">
    <div class="flex justify-between w-64 pt-12">
      <img src="@/assets/images/profile.jpg" alt="profile" class="object-fit w-20 rounded-full" />
      <div>
        <h1 class="text-xl">Rati Rukhadze</h1>
        <p class="text-[#CED4DA] text-sm mt-2">Edit your profile</p>
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
      @click="navigateToMOvieList"
    >
      <IconMovieList v-if="activeMovieList" />
      <IconActiveMovieList v-else />
      <p class="">List of Movies</p>
    </div>
  </div>
</template>
<script setup>
import IconActiveHome from '@/components/icons/IconActiveHome.vue'
import IconMovieList from '@/components/icons/IconMovieList.vue'
import IconHome from '../icons/IconHome.vue'
import IconActiveMovieList from '../icons/IconActiveMovieList.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const activeHome = ref(false)
const activeMovieList = ref(true)

const navigateToMOvieList = () => {
  router.push('/movie-list')
}

const navigateToNewsFeed = () => {
  router.push('/news-feed')
}

if (window.location.pathname === '/news-feed') {
  activeHome.value = !activeHome.value
}

if (window.location.pathname === '/movie-list') {
  activeMovieList.value = !activeMovieList.value
}
</script>
