<template>
  <div class="relative">
    <teleport to="body">
      <Form
        class="absolute w-screen min-h-full flex flex-col justify-center items-center bg-transparentLandingBg"
      >
        <div
          class="flex flex-col w-full px-6 py-10 md:px-20 md:pt-6 md:pb-16 rounded-md items-center mx-auto bg-modal space-y-4"
          ref="modalRef"
        >
          <div class="flex flex-col w-full">
            <label for="enter_new_email" class="mt-6">{{ $t('profile.enter_new_email') }}</label>
            <Field
              type="email"
              name="enter_new_email"
              class="py-3 px-2 rounded mt-2 w-full text-black bg-gray-200 outline-0 lg:text-black font-normal lg:bg-field placeholder-gray-400"
              :placeholder="$t('profile.enter_new_email')"
              rules="required|email"
              v-model="email"
            >
            </Field>
            <ErrorMessage name="new_username" class="text-red-600" />
          </div>
        </div>

        <div class="flex justify-between px-4 w-full items-center mt-6">
          <router-link to="/profile" class="bg-transparent">{{ $t('profile.cancel') }}</router-link>

          <router-link
           to="/email-update"
            class="bg-red-700 py-3 px-4 rounded"
          >
            {{ $t('profile.save') }}
          </router-link>
          <router-view :email="email" @update:email="email = $event"></router-view>
        </div>
      </Form>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const email = ref('')
</script>
