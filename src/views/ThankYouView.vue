<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col px-6 pt-6 pb-12 md:px-32 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <img src="@/assets/images/send.png" alt="" class="mt-10" />
          <h1 class="text-3xl md:text-4xl text-center">{{ $t('register.thanks') }}</h1>
          <p class="text-md text-center mt-6">{{ $t('register.activation') }}</p>
          <router-link
            :to="{ name: 'login' }"
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
          >
            {{ $t('register.go_to_email') }}
          </router-link>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script></script>
