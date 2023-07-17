<template>
  <div class="hidden px-16 sm:block" v-if="user">
    <div class="flex justify-between items-center w-64 pt-12">
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
        <h1 class="text-xl w-40">{{ user.name }}</h1>
        <router-link to="/profile" class="text-[#CED4DA] text-sm mt-2">{{
          $t('base.edit')
        }}</router-link>
      </div>
    </div>
    <router-link
      :to="{ name: 'news-feed' }"
      class="flex items-center justify-between w-60 text-lg mt-12 cursor-pointer"
      @click="navigateToNewsFeed"
    >
      <IconActiveHome v-if="activeHome" />
      <IconHome v-else />
      <p class="w-36">{{ $t('base.news_feed') }}</p>
    </router-link>

    <router-link
      :to="{ name: 'movie-list' }"
      class="flex items-center justify-between w-60 text-lg mt-8 cursor-pointer"
    >
      <IconMovieList v-if="activeMovieList" />
      <IconActiveMovieList v-else />
      <p class="w-36">{{ $t('base.movie_list') }}</p>
    </router-link>
  </div>
  <div v-else class="absolute inset-0 flex items-center justify-center">
    <img src="@/assets/images/loading.gif" alt="" class="w-12" />
  </div>
</template>
<script setup>
import IconActiveHome from '@/components/icons/IconActiveHome.vue'
import IconMovieList from '@/components/icons/IconMovieList.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconActiveMovieList from '@/components/icons/IconActiveMovieList.vue'
import { ref } from 'vue'
import { getImages } from '@/config/axios/helpers'
import API from '@/services/api'

const activeHome = ref(false)
const activeMovieList = ref(true)

const user = ref(null)
const activeProfile = ref(false)

if (window.location.pathname === '/news-feed') {
  activeHome.value = !activeHome.value
} else if (window.location.pathname === '/profile') {
  activeProfile.value = !activeProfile.value
} else {
  activeMovieList.value = !activeMovieList.value
}

API.user().then((res) => {
  user.value = res.data
})
</script>
