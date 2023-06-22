<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-full min-h-full flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie w-full lg:w-quote px-4 sm:px-8 py-4 sm:py-8" ref="modalRef">
          <div class="flex items-center" v-if="view_quotes">
            <router-link :to="{ name: 'update-quote', params: { movie_id: movieId, id: quote_id } }"
              ><IconEdit class="cursor-pointer"
            /></router-link>
            <div class="w-[1px] bg-gray-500 h-6 ml-6"></div>
            <IconTrash class="cursor-pointer ml-5" @click="handleDeleteQuote" />
            <h1 class="text-2xl mx-auto sm:pl-8">View Quote</h1>
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
          <div v-if="user" class="flex items-center mt-6 space-x-4">
            <div v-if="user.profile_picture">
              <img
                :src="getImages(user.profile_picture)"
                alt=""
                class="object-fit w-20 rounded-full"
              />
            </div>
            <div v-else>
              <img
                src="@/assets/images/profile.jpg"
                alt="profile"
                class="object-fit w-20 rounded-full"
              />
            </div>
            <h1>{{ user.name }}</h1>
          </div>

          <Form
            class="flex flex-col w-full mt-4 sm:mt-6"
            enctype="multipart/form-data"
            v-if="view_quotes"
          >
            <div
              class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
            >
              <div class="italic px-2 p-1">{{ JSON.parse(view_quotes.body).en }}</div>
            </div>

            <div
              class="border border-gray-500 flex items-center space-x-4 bg-transparent w-full sm:w-full mt-4 sm:mt-6 px-2 p-1 rounded-md text-lg"
            >
              <div class="italic px-2 p-1">{{ JSON.parse(view_quotes.body).ka }}</div>
            </div>

            <div v-if="view_quotes">
              <img
                :src="getImages(image)"
                alt=""
                class="w-full object-contain h-96 rounded-md mt-8"
              />
            </div>
            <div class="flex space-x-6 cursor-pointer mt-5" v-if="view_quotes.comments">
              <div class="flex space-x-3">
                <span>{{ view_quotes.comments.length }}</span>
                <IconComments class="w-7 lg:w-10" />
              </div>
              <div class="flex space-x-3">
                <span>{{ view_quotes.likes.length ?? 0 }} </span>
                <IconLikes @click="addLikes(view_quotes)" class="w-7 lg:w-10" />
              </div>
            </div>
            <div v-for="(comment, index) in view_quotes.comments" :key="comment.id">
              <div
                v-if="
                  comment.quote_id === view_quotes.id && (index < 2 || view_quotes.showAllComments)
                "
                class="py-4 flex space-x-6 lg:mt-3"
              >
                <router-link
                  :to="{ name: 'profile' }"
                  v-if="view_quotes.user"
                  class="flex space-x-4"
                >
                  <div v-if="view_quotes.user.profile_picture">
                    <img
                      :src="getImages(view_quotes.user.profile_picture)"
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
              <div v-if="!view_quotes.showAllComments && view_quotes.comments.length > 2">
                <button @click="view_quotes.showAllComments = true">View Other Comments</button>
              </div>
              <div v-if="view_quotes.showAllComments">
                <button @click="view_quotes.showAllComments = false">Hide Comments</button>
              </div>
            </div>
            <div v-if="view_quotes && view_quotes.user">
              <div
                v-if="view_quotes.user.profile_picture"
                class="flex items-center mt-4 space-x-6 mb-6"
              >
                <img
                  :src="getImages(view_quotes.user.profile_picture)"
                  alt=""
                  class="object-fit w-10 lg:w-14 rounded-full"
                />
                <Form class="w-full" @submit="addComment(view_quotes)">
                  <input
                    name="comment"
                    class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
                    placeholder="write a comment"
                    v-model="comment"
                  />
                </Form>
              </div>
              <div v-else class="flex items-center mt-4 space-x-6 mb-6">
                <img
                  src="@/assets/images/default_picture.jpg"
                  alt="profile"
                  class="object-fit w-10 rounded-full lg:w-14"
                />
                <Form class="w-full" @submit="addComment(view_quotes)">
                  <input
                    name="comment"
                    class="w-full rounded-md outline-0 flex lg:flex bg-headerBg py-3 px-6 space-x-4 items-center lg:w-full"
                    placeholder="write a comment"
                    v-model="comment"
                  />
                </Form>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form } from 'vee-validate'
import { ref, onMounted } from 'vue'
import AxiosInstance from '@/config/axios/index'
import { useRouter, useRoute } from 'vue-router'
import { getImages } from '@/config/axios/helpers'
import { onClickOutside } from '@vueuse/core'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconComments from '@/components/icons/IconComments.vue'
import IconLikes from '@/components/icons/IconLikes.vue'
import instantiatePusher from '@/config/helpers/instantiatePusher'

const router = useRouter()
const route = useRoute()
const view_quotes = ref(null)
const image = ref(null)
const user = ref(null)
const modalRef = ref(null)
const quote_id = route.params.id
const movieId = route.params.movie_id
const comment = ref('')
const quoteId = ref(null)

onClickOutside(modalRef, () => {
  router.back()
})
onMounted(() => {
  instantiatePusher()
  window.Echo.channel('notification').listen('CommentNotification', (data) => {
    const newComment = data.comment
    if (view_quotes.value && view_quotes.value.id === newComment.quote_id) {
      view_quotes.value.comments.push(newComment)
    }
  })
  window.Echo.channel('like-notification').listen('LikeNotification', (data) => {
    const newLike = data.like
    if (view_quotes.value && view_quotes.value.id === newLike.quote_id) {
      view_quotes.value.likes.push(newLike)
    }
  })
})
const addComment = (view_quotes) => {
  quoteId.value = view_quotes.id

  AxiosInstance.post(`/api/add-comments`, {
    quote_id: view_quotes.id,
    user_id: view_quotes.user.id,
    content: comment.value
  })
    .then(() => {
      console.log(comment.value)
      comment.value = ''
    })
    .catch((error) => {
      console.error(error)
    })
}

const addLikes = (view_quotes) => {
  quoteId.value = view_quotes.id

  AxiosInstance.post(`/api/add-likes`, {
    quote_id: view_quotes.id,
    user_id: view_quotes.user.id
  })
    .then(() => {
      console.log('success')
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  AxiosInstance.get(`/api/show-quotes/${quote_id}`)
    .then((response) => {
      view_quotes.value = response.data.quote
      image.value = response.data.quote.thumbnail
      console.log(view_quotes.value)
    })
    .catch((error) => {
      console.error(error)
    })
})

onMounted(() => {
  AxiosInstance.get(`/api/user`)
    .then((res) => {
      user.value = res.data
    })
    .catch((err) => {
      console.log(err.response)
    })
})
</script>
