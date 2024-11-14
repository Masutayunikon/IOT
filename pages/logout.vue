<script setup lang="ts">

definePageMeta({
  layout: false
})

import { useUserStore } from '@/stores/user';

const user = useUserStore();

const logout = async () => {
  user.clear();
  user.$persist();
  const router = useRouter();
  await router.push('/');
}

onBeforeMount(async () => {
  await logout();
});

</script>

<template>

</template>

<style scoped>

</style>
