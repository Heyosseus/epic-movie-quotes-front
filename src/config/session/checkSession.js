import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
const router = useRouter()


const authStore = useAuthStore()

export const checkSession = AxiosInstance.get('/api/check-session').then((response) => {
  const isSessionActive = response.data.isSessionActive
  console.log(isSessionActive)
  if (isSessionActive) {
    authStore.setIsUserAuthenticated(true)
  } else {
    authStore.setIsUserAuthenticated(false)
    router.push({ name: 'forbidden' })
  }
})
