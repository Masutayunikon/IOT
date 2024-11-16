<template>
  <nav aria-label="Progress">
    <ol role="list" class="flex items-center">
      <li v-for="(step, stepIdx) in steps" :key="stepIdx" :class="[stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative']">
        <template v-if="step.completion === 'complete'">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-indigo-600" />
          </div>
          <div @click="stepClick(stepIdx)" class="relative flex size-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
            <CheckIcon class="size-5 text-white" aria-hidden="true" />
            <span class="sr-only">{{ step.title }}</span>
          </div>
        </template>
        <template v-else-if="step.completion === 'current'">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <div @click="stepClick(stepIdx)" class="relative flex size-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
            <span class="size-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
            <span class="sr-only">{{ step.title }}</span>
          </div>
        </template>
        <template v-else>
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <div @click="stepClick(stepIdx)" class="group relative flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
            <span class="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
            <span class="sr-only">{{ step.title }}</span>
          </div>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'


const Props = defineProps<{
  steps: {
    title?: string;
    description?: string;
    completion: 'complete' | 'current' | 'upcoming'
  }[]
}>()

const emit = defineEmits(['stepClicked'])

const stepClick = (index: number) => {
  emit('stepClicked', index)
}

</script>
