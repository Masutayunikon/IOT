<script setup lang="ts">

const props = defineProps<{
  label: string
  placeholder: string
  type: string
  hint: string
}>()

const model = defineModel({default: ''});

</script>

<template>
  <div>
    <div class="flex justify-between">
      <label class="block text-sm/6 font-medium text-gray-900">{{ label }}</label>
      <span class="text-sm/6 text-gray-500">{{ hint }}</span>
    </div>
    <div class="mt-2">
      <input
          v-model="model"
          :type="type"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
