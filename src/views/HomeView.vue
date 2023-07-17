<template>
  <div
    class="flex flex-col justify-between min-h-screen sm:px-6 md:px-8 lg:pt-6 mx-auto bg-slate-950"
    id="home"
  >
    <div class="bg-landingBg px-4 sm:px-8 py-4 sm:py-8 md:py-4 lg:h-[72vh] h-[60vh]">
      <div>
        <nav class="flex justify-between items-center">
          <h1 class="text-[12px] uppercase text-primary font-extrabold lg:text-lg">
            {{ $t('home.title') }}
          </h1>
          <div class="flex justify-between w-56 sm:w-80">
            <select
              name=""
              id=""
              class="bg-transparent w-16 sm:w-14 outline-0"
              v-model="$i18n.locale"
            >
              <option
                v-for="locale in $i18n.availableLocales"
                :key="`locale-${locale}`"
                :value="locale"
                class="bg-black"
              >
                {{ locale === 'en' ? 'Eng' : 'ქარ' }}
              </option>
            </select>
            <router-link
              :to="{ name: 'register' }"
              class="py-2 px-3 md:text-sm text-[11px] sm:px-6 bg-red-700 text-white rounded-md"
            >
              {{ $t('home.signup') }}
            </router-link>

            <router-link
              :to="{ name: 'login' }"
              class="py-2 px-3 ml-1 md:text-sm text-[11px] sm:px-6 bg-transparent border border-white rounded-md"
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
        <h1 class="text-[24px] mt-16 lg:mt-10 sm:text-[60px] text-center text-primary">
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
    <div
      class="relative cursor-pointer mt-28 bg-zinc-950 lg:mt-0"
      id="interstellar"
      @click="show = !show"
      :class="{ active: show }"
    >
      <transition name="fade-in" key="interstellar" appear>
        <img
          src="@/assets/images/interstelar.png"
          alt=""
          class="shadow-inner mx-auto brightness-90"
          @click="show.valueOf(true) ? scrollPage('#interstellar') : scrollPage('#royal')"
        />
      </transition>
      <div
        class="absolute top-10 text-md lg:text-4xl w-fit lg:w-form sm:top-80 left-2 sm:left-40 inset-0"
      >
        <p>You have to leave something behind to go forward</p>
        <p class="text-lg lg:text-2xl mt-10">- interstellar, 2014</p>
      </div>
    </div>
    <section class="relative cursor-pointer bg-zinc-950" id="royal" :class="{ active: show }">
      <transition name="fade-in" key="royal" appear>
        <img
          src="@/assets/images/movie.png"
          alt=""
          class="mx-auto brightness-50 shadow-2xl sticky"
          @click="scrollPage('#lotr')"
        />
      </transition>
      <div
        class="absolute top-10 w-fit lg:w-form text-md lg:text-4xl sm:top-80 left-2 sm:left-40 inset-0"
      >
        <p>
          I think we’re just gonna have to be secretly in love with each other and leave it that
        </p>
        <p class="text-md lg:text-2xl mt-10">- The Royal Tenenbaums,2001</p>
      </div>
    </section>
    <section class="relative cursor-pointer bg-zinc-950" id="lotr" :class="{ active: show }">
      <transition name="fade-in" key="lotr" appear>
        <img
          src="@/assets/images/lotr.png"
          alt=""
          class="mx-auto brightness-75"
          @click="scrollPage('#home')"
        />
      </transition>
      <div
        class="absolute top-10 w-fit text-md lg:w-form lg:text-4xl sm:top-[70vh] left-2 sm:left-40 inset-0"
      >
        <p>All We Have to Decide Is What to Do with the Time That Is Given to Us.</p>
        <p class="text-md lg:text-2xl mt-10">- The lord of the rings,2001</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
const router = useRouter()
const authStore = useAuthStore()

const show = ref(true)

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

onClickOutside(registerModal, () => {
  isRegisterModalOpen.value = false
  router.push('/')
})

const scrollPage = (section) => {
  const element = document.querySelector(section)
  const offsetTop = element.offsetTop
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  })
}
</script>

<style>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: transform 1s ease, opacity 1s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  transform: translateY(-5%);
  opacity: 0;
}

.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 0.8;
}

.active {
  position: sticky;
  top: 0;
  z-index: 0;
  animation: scrollAnimation 1.5s ease-in-out;
}
@keyframes scrollAnimation {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
