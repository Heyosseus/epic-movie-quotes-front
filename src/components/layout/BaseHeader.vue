<template>
  <div
    class="bg-headerBg h-full flex flex-col sm:flex-row justify-between z-0 items-center px-6 sm:px-14 py-3 sm:py-5"
  >
    <router-link
      :to="{ name: 'home' }"
      class="hidden sm:block text-[#DDCCAA] uppercase cursor-pointer"
    >
      movie quotes
    </router-link>
    <div class="flex items-center justify-between w-full sm:w-64 sm:mt-0">
      <IconMenu class="block cursor-pointer sm:hidden" @click="show = true" />
      <div v-if="show"><MenuSidebar /></div>

      <router-link :to="{ name: 'menu' }"></router-link>
      <div class="flex items-center sm:justify-between sm:w-80">
        <router-link :to="{ name: 'search' }">
          <IconSearch class="mt-2 w-14 lg:hidden"
        /></router-link>
        <div>
          <div class="relative cursor-pointer" @click="showNotifications = !showNotifications">
            <IconNotification class="mt-2 ml-2 w-6 lg:w-10 relative z-0" />
            <div
              class="absolute top-0 right-0 rounded-full bg-red-600 text-[10px] px-1 lg:text-sm lg:px-1.5"
            >
              {{ unread.length ?? 0 }}
            </div>
          </div>
          <div
            v-if="showNotifications"
            class="absolute bg-black block z-0 sm:hidden lg:block w-9 h-7 lg:w-12 lg:h-12 rotate-45 top-16 right-4 lg:top-20 lg:right-60"
          ></div>

          <div
            class="bg-transparentLandingBg w-full h-[92.8vh] absolute top-20 left-0 z-0"
            v-if="showNotifications"
          ></div>
          <div
            v-if="showNotifications"
            class="w-full right-0 h-screen top-16 bg-black lg:w-notification absolute lg:top-20 lg:right-[100px] px-6 py-10 max-h-[791px] overflow-y-auto cursor-pointer rounded-md z-50"
            ref="modalRef"
          >
            <div class="flex items-center justify-between">
              <h1 class="text-lg lg:text-2xl">{{ $t('base.notifications') }}</h1>
              <p class="text-sm underline z-10" @click="markAllAsRead">
                {{ $t('base.mark_all_as_read') }}
              </p>
            </div>
            <div v-if="notification.length > 0">
              <div
                v-for="notifications in notification"
                :key="notifications.id"
                class="mt-4 hover:bg-gray-900"
              >
                <div
                  class="flex items-center space-x-5 border border-gray-700 rounded p-4 lg:p-6"
                  @click="markAsRead(notifications.id)"
                >
                  <div
                    :class="[
                      'object-fit',
                      'w-24',
                      'rounded-full',
                      {
                        'border-4': notifications.read !== 1,
                        'border-green-700': notifications.read !== 1
                      }
                    ]"
                  >
                    <img
                      v-if="notifications.profile_picture || notifications.user?.profile_picture"
                      :src="
                        getImages(
                          notifications.profile_picture || notifications.user?.profile_picture
                        )
                      "
                      alt=""
                      class="object-fit w-20 rounded-full"
                    />
                    <img
                      v-else
                      src="@/assets/images/default_picture.jpg"
                      alt="profile"
                      class="object-fit w-20 rounded-full"
                    />
                  </div>
                  <div v-if="notifications" class="w-full">
                    <span>{{ notifications.from }}</span>
                    <div
                      class="flex flex-col lg:items-center lg:flex lg:flex-row lg:w-full space-y-0.5"
                    >
                      <div
                        v-if="notifications.type === 'comment'"
                        class="flex items-center w-full space-x-2 mt-0 lg:mt-4"
                      >
                        <IconComment class="w-5 lg:w-7" />
                        <p class="text-[11px] lg:text-lg">{{ $t('base.comment') }}</p>
                      </div>
                      <div
                        v-if="notifications.type === 'like'"
                        class="flex items-center w-full space-x-2 mt-0 lg:mt-4"
                      >
                        <IconHeart class="w-5 lg:w-7" />
                        <p class="text-[11px] lg:text-lg">{{ $t('base.react') }}</p>
                      </div>
                      <div class="text-[10px] lg:text-sm w-40">
                        {{ formatTimeAgo(notifications.created_at) }}
                        <div v-if="notifications.read !== 1" class="text-green-700">
                          {{ $t('base.new') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="flex justify-center items-center mx-auto mt-10 text-lg">
              {{ $t('base.no_notifications') }}
            </p>
          </div>
        </div>
        <select
          name=""
          id=""
          class="hidden bg-transparent w-16 outline-0 ml-4 sm:ml-0 mt-4 sm:mt-0 sm:block cursor-pointer"
          v-model="$i18n.locale"
        >
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
            class="bg-black"
          >
            {{ locale === 'en' ? 'Eng' : 'ქარ' }}
          </option>
          {{
            $i18n.locale === 'en' ? setLocale('en') : setLocale('ka')
          }}
        </select>

        <button
          class="hidden sm:flex border border-white rounded-md px-2 py-2 ml-4 sm:ml-0 mt-2 sm:mt-0 sm:px-4 sm:py-3 text-[11px]"
          @click="logout"
        >
          {{ $t('base.logout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconNotification from '@/components/icons/IconNotification.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconComment from '@/components/icons/IconComment.vue'
import { getImages } from '@/utils/images'
import { formatTimeAgo } from '@/utils/date'
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { setLocale } from '@vee-validate/i18n'
import { onClickOutside } from '@vueuse/core'
import { useAuthUser } from '@/stores/user'
import API from '@/services/api'
import MenuSidebar from '../modals/MenuSidebar.vue'
import instantiatePusher from '@/config/helpers/instantiatePusher'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const authUserStore = useAuthUser()
const authStore = useAuthStore()
const show = ref(false)
const showNotifications = ref(false)
const user = ref(null)
const notification = ref([])
const modalRef = ref(null)

const router = useRouter()

onClickOutside(modalRef, () => {
  showNotifications.value = false
})
const unread = computed(() => {
  if (notification.value.length === 0) {
    return []
  }
  return notification.value.filter((notification) => notification.read === 0)
})

const markAsRead = async (notificationId) => {
  notificationStore.markAsRead(notificationId)
  const updatedNotification = notification.value.find(
    (notification) => notification.id === notificationId
  )
  if (updatedNotification) {
    updatedNotification.read = 1
    unread.value = unread.value - 1
    console.log(updatedNotification, unread.value)
  }

  await API.markNotificationAsRead(notificationId)
}

const markAllAsRead = async () => {
  notificationStore.markAllNotificationsAsRead()
  notification.value.forEach((notification) => {
    notification.read = 1
  })

  await API.markAllNotificationsAsRead()
}
const logout = () => {
  API.logout().then(() => {
    router.push({ name: 'home' })
    authStore.setIsUserAuthenticated(false)
    authStore.setIsGoogleAuthenticated(false)
  })
}

onMounted(async () => {
  try {
    await authUserStore.setAuthUser()
    user.value = authUserStore.authUser

    instantiatePusher()

    await window.Echo.private(`notification-received.${user.value.id}`).listen(
      'NotificationReceived',
      (data) => {
        notification.value.push(data.notification)
        unread.value.push(data.notification)
      }
    )

    fetchNotifications()
  } catch (error) {
    console.log(error.response)
  }
})

const fetchNotifications = () => {
  API.notifications().then((response) => {
    notification.value = response.data
    unread.value = notification.value.filter((notification) => notification.read === 0)
  })
}

API.checkSession().then((response) => {
  const isSessionActive = response.data.isSessionActive
  const isGoogleAuthenticated = response.data.isGoogleAuthenticated

  if (isSessionActive || isGoogleAuthenticated) {
    authStore.setIsUserAuthenticated(true)
  } else {
    authStore.setIsUserAuthenticated(false)
    router.push({ name: 'session-expired' })
  }
})
</script>
