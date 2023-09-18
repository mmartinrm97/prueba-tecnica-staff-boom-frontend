import { APIUsersResponse, User } from '~/interfaces/users'
import authApi from '~/utils/authApi'
import { useUsersStore } from '~/stores/usersStore'
import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import useTasks from "~/composables/tasks/useTasks";
import { useApiFetch } from "~/composables/useApiFetch";
import { getUsersResponse } from "~/composables/users/usersApi";

const useUsers = () => {
  const store = useUsersStore()

  const { users, totalPages, currentPage,totalPagesNumber } = storeToRefs(store)

  const {
    isLoading,
    isFetching,
    data
  } = useQuery(['users?page=', currentPage], () =>
    getUsersResponse(currentPage.value)
  )

  watch(
    data,
    (users) => {
      if (users?.data) store.setUsers(users?.data)
      if (users?.meta) {
        store.setTotalPages(users?.meta?.last_page)
        store.setTotalPagesNumber(users?.meta?.links)
      }
    },
    { immediate: true }
  )

  return {
    //Properties
    users,
    currentPage,
    isLoading,
    isFetching,
    totalPages,
    totalPagesNumber,

    //Methods
    getPage(page: number) {
      store.setPage(page)
    }
  }
}

export default useUsers