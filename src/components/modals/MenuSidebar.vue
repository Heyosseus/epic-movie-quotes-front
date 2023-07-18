<template>
  <div class="relative">
    <teleport to="body">
      <transition name="slide-out" key="menu" appear>
        <div class="lg:hidden absolute w-[90vw] h-full flex flex-col bg-landingBg">
          <div class="px-4 sm:block" v-if="user" ref="modalRef">
            <div class="flex items-center justify-between w-64 pt-12">
              <div>
                <div v-if="user && user.profile_picture">
                  <img
                    :src="getImages(user.profile_picture)"
                    alt=""
                    class="object-fit w-20 rounded-full"
                  />
                </div>
                <div v-else>
                  <img
                    src="@/assets/images/default_picture.jpg"
                    alt="profile"
                    class="object-fit w-20 rounded-full"
                  />
                </div>
              </div>
              <div class="w-40">
                <h1 class="text-xl">{{ user.name }}</h1>
                <router-link to="/profile" class="text-[#CED4DA] text-sm mt-2">{{
                  $t('base.edit')
                }}</router-link>
              </div>
            </div>
            <router-link
              :to="{ name: 'news-feed' }"
              class="flex items-center justify-between w-60 text-lg mt-12 cursor-pointer"
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
            <button
              class="fixed bottom-20 border border-white w-[80vw] rounded-md py-3 sm:ml-0 mt-2 sm:mt-0 sm:px-4 sm:py-3 text-sm hover:bg-red-700 hover:border-none hover:py-3.5"
              @click="logout"
            >
              {{ $t('base.logout') }}
            </button>
          </div>

          <div v-else class="absolute inset-0 flex items-center justify-center">
            <img src="@/assets/images/loading.gif" alt="" class="w-12" />
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import IconActiveHome from '@/components/icons/IconActiveHome.vue'
import IconMovieList from '@/components/icons/IconMovieList.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconActiveMovieList from '@/components/icons/IconActiveMovieList.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { onClickOutside } from '@vueuse/core'
import { getImages } from '@/utils/images'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const activeHome = ref(false)
const activeMovieList = ref(true)
const user = ref(null)
const modalRef = ref(null)
const authStore = useAuthStore()

onClickOutside(modalRef, () => {
  if (window.location.pathname === '/news-feed') {
    router.push({ name: 'movie-list' })
  } else {
    router.push({ name: 'news-feed' })
  }
})

if (window.location.pathname === '/news-feed') {
  activeHome.value = !activeHome.value
} else {
  activeMovieList.value = !activeMovieList.value
}

AxiosInstance.get(`/api/user`).then((res) => {
  user.value = res.data
})

const logout = () => {
  AxiosInstance.post('/api/logout').then(() => {
    router.push({ name: 'home' })
    authStore.setIsUserAuthenticated(false)
    authStore.setIsGoogleAuthenticated(false)
  })
}
</script>
<style>
.slide-out-enter-active,
.slide-out-leave-active {
  transition: transform 0.6s ease-in-out, opacity 0.6s ease;
}

.slide-out-enter-from,
.slide-out-leave-to {
  transform: translateX(-10%);
  opacity: 0;
}

.slide-out-enter-to,
.slide-out-leave-from {
  opacity: 0.9;
}

.active {
  animation: scrollAnimation 1s ease-in-out;
}
</style>
