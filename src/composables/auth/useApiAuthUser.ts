import { useApiFetch } from '~/composables/useApiFetch'
import { APIUserResponse } from '~/interfaces/users'
import { APILoginResponse, LoginInput } from '~/interfaces/auth'

export const fetchUser = async (): Promise<APIUserResponse> => {
  const { data, error } = await useApiFetch<APIUserResponse>('/api/auth/user')

  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }

  return data.value as APIUserResponse
}

export const loginUser = async (credentials: LoginInput): Promise<APILoginResponse> => {
  const { data } = await useApiFetch<APILoginResponse>('/auth/login', {
    method: 'POST',
    body: {
      email: credentials.email,
      password: credentials.password
    }
  })
  return data.value as APILoginResponse
}

export const logoutUser = async (): Promise<void> => {
  await useApiFetch('/auth/logout', {
    method: 'POST'
  })
}
