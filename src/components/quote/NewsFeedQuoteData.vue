<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-if="props.quotes">
    <div class="flex mt-6">
      <p class="italic">"{{ JSON.parse(quote.body).en }}"</p>
      <span class="ml-6 uppercase text-primary">{{ quote.movie.title.en }}</span>
      <span class="ml-1">({{ quote.movie.release_date }})</span>
    </div>
    <img
      :src="getImages(quote.thumbnail)"
      alt=""
      class="w-full mt-4 sm:w-form sm:h-posterHeight object-contain rounded-md mx-auto"
    />
    <div class="flex space-x-6 cursor-pointer mt-5">
      <div class="flex space-x-3" v-if="quote.comments">
        <span>{{ quote.comments.length }}</span>
        <IconComments class="w-7 lg:w-10" />
      </div>
      <div class="flex space-x-3">
        <span>{{ quote.likes.length ?? 0 }} </span>
        <IconLikes @click="add_likes(quote)" class="w-7 lg:w-10" />
      </div>
    </div>
    <div class="h-[1px] w-full lg:w-full bg-gray-600 mt-6"></div>

    <div v-for="(comment, index) in quote.comments" :key="comment.id">
      <div
        v-if="comment.quote_id === quote.id && (index < 3 || quote.showAllComments)"
        class="py-4 flex space-x-6 lg:mt-3"
      >
        <router-link :to="{ name: 'profile' }" v-if="quote.user" class="flex space-x-4">
          <div v-if="quote.user.profile_picture">
            <img
              :src="getImages(quote.user.profile_picture)"
              alt=""
              class="object-fit w-10 mt-2 lg:w-14 rounded-full"
            />
          </div>
          <div v-else>
            <img
              src="@/assets/images/default_picture.jpg"
              alt="profile"
              class="object-fit w-10 lg:w-14 rounded-full"
            />
          </div>
        </router-link>
        <div class="w-full">
          <h1 class="text-lg font-bold">{{ comment.user?.name }}</h1>
          <div class="w-full">
            <p class="text-sm font-normal mt-1 lg:mt-3 lg:text-md">
              {{ comment.content }}
            </p>
            <div class="h-[1px] w-full lg:w-full bg-gray-600 mt-2 lg:mt-4"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-sm flex lg:items-center lg:justify-center mt-2 lg:text-lg">
      <div v-if="!quote.showAllComments && quote.comments.length > 3">
        <button @click="quote.showAllComments = true">View Other Comments</button>
      </div>
      <div v-if="quote.showAllComments">
        <button @click="quote.showAllComments = false">Hide Comments</button>
      </div>
    </div>

    <div v-if="quote && quote.user">
      <div v-if="quote.user.profile_picture" class="flex items-center mt-4 space-x-6 mb-6">
        <img
          :src="getImages(quote.user.profile_picture)"
          alt=""
          class="object-fit w-10 lg:w-14 rounded-full"
        />
        <Form class="w-full" @submit="add_comment(quote)">
          <Field
            name="comment"
            class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
            placeholder="write a comment"
            :value="comment"
            @input="$emit('update:comment', $event.target.value)"
          >
          </Field>
        </Form>
      </div>
      <div v-else class="flex items-center mt-4 space-x-6 mb-6">
        <img
          src="@/assets/images/default_picture.jpg"
          alt="profile"
          class="object-fit w-10 rounded-full lg:w-14"
        />
        <Form class="w-full" @submit="add_comment(quote, comment)">
          <Field
            name="comment"
            class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
            placeholder="write a comment"
            :value="comment"
            @input="$emit('update:comment', $event.target.value)"
          >
          </Field>
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate'

import { getImages } from '@/config/axios/helpers'
import IconLikes from '@/components/icons/IconLikes.vue'
import IconComments from '@/components/icons/IconComments.vue'

const props = defineProps({
  quotes: {
    type: Array,
    required: true
  },
  quote: {
    type: Object,
    required: true
  },
  add_likes: {
    type: Function,
    required: true
  },
  add_comment: {
    type: Function,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
})
</script>
