import { Links, Meta } from '~/interfaces/shared'

export interface APITasksResponse {
  data: Task[]
  links: Links
  meta: Meta
}

export interface APITaskResponse {
  data: Task
}

export interface Task {
  id: string
  user_id: string
  title: string
  description: string
  expiration_date: Date | string
  is_done: boolean
  created_at: Date
  updated_at: Date
}

export interface TaskFormData {
  id: string
  title: string
  description: string
  expiration_date: Date | string,
  is_done: boolean
}
