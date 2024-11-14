<script setup lang="ts">

const oldPassword = ref('');
const newPassword = ref('');
const passwordUpdate = ref(false);
const passwordUpdateError = ref(false);

const buttonDisabled = computed(() => {
  return oldPassword.value === '' || newPassword.value === '' || passwordUpdate.value;
});

const user = useUserStore();

const update = async () => {

  if (oldPassword.value === '' || newPassword.value === '') {
    alert('Please fill all fields');
    return;
  }

  const request = await fetch('https://iot.hik-up.fr/api/v3/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authToken': `${user.token}`
    },
    body: JSON.stringify({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })
  });

  const response = await request.json();

  if (response.success) {
    passwordUpdate.value = true;

    setTimeout(() => {
      passwordUpdate.value = false;
    }, 3000);
  } else {
    passwordUpdateError.value = true;

    setTimeout(() => {
      passwordUpdateError.value = false;
    }, 3000);
  }


}

</script>

<template>
  <main class="min-h-screen w-full">
    <YuNotification v-model="passwordUpdate" title="Password updated" description="Your password has been updated successfully" />
    <YuNotification :error="true" v-model="passwordUpdateError" title="Error" description="An error occured while updating your password" />
    <div class="w-full flex justify-center items-center">
      <div class="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-center text-2xl font-bold">Change your password</h2>
        <YuInputLabel v-model="oldPassword" class="mt-4" label="Old password" placeholder="Old password" type="password" />
        <YuInputLabel v-model="newPassword" class="mt-4" label="New password" placeholder="New password" type="password" />
        <button :disabled="buttonDisabled" @click="update" type="button" class="mt-8 w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500">Update</button>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
