import { User } from '~/interfaces/users'
import { LoginInput } from '~/interfaces/auth'
import { useApiFetch } from '~/composables/useApiFetch'
import { useAuthStore } from "~/stores/authStore";
import { useMutation } from "@tanstack/vue-query";

async function fetchUser() {
  const { data, error } = await useApiFetch('/api/my-user')
  // console.log('error fetching user', error)
  return data.value as User
}

async function login(credentials: LoginInput) {
  await useApiFetch('/sanctum/csrf-cookie')

  await useApiFetch('/login', {
    method: 'POST',
    body: {
      email: credentials.email,
      password: credentials.password
    }
  })

  return fetchUser();
}

const useLogin = (credentials: LoginInput) =>{
  const store = useAuthStore();

  const authUserMutation = useMutation( login );

  return {
    // Properties

  }

}

