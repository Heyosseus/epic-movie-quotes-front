<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col px-32 pt-6 pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <img src="@/assets/images/success.png" alt="" class="mt-10" />
          <h1 class="text-4xl">Success!</h1>
          <p class="text-sm text-center mt-6">Your password changed successfully</p>
          <button
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-96 items-center justify-center mx-auto mt-12 "
            @click="goToLogin"
          >
            Log in
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToLogin = () => {
  router.push({name: 'login'});
};
</script>