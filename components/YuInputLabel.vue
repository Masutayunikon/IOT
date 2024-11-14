<script setup lang="ts">

const props = defineProps<{
  label: string
  placeholder: string
  type: string
  disabled?: boolean
}>()

const model = defineModel({default: ''});

</script>

<template>
  <div>
    <label for="email" class="block text-sm/6 font-medium text-gray-900">{{ props.label }}</label>
    <div class="mt-2">
      <input
          v-model="model"
          :type="props.type"
          class="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
