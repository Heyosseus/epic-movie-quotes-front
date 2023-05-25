<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col p-10 px-36 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-10"
        >
          <img src="@/assets/images/send.png" alt="" class="mt-10" />
          <h1 class="text-4xl">Check your email</h1>
          <p class="text-md text-center mt-6">
            We have sent a password recover instructions <br />
            to your email
          </p>

          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-12"
          >
            Go to my email
          </a>

          <div class="flex items-center justify-center space-x-4">
            <p class="text-[#6C757D]">Skip, I'll confirm later</p>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup></script>
