export const getImages = (poster) => {
  const backendStorageURL = import.meta.env.VITE_PUBLIC_BACKEND_STORAGE_URL
  return `${backendStorageURL}/${poster}`
}

export const formatTimeAgo = (timestamp) => {
  const currentTime = Date.now()
  const timeDifference = currentTime - new Date(timestamp)
  const minuteDifference = Math.floor(timeDifference / 1000 / 60)
  const hourDifference = Math.floor(minuteDifference / 60)
  const dayDifference = Math.floor(hourDifference / 24)

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
}
