<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen min-h-screen flex items-center bg-transparentLandingBg lg:bg-none "
      >
        <div
          class="bg-green-200 p-5 items-center justify-between flex w-full lg:w-flash lg:right-20 lg:rounded absolute top-20 lg:top-24"
          ref="modalRef"
        >
          <div class="flex">
            <IconSuccess />
            <p class="text-green-700 ml-2">{{ $t('profile.flash_message') }}</p>
          </div>

          <IconClose class="text-black" />
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import IconSuccess from '@/components/icons/IconSuccess.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const router = useRouter()
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  router.push({ name: 'profile' })
})
</script>
