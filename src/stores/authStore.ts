import { defineStore } from 'pinia'
import { User } from '~/interfaces/users'
import { fetchUser, logoutUser } from '~/composables/auth/useApiAuthUser'
import { UserTokenData } from "~/interfaces/auth";

export const useAuthStore = defineStore('auth', () => {

  const authUser = ref<UserTokenData | null>(null)
  const isLoggedIn = computed(() => !!authUser.value)

  function setAuthUserStore(newUser: UserTokenData | null) {
    authUser.value = newUser
  }


  async function fetchUserStore() {
    const {data, error} = await useApiFetch("/api/my-user");
    authUser.value = data.value as UserTokenData;
  }

  async function logoutUserStore() {
    await logoutUser()
    setAuthUserStore(null)
  }

  return {
    //state
    authUser,

    //getters
    isLoggedIn,

    //actions
    setAuthUserStore,
    fetchUserStore,
    logoutUserStore,
  }
},{
  persist: {
    storage: persistedState.localStorage,
  }
})
