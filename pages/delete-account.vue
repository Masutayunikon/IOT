<script setup lang="ts">

const modalOpen = ref(false);
const password = ref('');
const accountDelete = ref(false);
const accountDeleteError = ref(false);

const deleteAccount = async () => {
  modalOpen.value = true;
}

const user = useUserStore();

const confirmDelete = async () => {

  const request = await fetch('https://iot.hik-up.fr/api/v3/unregister', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authToken': `${user.token}`
    },
    body: JSON.stringify({
      password: password.value
    })
  });

  const response = await request.json();

  if (response.success) {
    accountDelete.value = true;
    setTimeout(() => {
      accountDelete.value = false;
      const router = useRouter();
      router.push('/logout');
    }, 3000);
  } else {
    accountDeleteError.value = true;
    setTimeout(() => {
      accountDeleteError.value = false;
    }, 3000);
  }



  modalOpen.value = false;
}

const cancelDelete = async () => {
  modalOpen.value = false;
}

</script>

<template>
  <div class="bg-white shadow sm:rounded-lg">
    <YuNotification v-model="accountDelete" title="Account deleted" description="Your account has been deleted successfully you will get disconnected in few seconds" />
    <YuNotification :error="true" v-model="accountDeleteError" title="Error" description="An error occured while deleting your account try again later" />
    <YuModalConfirm @cancel-button-clicked="cancelDelete" @red-button-clicked="confirmDelete" v-model="modalOpen" title="Delete account" description="Once you delete your account, all your data will be permanently removed. Please be certain." red-button="Delete account" />
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-base font-semibold text-gray-900">Account deletion</h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Once you delete your account, all your data will be permanently removed. Please be certain.</p>
      </div>
      <YuInputLabel v-model="password" class="mt-5" label="Password" type="password" placeholder="Type your password" />
      <div class="mt-5">
        <button @click="deleteAccount" type="button" class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Delete account</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
