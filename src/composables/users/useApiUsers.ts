import { APIUserResponse, APIUsersResponse, User, UserFormData } from '~/interfaces/users'
import { useApiFetch } from '~/composables/useApiFetch'
import { Ref } from "@vue/reactivity";


export const getUsersResponse = async (
  page: Ref<number>,
  perPage: Ref<number | null>
): Promise<APIUsersResponse | null> => {

  console.log('page',page.value)
  console.log('perPage',perPage.value)

  const { data, error } = await useApiFetch<APIUsersResponse>(`/users`, {
    query: {
      page: page.value,
      per_page: perPage.value
    },
    watch: [page, perPage]
  })

  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }

  return data.value
}

export const getUser = async (id: string): Promise<APIUserResponse | null> => {
  const { data } = await useApiFetch<APIUserResponse>(`/users/${id}`)
  return data.value
}

export const createUser = async (user: UserFormData): Promise<APIUserResponse | null> => {
  const { data, error } = await useApiFetch<APIUserResponse>('/users', {
    method: 'POST',
    body: user
  })
  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }
  return data.value
}

export const updateUser = async (user: User): Promise<APIUserResponse | null> => {
  const { data } = await useApiFetch<APIUserResponse>(`/users/${user.id}`, {
    method: 'PUT',
    body: user
  })
  return data.value
}

export const deleteUser = async (id: string): Promise<void> => {
  await useApiFetch(`/users/${id}`, {
    method: 'DELETE'
  })
}
