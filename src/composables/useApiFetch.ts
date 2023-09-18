import type {UseFetchOptions} from 'nuxt/app'
import {useRequestHeaders} from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {


  const runtimeConfig = useRuntimeConfig()
  let headers: any = {
    accept: "application/json",
    referer: runtimeConfig.API_FRONTEND_URL || "http://localhost:3000",
  }

  //get the config

  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    }
  }
  const backendURL = runtimeConfig.public.API_BACKEND_URL || "http://localhost:8000"
  return useFetch(backendURL + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  });
}