<template>
  <div class="w-80">
    <div class="flex flex-col">
      <div class="flex space-x-12 items-center mr-auto mb-10 mt-4 text-[#DDCCAA]">
        <div class="flex space-x-2 text-xl">
          <h1 class="uppercase">
            {{ $i18n.locale === 'en' ? props.movie.title.en : props.movie.title.ka }}
          </h1>
          <p class="">({{ props.movie.release_date }})</p>
        </div>
        <div class="hidden sm:flex space-x-6 bg-headerBg p-4 px-7 rounded-2xl cursor-pointer">
          <router-link :to="{ name: 'update-movie' }">
            <IconEdit />
          </router-link>
          <div class="w-[1px] bg-gray-400"></div>
          <IconTrash @click="handle_movie_delete" />
        </div>
      </div>
      <div class="flex space-x-4 text-lg cursor-pointer">
        <div
          v-for="genre in props.movie.genres"
          :key="genre.id"
          class="text-white bg-genre py-1 px-3 rounded"
        >
          {{ $i18n.locale === 'en' ? JSON.parse(genre.name).en : JSON.parse(genre.name).ka }}
        </div>
      </div>
      <div class="flex space-x-4 text-lg mt-6">
        <p class="text-gray-400">{{ $t('movie.director') }}</p>
        <p class="text-white">{{ JSON.parse(props.movie.director).en }}</p>
      </div>
      <p class="mt-10 break-words w-form">{{ JSON.parse(props.movie.description).en }}</p>
    </div>
  </div>
</template>
<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  handle_movie_delete: {
    type: Function,
    required: true
  }
})
</script>
