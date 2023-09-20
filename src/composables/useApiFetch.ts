import type {UseFetchOptions} from 'nuxt/app'
import {useRequestHeaders} from "nuxt/app";
import { useAuthStore } from "~/stores/authStore";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {

  const runtimeConfig = useRuntimeConfig()

  const userAuth = useAuthStore()
  const token = userAuth.authUser?.access_token

  let headers: any = {
    accept: "application/json",
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const backendURL = runtimeConfig.public.API_BACKEND_URL

  return useFetch(path, {
    // credentials: "include",
    baseURL: backendURL,
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  });
}