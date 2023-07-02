<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen min-h-full flex flex-col justify-center items-center bg-transparentLandingBg"
      >
        <div
          class="flex flex-col w-full px-6 py-10 md:px-20 md:pt-6 md:pb-16 rounded-md items-center mx-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <div class="flex flex-col w-full">
            <label for="new_username" class="mt-6">{{ $t('profile.enter_new_username') }}</label>
            <Field
              type="text"
              name="new_username"
              class="py-3 px-2 rounded mt-2 w-full text-black bg-gray-200 outline-0 lg:text-black font-normal lg:bg-field placeholder-gray-400"
              :placeholder="$t('profile.new_username')"
              rules="required"
              v-model="username"
            >
            </Field>
            <ErrorMessage name="new_username" class="text-red-600" />
          </div>
        </div>

        <div class="flex justify-between px-4 w-full items-center mt-6">
          <router-link to="/profile" class="bg-transparent">{{ $t('profile.cancel') }}</router-link>

          <router-link :to="{ name: 'are-you-sure' }" class="bg-red-700 py-3 px-4 rounded">
            {{ $t('profile.save') }}
          </router-link>
          <router-view :username="username" @update:username="username = $event"></router-view>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const username = ref('')
</script>
