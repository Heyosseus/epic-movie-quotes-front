<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-landingBg"
      >
        <div
          class="flex flex-col px-32 pt-6 pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-12"
        >
          <img src="@/assets/images/expired.png" alt="" class="mt-10" />

          <h1 class="text-4xl">Link expired!</h1>
          <p class="text-md text-center mt-6">
            Login link has expired, because you haven’t used it
          </p>
          <button
            class="py-3 px-6 bg-red-700 text-white rounded-md flex w-96 items-center justify-center mx-auto mt-12"
          >
            Request another link
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>
