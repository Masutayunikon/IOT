<script setup lang="ts">
import YuInputLabel from "~/components/YuInputLabel.vue";
import { useUserStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const email = ref('');
const lastname = ref('');
const firstname = ref('');

const loading = ref(false);
const success = ref<null | boolean>(null);

definePageMeta({
  layout: false
})

const disabledButton = computed(() => {
  return !username.value || !password.value || !email.value;
});

const register = async () => {
  const body : Record<string, string> = {
    pseudo: username.value,
    password: password.value,
    email: email.value,
  };

  if (firstname.value !== '') {
    body.name = firstname.value;
  }

  if (lastname.value !== '') {
    body.lstName = lastname.value;
  }

  loading.value = true;

  const request = await fetch('https://iot.hik-up.fr/api/v3/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const response = await request.json();

  success.value = response.success;

  if (response.success) {
    const user = useUserStore();

    user.setToken(response.token);
    user.setUsername(response.pseudo);

    const router = useRouter();
    await router.push('/dashboard');
  }

  loading.value = false;
}

</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div class="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-xl p-4 rounded-3xl border-2 border-gray-200">
        <h1 class="text-3xl font-bold text-center text-indigo-600">Register</h1>
        <YuInputLabel v-model="username" class="mt-8" label="Username" placeholder="Enter your email or username" type="text" />
        <YuInputLabel v-model="password" class="mt-4" label="Password" placeholder="Enter your password" type="password" />
        <YuInputLabel v-model="email" class="mt-4" label="Email" placeholder="Enter your email" type="email" />
        <YuInputLabelWithCornerHint v-model="firstname" class="mt-4" label="Firstname" placeholder="Enter your firstname" type="text" hint="Optional" />
        <YuInputLabelWithCornerHint v-model="lastname" class="mt-4" label="Lastname" placeholder="Enter your lastname" type="text" hint="Optional" />
        <span
            v-if="success === false"
            class="block mt-4 text-sm/6 text-red-600 text-center"
        >Invalid form data</span>
        <button :disabled="loading || disabledButton" @click="register" type="button" class="w-full h-8 mt-8 rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500">Register</button>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
