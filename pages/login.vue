<script setup lang="ts">
import YuInputLabel from "~/components/YuInputLabel.vue";
import { useUserStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const loading = ref(false);
const success = ref<null | boolean>(null);

definePageMeta({
  layout: false
})

const disabledButton = computed(() => {
  return !username.value || !password.value;
});

const login = async () => {
  // https://iot.hik-up.fr/api/v3/authenticate
  // if is email
  loading.value = true;
  let response;

  if (username.value.includes('@')) {
    const request = await fetch('https://iot.hik-up.fr/api/v3/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value
      })
    });

    response = await request.json();

  } else {

    const request = await fetch('https://iot.hik-up.fr/api/v3/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pseudo: username.value,
        password: password.value
      })
    });

    response = await request.json();
  }

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
        <h1 class="text-3xl font-bold text-center text-indigo-600">Login</h1>
        <YuInputLabel v-model="username" class="mt-8" label="Email or username" placeholder="Enter your email or username" type="text" />
        <YuInputLabel v-model="password" class="mt-4" label="Password" placeholder="Enter your password" type="password" />
        <span
            v-if="success === false"
            class="block mt-4 text-sm/6 text-red-600 text-center"
        >Invalid credentials</span>
        <button :disabled="loading || disabledButton" @click="login" type="button" class="w-full h-8 mt-8 rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500">Login</button>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
