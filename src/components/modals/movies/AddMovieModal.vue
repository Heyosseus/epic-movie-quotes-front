<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="absolute w-screen h-screen flex flex-col items-center justify-center bg-transparentLandingBg"
      >
        <div class="bg-movie px-40 py-10">
          <div class="flex items-center">
            <h1 class="text-2xl mx-auto pl-40">Add Movie</h1>
            <IconClose class="ml-auto "/>
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
          <Form class="flex flex-col">
            <Field
              name="title_en "
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 py-3 rounded-md"
              placeholder="Movie name"
            >
            </Field>
            <Field
              name="title_ka "
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 py-3 rounded-md"
              placeholder="ფილმის სახელი"
            >
            </Field>
            <Field
              type="date"
              name="date"
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 py-3 rounded-md"
              placeholder="წელი/Year"
            >
            </Field>
            <Field
              type="text"
              name="director_en"
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 py-3 rounded-md"
              placeholder="Director"
            >
            </Field>
            <Field
              type="text"
              name="director_ka"
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 py-3 rounded-md"
              placeholder="რეჟისორი"
            >
            </Field>
            <Field
              as="textarea"
              type="text"
              name="description_en"
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 h-28 p-2 rounded-md placeholder-top"
              placeholder="Movie description"
            >
            </Field>
            <Field
              as="textarea"
              type="text"
              name="description_ka"
              class="border border-gray-500 bg-transparent w-form mt-10 px-2 h-28 py-2 rounded-md"
              placeholder="ფილმის აღწერა"
            >
            </Field>
            <button
              class="bg-red-600 py-3 rounded flex items-center outline-0 mt-6 justify-center text-lg"
            >
              Add movie
            </button>
          </Form>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import IconClose from '@/components/icons/IconClose.vue'
</script>
