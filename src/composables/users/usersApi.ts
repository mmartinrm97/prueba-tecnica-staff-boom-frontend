import { APIUserResponse, APIUsersResponse, User, UserFormData } from '~/interfaces/users'
import { useApiFetch } from '~/composables/useApiFetch'

export const getUsersResponse = async (page: number): Promise<APIUsersResponse | null> => {
  const { data } = await useApiFetch<APIUsersResponse>(`/api/users?page=${page}`)
  return data.value
}

export const getUser = async (id: string): Promise<APIUserResponse | null> => {
  const { data } = await useApiFetch<APIUserResponse>(`/api/users/${id}`)
  return data.value
}

export const createUser = async (user: UserFormData): Promise<APIUserResponse | null> => {
  const { data,error } = await useApiFetch<APIUserResponse>('/api/users', {
    method: 'POST',
    body: user
  })
  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = (JSON.stringify(errorData)) as string
    throw new Error(errorMessage)
  }
  return data.value
}

export const updateUser = async (user: User): Promise<APIUserResponse | null> => {
  const { data } = await useApiFetch<APIUserResponse>(`/api/users/${user.id}`, {
    method: 'PUT',
    body: user
  })
  return data.value
}

export const deleteUser = async (id: string): Promise<void> => {
  await useApiFetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
}
