<template>
  <h1 class="text-xl">Create an account</h1>
  <p class="text-sm text-gray-500">Start your journey</p>
  <Form class="flex flex-col space-y-4" @submit="register">
    <div class="flex flex-col w-96">
      <label for="">Name</label>
      <Field
        type="text"
        name="name"
        class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
        placeholder="At least 3 & max.15 lower case characters"
        v-model="name"
      />
      <ErrorMessage name="email" />
    </div>
    <div class="flex flex-col w-96">
      <label for="">Email</label>
      <Field
        type="email"
        name="email"
        class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
        placeholder="Enter your email"
        v-model="email"
      />
      <ErrorMessage name="email" />
    </div>
    <div class="flex flex-col">
      <label for="">Password</label>
      <Field
        type="password"
        name="password"
        class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
        placeholder="Password"
        v-model="password"
      />
      <ErrorMessage name="password" />
    </div>
    <div class="flex flex-col">
      <label for="">Password confirmation</label>
      <Field
        type="password"
        name="password_confirmation"
        class="py-2 px-2 rounded-md outline-0 text-black font-normal bg-[#CED4DA]"
        placeholder="Confirm Password"
        v-model="password_confirmation"
      />
      <ErrorMessage name="password" />
    </div>
    <div>
      <button
        class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-6"
        type="submit"
      >
        Get started
      </button>
      <p class="text-center mt-6">
        Already have an account? <a href="#" class="underline text-blue-600">Log in</a>
      </p>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const register = () => {
  console.log(email.value, password.value)
  axios
    .post('http://localhost:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.response)
      console.log(err.response.data)
    })
}
</script>
