import { defineStore } from "pinia";
import { User } from "~/interfaces/users";
import { Link } from "~/interfaces/shared";

export const useUsersStore = defineStore('users', () => {
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(5)
  const users = ref<User[]>([])
  const totalPagesNumber = ref<Link[]>([])

  return {
    //state
    currentPage,
    totalPages,
    users,
    totalPagesNumber,

    //getters

    //actions
    setUsers(newUsers: User[]) {
      users.value = newUsers
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