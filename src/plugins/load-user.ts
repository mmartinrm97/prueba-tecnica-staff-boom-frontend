import { useAuthStore } from "~/stores/authStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authUser = useAuthStore()

  if (!authUser.isLoggedIn) {
    await authUser.fetchUser();
  }
})