<template>
  <div>
    <BaseHeader />
    <div class="bg-home min-h-full">
      <div
        class="flex bg-headerBg flex-col lg:bg-transparent items-center lg:flex lg:flex-row lg:items-start"
      >
        <BaseSidebar />
        <div class="py-4 px-0 w-full lg:py-12 lg:px-20 lg:w-profile flex flex-col">
          <p class="hidden bg-home lg:block text-xl">{{ $t('profile.profile') }}</p>
          <router-link :to="{ name: 'news-feed' }" class="block bg-home py-6 px-8 w-full lg:hidden"
            ><IconArrowBack
          /></router-link>
          <div class="relative"></div>
          <div
            class="w-full px-8 py-10 lg:bg-movie lg:w-[800px] lg:px-36 lg:py-20 flex flex-col mt-20 ml-auto"
          >
            <div v-if="user" class="absolute top-36 lg:top-40">
              <img
                :src="getImages(user.profile_picture)"
                alt=""
                v-if="user.profile_picture"
                class="object-contain w-40 ml-20 mt-4 lg:ml-44 rounded-full"
              />
              <div v-else>
                <img
                  src="@/assets/images/default_picture.jpg"
                  alt=""
                  class="object-contain w-40 ml-20 mt-4 lg:ml-44 rounded-full"
                />
              </div>
            </div>

            <label for="fileInput" class="relative py-2 text-white rounded cursor-pointer">
              <span class="flex justify-center mt-20 text-lg lg:mt-4">{{
                $t('profile.upload')
              }}</span>
              <Field
                name="fileInput"
                id="fileInput"
                type="file"
                class="w-full absolute top-0 left-0 lg:w-full h-full opacity-0 cursor-pointer"
                v-model="picture"
              />
            </label>
            <ProfileForm
              :user="user"
              :edit_username="editUsername"
              :edit_email="editEmail"
              :edit_password="editPassword"
              :new_username="new_username"
              :new_email="new_email"
              :profile_password="profile_password"
              @update:new_username="new_username = $event"
              @update:new_email="new_email = $event"
              @update:profile_password="profile_password = $event"
            />
          </div>

          <div class="space-x-4 ml-auto mt-10">
            <router-link to="/news-feed" class="bg-transparent">{{
              $t('profile.cancel')
            }}</router-link>

            <button class="bg-red-700 py-3 px-4 rounded" @click="updateProfile">
              {{ $t('profile.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Field } from 'vee-validate'
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import ProfileForm from '@/components/profile/ProfileForm.vue'
import { getImages } from '@/utils/images'
import API from '@/services/api'

const user = ref(null)
const editUsername = ref(false)
const editEmail = ref(false)
const editPassword = ref(false)
const router = useRouter()
const picture = ref(null)

const new_username = ref(null)
const new_email = ref(null)
const profile_password = ref(null)

const updateProfile = () => {
  const formData = new FormData()
  formData.append('profile_picture', picture.value || user.value.profile_picture)
  formData.append('name', new_username.value || user.value.name)
  formData.append('email', new_email.value || user.value.email)
  formData.append('password', profile_password.value)

  AxiosInstance.post(`/api/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    console.log(res.data.prpfile_picture)
    if (new_email.value === null) {
      router.push({ name: 'flash-messages' })
    } else {
      router.push({ name: 'reset-password' })
    }
  })
}

onMounted(() => {
  API.user().then((res) => {
    user.value = res.data
  })
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
