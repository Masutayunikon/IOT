<script setup lang="ts">

import YuNotification from "~/components/YuNotification.vue";

const userData = ref({
  email: '',
  name: '',
  pseudo: '',
  lstName: '',
});

const loading = ref(true);

const buttonLoading = ref(false);

const profileUpdate = ref(false);

const user = useUserStore();

const error = ref<null | string>(null);

const update = async () => {

  buttonLoading.value = true;

  const request = await fetch('https://iot.hik-up.fr/api/v3/update-user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authToken': `${user.token}`
    },
    body: JSON.stringify({
      name: userData.value.name === '' ? null : userData.value.name,
      lstName: userData.value.lstName === '' ? null : userData.value.lstName
    })
  });

  const response = await request.json();

  if (response.success) {
    userData.value.email = response.user.email || '';
    userData.value.name = response.user.name || '';
    userData.value.pseudo = response.user.pseudo || '';
    userData.value.lstName = response.user.lstName || '';
    profileUpdate.value = true;

    setTimeout(() => {
      profileUpdate.value = false;
    }, 3000);

  } else {
    error.value = "An error occured while updating user data try again later";
  }

  buttonLoading.value = false;

}

onBeforeMount(async () => {

  loading.value = true;

  const request = await fetch('https://iot.hik-up.fr/api/v3/get-user-data', {
    method: 'GET',
    headers: {
      'authToken': `${user.token}`
    }
  });

  const response = await request.json();

  if (response.success) {
    console.log(response);
    userData.value.email = response.user.email || '';
    userData.value.name = response.user.name || '';
    userData.value.pseudo = response.user.pseudo || '';
    userData.value.lstName = response.user.lstName || '';
  } else {
    error.value = "An error occured while fetching user data try again later or try to logout and login again";
  }

  loading.value = false;
});

</script>

<template>
  <main class="min-h-screen w-full">
    <YuNotification title="Profile updated" description="Your profile has been updated successfully" v-model="profileUpdate"/>
    <div v-if="error" class="h-full w-full flex justify-center items-center">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else-if="!loading" class="h-full w-full flex justify-center items-center">
      <div class="w-5/6 bg-white p-4 rounded-lg shadow-lg">
        <h1 class="text-2xl font-semibold text-gray-900">Profile</h1>
        <YuInputLabel :disabled="true" class="mt-4" label="Email" v-model="userData.email" type="email" placeholder="Email"/>
        <YuInputLabel :disabled="true" class="mt-4" label="Pseudo" v-model="userData.pseudo" type="text" placeholder="Pseudo"/>
        <YuInputLabelWithCornerHint class="mt-4" label="Name" v-model="userData.name" type="text" placeholder="Name" hint="Optional"/>
        <YuInputLabelWithCornerHint class="mt-4" label="Last Name" v-model="userData.lstName" type="text" placeholder="Last Name" hint="Optional"/>
        <button @click="update" type="button" class="mt-8 w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500">Update</button>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
