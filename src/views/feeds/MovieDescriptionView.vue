<template>
  <div>
    <BaseHeader />
    <div class="bg-[#181624] min-h-screen">
      <div class="flex">
        <BaseSidebar />
        <div class="p-20 px-32">
          <div class="text-2xl">Movie description</div>
          <div v-if="movie" class="w-full mb-8 mt-10">
            <div class="flex space-x-12 w-full">
              <img
                :src="getImages(movie.poster)"
                alt=""
                class="w-form object-cover object-center bg-contain rounded-md"
              />
              <div>
                <div class="flex flex-col">
                  <div class="flex space-x-4 mr-auto mb-10 mt-4 text-[#DDCCAA]">
                    <div class="flex space-x-80 items-center">
                      <div class="flex space-x-2 text-xl">
                        <h1 class="uppercase">{{ movie.title.en }}</h1>
                        <p class="">({{ movie.release_date }})</p>
                      </div>
                      <div class="flex space-x-6 bg-headerBg p-4 px-7 rounded-2xl cursor-pointer">
                        <IconEdit />
                        <div class="w-[1px] bg-gray-400"></div>
                        <IconTrash />
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-4 text-lg">
                    <p class="text-gray-400">Genre:</p>
                    <p class="text-white">{{ movie.genre }}</p>
                  </div>
                  <div class="flex space-x-4 text-lg mt-6">
                    <p class="text-gray-400">Director:</p>
                    <p class="text-white">{{ movie.director.en }} minutes</p>
                  </div>
                  <p class="mt-10">{{ movie.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AxiosInstance from '@/config/axios/index'
import BaseSidebar from '@/components/layout/BaseSidebar.vue'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const movie = ref(null)
const router = useRouter()

onMounted(() => {
  const movieId = router.currentRoute.value.params.id
  AxiosInstance.get(`/api/movies/${movieId}`)
    .then((response) => {
      movie.value = response.data.movie
    })
    .catch((error) => {
      console.error(error)
    })
})

const getImages = (poster) => {
  return `http://localhost:8000/storage/${poster}`
}
</script>
