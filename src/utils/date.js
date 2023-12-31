import { useLocaleStore } from '@/stores/locale'

export const formatTimeAgo = (timestamp) => {
  const localeStore = useLocaleStore()

  const appLocale = localeStore.getLocale

  const currentTime = Date.now()
  const timeDifference = currentTime - new Date(timestamp)
  const minuteDifference = Math.floor(timeDifference / 1000 / 60)
  const hourDifference = Math.floor(minuteDifference / 60)
  const dayDifference = Math.floor(hourDifference / 24)

  if (appLocale === 'en') {
    if (minuteDifference < 1) {
      return 'Just now'
    } else if (minuteDifference < 60) {
      return `${minuteDifference} minutes ago`
    } else if (hourDifference < 24) {
      return `${hourDifference} hours ago`
    } else if (dayDifference < 7) {
      return `${dayDifference} days ago`
    } else {
      return timestamp
    }
  } else {
    if (minuteDifference < 1) {
      return 'ახლა'
    } else if (minuteDifference < 60) {
      return `${minuteDifference} წუთის წინ`
    } else if (hourDifference < 24) {
      return `${hourDifference} საათის წინ`
    } else if (dayDifference < 7) {
      return `${dayDifference} დღის წინ`
    } else {
      return timestamp
    }
  }
}
