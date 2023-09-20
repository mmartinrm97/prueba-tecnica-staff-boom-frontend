import { APITaskResponse, APITasksResponse, TaskFormData } from '~/interfaces/tasks'
import { useApiFetch } from '~/composables/useApiFetch'

export const getTasksResponse = async (page: number, titleSearch:string, descriptionSearch: string): Promise<APITasksResponse | null> => {
  const { data } =
    await useApiFetch<APITasksResponse>(`/api/tasks?page=${page}&filter[title]=${titleSearch}&filter[description]=${descriptionSearch}`)
  return data.value
}

export const getTask = async (id: string): Promise<APITaskResponse | null> => {
  const { data } = await useApiFetch<APITaskResponse>(`/api/tasks/${id}`)
  return data.value
}

export const createTask = async (task: TaskFormData): Promise<APITaskResponse | null> => {
  const { data, error } = await useApiFetch<APITaskResponse>('/api/tasks', {
    method: 'POST',
    body: task
  })
  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }
  return data.value
}

export const updateTask = async (task: TaskFormData): Promise<APITaskResponse | null> => {
  const { data, error } = await useApiFetch<APITaskResponse>(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: task
  })
  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }
  return data.value
}

export const updateIsCompleteTask = async (id:string, is_complete: boolean): Promise<APITaskResponse | null> => {
  const { data, error } = await useApiFetch<APITaskResponse>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: { is_complete }
  })
  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }
  return data.value
}

export const deleteTask = async (id: string): Promise<void> => {
  const { data, error } = await useApiFetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })

  if (error.value) {
    const errorData = error.value.data.errors
    const errorMessage = JSON.stringify(errorData) as string
    throw new Error(errorMessage)
  }
}
