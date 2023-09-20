import { User } from '~/interfaces/users'
import { useAuthStore } from '~/stores/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { fetchUser, loginUser } from '~/composables/auth/useApiAuthUser'
import { UserTokenData } from "~/interfaces/auth";

const useLoginMutation = () => {
  const store = useAuthStore()
  const { authUser, isLoggedIn } = storeToRefs(store)

  const queryClient = useQueryClient()

  // const authUserFetch = useQuery(['authUser'], () => fetchUser(), {
  //   enabled: isLoggedIn.value,
  //   retry: 1,
  //   onSuccess: (data) => {
  //     store.setAuthUserStore(data)
  //   }
  // })

  const authUserMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['authUser'],
        exact: true
      })

      queryClient.refetchQueries({
        queryKey: ['authUser']
      })

      queryClient.setQueryData(['authUser'], data)
    }
  })

  return {
    // Properties
    authUser,
    // authUserFetch,
    isLoggedIn,
    authUserMutation,

    setAuthUser(authUser: UserTokenData | null) {
      //if authUser is null then just return
      if (!authUser) return
      store.setAuthUserStore(authUser)
    },
  }
}

export default useLoginMutation
