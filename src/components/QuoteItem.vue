<template>
  <div class="flex flex-col bg-movie px-6 py-4 rounded-lg mt-4 lg:mt-10 mb-20">
    <div v-for="quoteItem in quotes" :key="quoteItem.id">
      <router-link
        :to="{ name: 'profile' }"
        v-if="quoteItem.user"
        class="flex items-center mt-2 lg:mt-6 space-x-4"
      >
        <div v-if="quoteItem.user.profile_picture">
          <img
            :src="getImages(quoteItem.user.profile_picture)"
            alt=""
            class="object-fit w-10 lg:w-14 rounded-full"
          />
        </div>
        <div v-else>
          <img
            src="@/assets/images/default_picture.jpg"
            alt="profile"
            class="object-fit w-10 lg:w-14 rounded-full"
          />
        </div>
        <h1>{{ quoteItem.user.name }}</h1>
      </router-link>
      <div class="flex mt-6">
        <p class="italic">"{{ JSON.parse(quoteItem.body).en }}"</p>
        <span class="ml-6 uppercase text-primary">{{ quoteItem.movie.title.en }}</span>
        <span class="ml-1">({{ quoteItem.movie.release_date }})</span>
      </div>
      <img
        :src="getImages(quoteItem.thumbnail)"
        alt=""
        class="w-40 mt-4 sm:w-96 rounded-md mx-auto"
      />
      <div class="flex space-x-6 cursor-pointer mt-5">
        <div class="flex space-x-3" v-if="quoteItem.comments">
          <span>{{ quoteItem.comments.length }}</span>
          <IconComments class="w-7 lg:w-10" />
        </div>
        <div class="flex space-x-3">
          <span>{{ quoteItem.likes.length ?? 0 }} </span>
          <IconLikes @click="addLikes(quoteItem)" class="w-7 lg:w-10" />
        </div>
      </div>
      <div class="h-[1px] w-full lg:w-full bg-gray-600 mt-6"></div>

      <div v-for="(comment, index) in quoteItem.comments" :key="comment.id">
        <div
          v-if="comment.quote_id === quoteItem.id && (index < 3 || quoteItem.showAllComments)"
          class="py-4 flex space-x-6 lg:mt-3"
        >
          <router-link :to="{ name: 'profile' }" v-if="comment.user" class="flex space-x-4">
            <div v-if="comment.user.profile_picture">
              <img
                :src="getImages(comment.user.profile_picture)"
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

      <div v-if="quoteItem && quoteItem.user">
        <div v-if="quoteItem.user.profile_picture" class="flex items-center mt-4 space-x-6 mb-6">
          <img
            :src="getImages(quoteItem.user.profile_picture)"
            alt=""
            class="object-fit w-10 lg:w-14 rounded-full"
          />
          <Form class="w-full" @submit="addComment(quoteItem)">
            <Field
              name="comment"
              class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
              placeholder="write a comment"
              v-model="comment"
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
          <Form class="w-full" @submit="addComment(quoteItem)">
            <Field
              name="comment"
              class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
              placeholder="write a comment"
              v-model="comment"
            >
            </Field>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { getImages } from '@/config/axios/helpers'
import IconComments from '@/components/icons/IconComments.vue'
import IconLikes from '@/components/icons/IconLikes.vue'

const quotes = ref([])
const comment = ref('')
const quoteId = ref(null)

const addComment = (quote) => {
  quoteId.value = quote.id

  AxiosInstance.post(`/api/add-comments`, {
    quote_id: quote.id,
    user_id: quote.user.id,
    content: comment.value
  })
    .then(() => {
      comment.value = ''
    })
    .catch((error) => {
      console.error(error)
    })
}

const addLikes = (quote) => {
  quoteId.value = quote.id

  AxiosInstance.post(`/api/add-likes`, {
    quote_id: quote.id,
    user_id: quote.user.id
  })
    .then(() => {
      console.log('success')
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  AxiosInstance.get(`/api/news-feed`)
    .then((response) => {
      quotes.value = response.data.quotes
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
