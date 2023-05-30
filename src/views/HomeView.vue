<template>
  <div class="flex flex-col justify-between min-h-screen px-36 pt-6 mx-auto bg-slate-950">
    <div class="bg-landingBg px-8 py-4 h-[72vh]">
      <div>
        <nav class="flex justify-between">
          <h1 class="uppercase text-primary font-extrabold text-lg">movie quotes</h1>
          <div class="flex justify-between w-80">
            <select name="" id="" class="bg-transparent w-14">
              <option value="" class="">Eng</option>
              <option value="">Ka</option>
            </select>
            <button class="py-2 px-6 bg-red-700 text-white rounded-md" @click="naviageToRegister">
              Sign up
            </button>
            <div class="relative">
              <teleport to="body">
                <router-view />
              </teleport>
            </div>
            <button
              class="py-2 px-6 bg-transparent border border-white rounded-md"
              @click="navigateToLogin"
            >
              Log in
            </button>
            <div class="relative">
              <teleport to="body">
                <router-view />
              </teleport>
            </div>
          </div>
        </nav>
      </div>
      <div class="flex flex-col mt-56 w-fit mx-auto">
        <h1 class="text-[60px] text-center text-primary">
          Find any quote in <br />
          millions of movie lines
        </h1>
        <button
          class="py-3 px-6 bg-red-700 text-white rounded-md w-40 flex items-center justify-center mx-auto mt-4"
          @click="navigateToLogin"
        >
          Get started
        </button>
      </div>
    </div>
    <section class="relative">
      <img src="@/assets/images/interstelar.png" alt="" class="shadow-inner" />
      <img
        src="@/assets/images/int_quote.png"
        alt=""
        class="absolute top-80 left-20 inset-0 flex items-center justify-center"
      />
    </section>
    <section class="relative">
      <img src="@/assets/images/movie.png" alt="" />
      <img
        src="@/assets/images/quote.png"
        alt=""
        class="absolute top-80 left-20 inset-0 flex items-center justify-center"
      />
    </section>
    <section>
      <img src="@/assets/images/lotr.png" alt="" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  isLoginModalOpen.value = true
  router.push('/login')
}

const naviageToRegister = () => {
  isRegisterModalOpen.value = true
  router.push('/register')
}

const modalRef = ref(null)

const isLoginModalOpen = ref(false)
const registerModal = ref(null)
const isRegisterModalOpen = ref(false)

onClickOutside(modalRef, () => {
  isLoginModalOpen.value = false
  router.push('/')
})

onClickOutside(registerModal, () => {
  isRegisterModalOpen.value = false
  router.push('/')
})
</script>

<style></style>
