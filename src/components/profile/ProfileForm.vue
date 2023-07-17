<template>
  <Form class="w-full flex flex-col mt-6" enctype="multipart/form-data" v-if="props.user">
    <label for="username" class="mt-16 lg:mt-10">{{ $t('profile.username') }}</label>
    <div class="flex space-x-3">
      <div
        class="py-3 px-2 rounded mt-2 bg-transparent outline-0 w-full text-black font-normal placeholder-white lg:bg-field"
      >
        <p class="text-white lg:text-black">{{ user.name }}</p>
      </div>
      <button type="button" @click="editUsername = !editUsername" class="hidden lg:block">
        Edit
      </button>
      <router-link
        :to="{ name: 'edit-username' }"
        class="block lg:hidden"
        type="button"
        @click="editUsername = !editUsername"
        >Edit</router-link
      >
    </div>
    <router-view></router-view>
    <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>
    <div v-if="editUsername" class="hidden sm:flex flex-col">
      <label for="new_username" class="mt-6">{{ $t('profile.new_username') }}</label>
      <Field
        type="text"
        name="new_username"
        class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
        :placeholder="$t('profile.new_username')"
        :value="props.new_username"
        @input="$emit('update:new_username', $event.target.value)"
      >
      </Field>
      <ErrorMessage name="new_username" class="text-red-600" />
    </div>

    <label for="profile_email" class="mt-6">{{ $t('login.email') }}</label>
    <div class="flex space-x-3">
      <div
        class="py-3 px-2 rounded mt-2 bg-transparent outline-0 w-[465px] text-black font-normal placeholder-white lg:bg-field"
      >
        <p class="text-white lg:text-black">{{ user.email }}</p>
      </div>
      <button
        v-if="shouldUpdate"
        type="button"
        @click="editEmail = !editEmail"
        class="hidden lg:block"
      >
        Edit
      </button>

      <router-link
        :to="{ name: 'edit-email' }"
        class="block lg:hidden"
        type="button"
        v-if="shouldUpdate"
        >Edit</router-link
      >
    </div>

    <router-view></router-view>
    <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>

    <div v-if="editEmail" class="hidden sm:flex flex-col">
      <label for="new_email" class="mt-6">{{ $t('profile.new_email') }}</label>
      <Field
        type="text"
        name="new_email"
        class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
        :placeholder="$t('profile.new_email')"
        :value="props.new_email"
        @input="$emit('update:new_email', $event.target.value)"
      >
      </Field>
      <ErrorMessage name="new_email" class="text-red-600" />
    </div>

    <label S class="mt-6">{{ $t('login.password') }}</label>
    <div class="flex space-x-3 items-center">
      <div
        class="py-6 px-2 rounded mt-2 bg-transparent outline-0 w-[465px] text-black font-normal  placeholder-white lg:bg-field"
      >
        <p class="text-white lg:text-black"></p>
      </div>
      <div
        type="button"
        @click="editPassword = !editPassword"
        v-if="shouldUpdate"
        class="cursor-pointer"
      >
        Edit
      </div>
    </div>
    <div class="block h-[1px] bg-gray-400 mt-2 lg:hidden"></div>

    <div v-if="editPassword" class="grid">
      <div class="border border-gray-600 px-6 py-7 mt-10 w-fit lg:w-[466px]">
        <p>{{ $t('profile.password_contain') }}</p>
        <div class="flex items-center space-x-3 mt-4">
          <div class="rounded-full w-1 h-1 bg-gray-300"></div>
          <p class="text-gray-300 text-sm">{{ $t('profile.characters') }}</p>
        </div>
        <div class="flex items-center space-x-3 mt-2">
          <div class="rounded-full w-1 h-1 bg-green-600"></div>
          <p class="text-gray-300 text-sm">{{ $t('profile.lowercase') }}</p>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="new_password" class="mt-6">{{ $t('profile.new_password') }}</label>
        <div class="relative">
          <Field
            v-bind:type="showPassword ? 'text' : 'password'"
            name="new_password"
            class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
            :placeholder="$t('profile.new_password')"
            :value="props.profile_password"
            @input="$emit('update:profile_password', $event.target.value)"
            rules="required"
          >
          </Field>
          <IconShowPassword class="absolute right-14 top-6" @click="showPassword = !showPassword" />
        </div>

        <ErrorMessage name="new_password" class="text-red-600" />
      </div>
      <div class="flex flex-col">
        <label for="confirm_new_password" class="mt-6">{{
          $t('profile.confirm_new_password')
        }}</label>
        <div class="relative">
          <Field
            v-bind:type="showPassword ? 'text' : 'password'"
            name="confirm_new_password"
            class="py-3 px-2 rounded mt-2 w-fit text-white bg-transparent outline-0 lg:w-[466px] lg:text-black font-normal lg:bg-field placeholder-gray-400"
            :placeholder="$t('profile.confirm_new_password')"
            rules="required"
          >
          </Field>
          <IconShowPassword class="absolute right-14 top-6" @click="showPassword = !showPassword" />
        </div>

        <ErrorMessage name="confirm_new_password" class="text-red-600" />
      </div>
    </div>
  </Form>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

import { ref } from 'vue'

import IconShowPassword from '@/components/icons/IconShowPassword.vue'

const showPassword = ref(false)
const editUsername = ref(props.edit_username)
const editEmail = ref(props.edit_email)
const editPassword = ref(props.edit_password)
const shouldUpdate = localStorage.getItem('isGoogleAuthenticated') === 'true' ? false : true
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  edit_email: {
    type: Boolean,
    required: true
  },
  edit_password: {
    type: Boolean,
    required: true
  },
  edit_username: {
    type: Boolean,
    required: true
  },
  new_username: {
    type: String,
    required: true
  },
  new_email: {
    type: String,
    required: true
  },
  profile_password: {
    type: String,
    required: true
  }
})
</script>
<style>
.custom-file-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: none;
  background: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}
</style>
