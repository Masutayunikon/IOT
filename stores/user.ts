export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const token = ref('')

  function setToken(value: string) {
    token.value = value
  }

  function setUsername(value: string) {
    username.value = value
  }

  function clear() {
    token.value = ''
    username.value = ''
  }

  return {
    token,
    username,
    setToken,
    setUsername,
    clear
  }
}, {
  persist: true
})
