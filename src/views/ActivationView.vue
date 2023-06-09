<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col px-6 pt-6 pb-12 md:px-16 md:pt-6 md:pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <img src="@/assets/images/send.png" alt="" class="mt-10" />
          <h1 class="text-2xl md:text-3xl text-center">Thank you!</h1>
          <p class="text-sm md:text-base text-center mt-6">
            Please check your email and follow the instructions to <br/> activate your account. Go to my
            email
          </p>
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
          >
            Go to my email
          </a>
        </div>
      </div>
    </teleport>
  </div>
</template>
