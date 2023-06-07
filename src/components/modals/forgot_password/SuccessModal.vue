<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col p-6 md:px-32 lg:p-36 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-6"
        >
          <img src="@/assets/images/success.png" alt="" class="mt-10" />
          <h1 class="text-2xl md:text-4xl">Success!</h1>
          <p class="text-sm md:text-base text-center mt-4 md:mt-6">
            Your password changed successfully
          </p>
          <router-link
            :to="{ name: 'login' }"
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-8 md:mt-12"
          >
            Log in
          </router-link>
        </div>
      </div>
    </teleport>
  </div>
</template>
