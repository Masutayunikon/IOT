<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog class="relative z-10" @close="">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto" @click="open = false; emit('close')">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <div class="w-full flex justify-center">
                    <YuProgressBar class="mt-4" :steps="steps" @step-clicked="stepClick($event)" />
                  </div>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500" v-if="steps[index].description">{{ steps[index].description }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3" :class="!index ? ' sm:grid-cols-1' : 'sm:grid-cols-2'">
                <button v-if="index" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-1" @click="previous">Previous</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0" @click="next" ref="cancelButtonRef" :class="!index ? 'sm:col-start-1' : 'sm:col-start-2'">
                  {{ index == steps.length - 1 ? 'Finish' : 'Next' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import YuProgressBar from "~/components/YuProgressBar.vue";

interface Step {
  title?: string
  description?: string
  completion: 'complete' | 'current' | 'upcoming'
}

const props = defineProps<{
  modelValue: boolean
  steps: Step[]
}>()


const open = ref(props.modelValue)
const index = ref(0)
const steps = ref(props.steps)

const emit = defineEmits(['finish', 'close'])

const stepClick = (stepIndex: number) => {
  // changr step.completion to 'complete' for before step and 'current' for current step and 'upcoming' for next steps
  for (let i = 0; i < steps.value.length; i++) {
    if (i < stepIndex) {
      steps.value[i].completion = 'complete'
    } else if (i === stepIndex) {
      steps.value[i].completion = 'current'
    } else {
      steps.value[i].completion = 'upcoming'
    }
  }

  index.value = stepIndex
}

const next = () => {
  if (index.value < steps.value.length - 1) {
    index.value++
    stepClick(index.value)
  } else {
    emit('finish')
    open.value = false
  }
}

const previous = () => {
  if (index.value > 0) {
    index.value--
    stepClick(index.value)
  }
}

// reset steps completion to 'upcoming' when the modal is closed
watch(() => open.value, (value) => {
  if (!value) {
    steps.value.forEach(step => {
      step.completion = 'upcoming'
    })

    steps.value[0].completion = 'current'
    index.value = 0
  }
})

watch(() => props.modelValue, (value) => {
  open.value = value
})

</script>
