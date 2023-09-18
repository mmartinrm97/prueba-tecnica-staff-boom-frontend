import { defineStore } from 'pinia'
import { Task } from '~/interfaces/tasks'
import { Link } from "~/interfaces/shared";

export const useTasksStore = defineStore('tasks', () => {
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(0)
  const tasks = ref<Task[]>([])
  const totalPagesNumber = ref<Link[]>([])
  const titleSearched = ref<string>('')
  const descriptionSearched = ref<string>('')

  return {
    //state
    tasks,
    currentPage,
    totalPages,
    totalPagesNumber,
    titleSearched,
    descriptionSearched,


    //getters

    //actions
    setTasks(newTasks: Task[]) {
      tasks.value = newTasks
    },
    setPage(newPage: number) {
      if (currentPage.value === newPage) return
      currentPage.value = newPage
    },
    setTotalPages(newTotalPages: number) {
      totalPages.value = newTotalPages
    },
    setTotalPagesNumber(newTotalPagesNumber: Link[]) {
      totalPagesNumber.value = newTotalPagesNumber
    }
  }
})
