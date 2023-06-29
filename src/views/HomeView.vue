<template>
  <div
    class="flex flex-col justify-between min-h-screen px-4 sm:px-6 md:px-8 pt-6 mx-auto bg-slate-950"
  >
    <div class="bg-landingBg px-4 sm:px-8 py-4 sm:py-8 md:py-4 h-[72vh]">
      <div>
        <nav class="flex justify-between items-center">
          <h1 class="text-[12px] uppercase text-primary font-extrabold lg:text-lg">
            {{ $t('home.title') }}
          </h1>
          <div class="flex justify-between w-56 sm:w-80">
            <select
              name=""
              id=""
              class="bg-transparent w-12 sm:w-14 outline-0"
              v-model="$i18n.locale"
            >
              <option
                v-for="locale in $i18n.availableLocales"
                :key="`locale-${locale}`"
                :value="locale"
                class="bg-black"
              >
                {{ locale }}
              </option>
            </select>
            <router-link
              :to="{ name: 'register' }"
              class="py-2 px-4 text-sm sm:px-6 bg-red-700 text-white rounded-md"
            >
              {{ $t('home.signup') }}
            </router-link>
            <div v-if="isRegisterModalOpen">
              <RegisterModal />
            </div>
            <router-link
              :to="{ name: 'login' }"
              class="py-2 px-4 text-sm sm:px-6 bg-transparent border border-white rounded-md"
              @click="navigateToNewsFeed"
            >
              {{ $t('home.login') }}
            </router-link>
            <div class="relative">
              <teleport to="body">
                <router-view />
              </teleport>
            </div>
          </div>
        </nav>
      </div>
      <div class="flex flex-col mt-8 sm:mt-56 w-fit mx-auto">
        <h1 class="text-[24px] mt-10 sm:text-[60px] text-center text-primary">
          Find any quote in <br />
          millions of movie lines
        </h1>
        <button
          class="py-2 w-52 mt-10 sm:py-3 px-4 sm:px-6 bg-red-700 text-white rounded-md sm:w-40 flex items-center justify-center mx-auto"
          @click="navigateToLogin"
        >
          {{ $t('home.get_started') }}
        </button>
      </div>
    </div>
    <section class="relative">
      <img src="@/assets/images/interstelar.png" alt="" class="shadow-inner mx-auto" />
      <!-- <img
        src="@/assets/images/int_quote.png"
        alt=""
        class="absolute top-20 sm:top-80 left-2 sm:left-20 inset-0 flex items-center justify-center"
      /> -->
    </section>
    <section class="relative">
      <img src="@/assets/images/movie.png" alt="" class="shadow-inner mx-auto" />
      <!-- <img
        src="@/assets/images/quote.png"
        alt=""
        class="absolute top-20 sm:top-80 left-2 sm:left-60 inset-0 flex items-center justify-center"
      /> -->
    </section>
    <section>
      <img src="@/assets/images/lotr.png" alt="" class="shadow-inner mx-auto" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import RegisterModal from '../components/modals/auth/RegisterModal.vue'
const router = useRouter()
const authStore = useAuthStore()

const isLoginModalOpen = ref(false)
const registerModal = ref(null)
const isRegisterModalOpen = ref(false)

const navigateToLogin = () => {
  isLoginModalOpen.value = true
  router.push('/login')
  if (authStore.isUserAuthenticated === true) {
    router.push({ name: 'news-feed' })
  }
}
const navigateToNewsFeed = () => {
  if (authStore.isUserAuthenticated === true) {
    router.push({ name: 'news-feed' })
  }
}
// const naviageToRegister = () => {
//   isRegisterModalOpen.value = true
//   router.push('/register')
// }

onClickOutside(registerModal, () => {
  isRegisterModalOpen.value = false
  router.push('/')
})
</script>

<style></style>
