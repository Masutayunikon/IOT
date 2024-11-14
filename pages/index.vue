<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="w-screen h-screen flex gap-8 flex-col justify-center items-center">
    <h2 class="text-center">Have you signed up before? Tap Yes to log in, or No to create an account!</h2>
    <div class="flex space-x-4">
      <NuxtLink to="/login" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Yes</NuxtLink>
      <NuxtLink to="/register" class="bg-green-500 text-white px-4 py-2 rounded-lg">No</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
