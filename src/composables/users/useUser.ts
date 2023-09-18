import { APIUserResponse, User } from "~/interfaces/users";
import { useApiFetch } from "~/composables/useApiFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getUser } from "~/composables/users/usersApi";

const useUser = (id: string) => {
  const user = ref<User>()
  const queryClient = useQueryClient()

  const { isLoading, isFetching, data, isError } = useQuery(['user', id], () => getUser(id), {
    retry: false
  })

  // const userUpdateMutation = useMutation(updateUser)

  watch(
    data,
    () => {
      if (data.value) user.value = { ...data.value.data }
    },
    { immediate: true }
  )

  return {
    user,
    // userMutation: userUpdateMutation,
    isError,
    isLoading,
    isFetching,

    // Method
    // updateUser: userUpdateMutation.mutate,
    // isUpdating: computed(() => userUpdateMutation.isLoading.value),
    // isUpdatingSuccess: computed(() => userUpdateMutation.isSuccess.value),
    // isErrorUpdating: computed(() => userUpdateMutation.isError.value)
  }
}

export default useUser
