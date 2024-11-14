<script setup lang="ts">

definePageMeta({
  layout: false
})

onBeforeMount(async () => {
  const user = useUserStore();

  if (!user.token) {
    const router = useRouter();
    await router.push('/');
  } else {
    setPageLayout('default');

    // fetch /api/v3/get-user-data and console.log the response
    const request = await fetch('https://iot.hik-up.fr/api/v3/find-datapoint', {
      method: 'POST',
      headers: {
        'authToken': `${user.token}`
      }
    });

    const response = await request.json();

    console.log(response);
  }
});

</script>

<template>
  <main class="min-h-screen w-full">
    <button type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <span class="w-full flex justify-center items-center">
        <img class="w-32" src="/arduino.svg" alt="arduino">
      </span>
      <span class="mt-2 block text-sm font-semibold text-gray-900">Add a new device</span>
    </button>
  </main>
</template>

<style scoped>

</style>
