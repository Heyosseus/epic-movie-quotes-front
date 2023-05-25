<template>
  <div class="relative">
    <teleport to="body">
      <div
        class="flex flex-col px-20 pt-6 pb-16 rounded-md items-center justify-center mx-auto my-auto bg-modal space-y-4"
      >
        <h1 class="text-xl">Log in to your account</h1>
        <p class="text-sm text-gray-500">Welcome back! Please enter your details.</p>
        <Form class="flex flex-col space-y-4">
          <div class="flex flex-col w-96">
            <label for="">Email</label>
            <Field type="text" name="email" class="py-1 rounded-md bg-[#CED4DA]" />
            <ErrorMessage name="email" />
          </div>
          <div class="flex flex-col">
            <label for="">Password</label>
            <Field type="password" name="password" class="py-1 rounded-md bg-[#CED4DA]" />
            <ErrorMessage name="password" />
          </div>
          <div class="flex justify-between">
            <div class="space-x-2">
              <Field type="checkbox" name="remember" />
              <label for="">Remember me</label>
            </div>

            <div class="underline text-blue-600" @click="navigateToForgotPassword">
              Forgot password
            </div>
            >
          </div>
          <div>
            <button
              class="py-2 px-6 bg-red-700 text-white rounded-md flex w-full items-center justify-center mx-auto mt-6"
            >
              Sign in
            </button>
            <p class="text-center mt-6">
              Already have an account? <a href="#" class="underline text-blue-600">Sign up</a>
            </p>
          </div>
        </Form>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateToForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<style></style>
