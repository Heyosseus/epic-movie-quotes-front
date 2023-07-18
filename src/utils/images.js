export const getImages = (poster) => {
  const backendStorageURL = import.meta.env.VITE_PUBLIC_BACKEND_STORAGE_URL
  return `${backendStorageURL}/${poster}`
}
