<template>
  <div>
    <div class="flex items-center lg:space-x-12 mt-6">
      <h1 v-if="props.quote" class="hidden sm:block text-sm lg:text-xl">
        {{ $t('base.total') }}({{ props.quote.length }})
      </h1>
      <h1 v-else class="hidden sm:block text-xl">{{ $t('base.no_quotes') }}</h1>
      <div
        class="px-2 py-2 bg-red-600 sm:w-48 sm:text-lg sm:bg-red-600 md:px-4 md:py-3 rounded flex items-center space-x-2"
      >
        <IconAddMovie />
        <button class="w-36 lg:w-52" v-if="props.movie">
          <router-link :to="{ name: 'add-quote', params: { id: movie.id } }">{{
            $t('base.add_quote')
          }}</router-link>
        </button>
        <router-view />
      </div>
    </div>
    <div v-if="props.quote" class="lg:w-form mt-8">
      <div class="w-full lg:w-[900px] relative">
        <div
          v-for="quote in props.quote"
          :key="quote.id"
          class="space-y-6 mt-16 bg-movie px-6 py-8 w-full lg:w-[800px] rounded-xl relative"
        >
          <div class="grid lg:flex items-center space-x-2 break-words relative w-fit lg:w-full">
            <router-link :to="{ name: 'view-quote', params: { movie_id: movie.id, id: quote.id } }">
              <img
                :src="getImages(quote.thumbnail)"
                alt=""
                class="w-full lg:w-44 h-thumbnailHeight object-contain rounded-md"
              />
            </router-link>

            <p class="italic text-gray-400 w-52 mt-2 lg:w-fit">"{{ JSON.parse(quote.body).en }}"</p>
            <IconDots
              class="absolute bottom-[-70px] right-[-80px] lg:top-1 lg:right-2 cursor-pointer"
              @click="show_quote_modal = quote.id"
            />
          </div>

          <div class="h-[1px] w-full lg:w-form bg-gray-600 mt-6"></div>
          <div class="flex space-x-6">
            <div class="flex space-x-3">
              <span>{{ quote?.comments?.length ?? 0 }}</span>
              <IconComments />
            </div>
            <div class="flex space-x-3">
              <span>{{ quote?.likes?.length ?? 0 }} </span>
              <IconLikes />
            </div>
          </div>

          <div
            class="px-5 py-6 lg:px-8 lg:py-9 bg-headerBg lg:w-60 space-y-6 absolute right-6 top-[70px] lg:top-14 z-10 lg:right-[-50px] transform"
            v-if="show_quote_modal === quote.id"
            ref="quote_modal"
          >
            <router-link
              v-if="props.movie"
              :to="{ name: 'view-quote', params: { movie_id: movie.id, id: quote.id } }"
              class="flex items-center space-x-4"
            >
              <IconEye />
              <p class="text-sm lg:text-md">{{ $t('movie.view_quote') }}</p>
            </router-link>
            <router-link
              v-if="props.movie"
              :to="{
                name: 'update-quote',
                params: { movie_id: movie.id, id: quote.id }
              }"
              class="flex items-center space-x-4"
            >
              <IconEdit />
              <p class="text-sm lg:text-md">{{ $t('movie.edit') }}</p>
            </router-link>
            <div
              class="flex items-center space-x-4 cursor-pointer"
              @click="handle_delete_quote(quote.id)"
            >
              <IconTrash />
              <p class="text-sm lg:text-md">{{ $t('movie.delete') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconAddMovie from '@/components/icons/IconAddMovie.vue'
import IconDots from '@/components/icons/IconDots.vue'
import IconComments from '@/components/icons/IconComments.vue'
import IconLikes from '@/components/icons/IconLikes.vue'
import IconEye from '@/components/icons/IconEye.vue'
import { getImages } from '@/utils/images'
import { onClickOutside } from '@vueuse/core'

import { ref } from 'vue'

const show_quote_modal = ref(false)
const quote_modal = ref(null)

onClickOutside(quote_modal, () => {
  show_quote_modal.value = false
})

const props = defineProps({
  quote: {
    type: Array,
    required: true
  },
  movie: {
    type: Object,
    required: true
  },
  handle_delete_quote: {
    type: Function,
    required: true
  }
})
</script>
