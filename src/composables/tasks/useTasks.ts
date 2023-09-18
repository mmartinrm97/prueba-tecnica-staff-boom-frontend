import { useTasksStore } from "~/stores/tasksStore";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import { getTasksResponse } from "~/composables/tasks/tasksApi";

//axios version
// const getTasksResponse = async (page: number): Promise<APITasksResponse> => {
//   const { data } = await authApi.get<APITasksResponse>(`/tasks?page=${page}`)
//   return data
// }

const useTasks = () => {
  const store = useTasksStore()

  const { tasks, totalPages, currentPage, totalPagesNumber, titleSearched, descriptionSearched } =
    storeToRefs(store)

  const { isLoading, isFetching, data } = useQuery(['tasks?page=', currentPage], () =>
    getTasksResponse(currentPage.value, titleSearched.value, descriptionSearched.value)
  )

  watch(
    data,
    (tasks) => {
      //
      if (tasks?.data) store.setTasks(tasks?.data)

      if (tasks?.meta) {
        store.setTotalPages(tasks?.meta?.last_page)
        store.setTotalPagesNumber(tasks?.meta?.links)
      }
    },
    { immediate: true }
  )

  return {
    //Properties
    tasks,
    currentPage,
    isLoading,
    isFetching,
    totalPages,
    totalPagesNumber,

    //Methods
    getPage(page: number) {
      store.setPage(page)
    },
    getTotalPages(totalPages: number) {
      store.setTotalPages(totalPages)
    }
  }
}

export default useTasks
