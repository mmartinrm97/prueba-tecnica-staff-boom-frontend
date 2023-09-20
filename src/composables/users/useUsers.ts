import { useUsersStore } from '~/stores/usersStore'
import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { getUsersResponse } from '~/composables/users/usersApi'

const useUsers = () => {
  const store = useUsersStore()

  const { users, totalPages, currentPage, totalPagesNumber } = storeToRefs(store)

  const { isLoading, isFetching, data } = useQuery(['users?page=', currentPage], () =>
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
    },
    setTotalPages(totalPages: number) {
      store.setTotalPages(totalPages)
    }
  }
}

export default useUsers;