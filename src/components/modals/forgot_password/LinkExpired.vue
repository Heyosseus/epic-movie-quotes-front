<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col p-6 md:px-32 lg:p-36 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-8"
        >
          <img src="@/assets/images/expired.png" alt="" class="mt-10" />
          <h1 class="text-2xl md:text-4xl">Link expired!</h1>
          <p class="text-base md:text-lg text-center mt-4 md:mt-6">
            Login link has expired because you haven’t used it
          </p>
          <button
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-8 md:mt-12"
          >
            Request another link
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>
