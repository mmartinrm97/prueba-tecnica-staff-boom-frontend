import { defineStore } from 'pinia'
import { User } from '~/interfaces/users'
import { useApiFetch } from '~/composables/useApiFetch'
import { LoginInput } from '~/interfaces/auth'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<User | null>(null)

  const isLoggedIn = computed(() => !!authUser.value)

  async function logout() {
    await useApiFetch('/logout', { method: 'POST' })
    authUser.value = null
    navigateTo('/login')
  }

  async function fetchUser() {
    const { data, error } = await useApiFetch('/api/my-user')
    // console.log('error fetching user', error)
    authUser.value = data.value as User
  }

  async function login(credentials: LoginInput) {
    await useApiFetch('/sanctum/csrf-cookie')

    const login = await useApiFetch('/login', {
      method: 'POST',
      body: credentials
    })

    await fetchUser()

    return login
  }

  return {
    //state
    authUser,

    //getters
    // isLoggedIn: computed(() => !!authUser.value),

    //actions
    setAuthUser(newUser: User | null) {
      authUser.value = newUser
    },
    login,
    fetchUser,
    isLoggedIn,
    logout
  }
})
