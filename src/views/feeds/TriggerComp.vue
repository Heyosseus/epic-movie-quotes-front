<template>
  <div class="text-center">
    <label class="checkbox">
      <input :checked="isActive" type="checkbox" name="enabled" />
      <span>Enable</span>
    </label>
  </div>
  <div ref="root" class="root">
    <p class="notice">Scroll me down!</p>
    <div ref="target" class="target">
      <p>Hello world!</p>
    </div>
  </div>
  <div class="text-center">
    Element
    <div v-if="isVisible">inside</div>
    <div v-else>outside</div>
    the viewport
  </div>
  <div></div>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import AxiosInstance from '@/config/axios/index'
const quotes = ref([])
const root = ref(null)
const target = ref(null)
const isVisible = ref(false)

const { isActive } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    if (isIntersecting) {
      AxiosInstance.get(`/api/quotes`)
        .then((response) => {
          quotes.value = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  { root }
)
</script>
<style scoped>
.root {
  border: 2px dashed #ccc;
  height: 200px;
  margin: 2rem 1rem;
  overflow-y: scroll;
}
.notice {
  text-align: center;
  padding: 2em 0;
  margin-bottom: 300px;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.8;
}
.target {
  border: 2px dashed var(--vp-c-brand);
  padding: 10px;
  max-height: 150px;
  margin: 0 2rem 400px;
}
</style>
