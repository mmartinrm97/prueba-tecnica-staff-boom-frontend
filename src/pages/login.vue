<script lang="ts" setup>
import { LoginInput } from '~/interfaces/auth'
import { useAuthStore } from '~/stores/authStore'

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const formData = ref<LoginInput>({
  email: 'admin@example.com',
  password: 'password'
})

// const myLogin = async (credentials: LoginInput) => {
//   await useApiFetch('/sanctum/csrf-cookie')
//
//   await useApiFetch('/login', {
//     method: 'POST',
//     body: {
//       email: credentials.email,
//       password: credentials.password
//     }
//   })
//
//   const { data, error } = await useApiFetch('/api/my-user')
//
// }
//
// const userAuthMutation = useMutation(myLogin)

const auth = useAuthStore()

async function onHandleLogin() {
  if (auth.isLoggedIn) return

  const { error } = await auth.login(formData.value)

  if (!error.value) {
    navigateTo('/')

    // userAuthMutation.mutate(formData.value)
  }
}

async function onHandleLogout() {
  await auth.logout()
}
</script>

<template>
  <section class="grid auto-cols-fr gap-y-6">
    <header class="-header">
      <div class="mb-4 flex justify-center">
        <div
          class=" text-xl font-bold leading-5 tracking-tight text-gray-950 dark:text-white"
        >
          StaffBoomPerú Tasks
        </div>
      </div>

      <h1
        class="-header-heading text-center text-2xl font-bold tracking-tight text-gray-950 dark:text-white"
      >
        Iniciar Sesión
      </h1>
    </header>

    <form class=" grid gap-y-6" @submit.prevent="onHandleLogin">
      <div class="-component-ctn grid grid-cols-1 gap-6">
        <div class="col-span-1">
          <div class="-field-wrp">
            <div class="grid gap-y-2">
              <div class="flex items-center justify-between gap-x-3">
                <label
                  class="-field-wrp-label inline-flex items-center gap-x-3"
                  for="data.email"
                >
                  <span class="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                    Email address<sup class="text-danger-600 dark:text-danger-400 font-medium"
                      >*</sup
                    >
                  </span>
                </label>
              </div>

              <div class="grid gap-y-2">
                <div
                  class="-wrapper focus-within:ring-primary-600 dark:focus-within:ring-primary-500 -text-input flex overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-950/10 transition duration-75 focus-within:ring-2 dark:bg-white/5 dark:ring-white/20"
                >
                  <div class="min-w-0 flex-1">
                    <input
                      id="data.email"
                      v-model="formData.email"
                      autocomplete="on"
                      autofocus="autofocus"
                      class=" block w-full border-none bg-transparent py-1.5 pe-3 ps-3 text-base text-gray-950 outline-none transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 disabled:placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                      required="required"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <div class="-field-wrp">
            <div class="grid gap-y-2">
              <div class="flex items-center justify-between gap-x-3">
                <label
                  class="-field-wrp-label inline-flex items-center gap-x-3"
                  for="data.password"
                >
                  <span class="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                    Password<sup class="text-danger-600 dark:text-danger-400 font-medium">*</sup>
                  </span>
                </label>
              </div>

              <div class="grid gap-y-2">
                <div
                  class="-wrapper focus-within:ring-primary-600 dark:focus-within:ring-primary-500 -text-input flex overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-950/10 transition duration-75 focus-within:ring-2 dark:bg-white/5 dark:ring-white/20"
                >
                  <div class="min-w-0 flex-1">
                    <input
                      v-model="formData.password"
                      autocomplete="current-password"
                      class=" block w-full border-none bg-transparent py-1.5 pe-3 ps-3 text-base text-gray-950 outline-none transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      required="required"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <div class="-field-wrp">
            <div class="grid gap-y-2">
              <div class="flex items-center justify-between gap-x-3">
                <label
                  class="-field-wrp-label inline-flex items-center gap-x-3"
                  for="data.remember"
                >
                  <input
                    id="data.remember"
                    class="-input text-primary-600 focus:ring-primary-600 checked:focus:ring-primary-500/50 dark:checked:bg-primary-500 dark:focus:ring-primary-500 dark:checked:focus:ring-primary-400/50 rounded border-none bg-white shadow-sm ring-1 ring-gray-950/10 transition duration-75 checked:ring-0 focus:ring-2 focus:ring-offset-0 disabled:pointer-events-none disabled:bg-gray-50 disabled:text-gray-50 disabled:checked:bg-current disabled:checked:text-gray-400 dark:bg-white/5 dark:ring-white/20 dark:disabled:bg-transparent dark:disabled:ring-white/10 dark:disabled:checked:bg-gray-600"
                    type="checkbox"
                  />

                  <span class="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                    Recuérdame
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class=" -actions grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3">
<!--          :disabled="userAuthMutation.isLoading.value"-->
          <button

            class=" -size-md -color-primary bg-primary-600 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 -btn-action relative inline-grid grid-flow-col items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70"
            type="submit"
          >
            <!--            <LoadingSpinner />-->

            <span class="-label"> Sign in </span>

            <!--            <span style="display: none" x-show="isUploadingFile"> Uploading file... </span>-->
          </button>
        </div>
      </div>
    </form>

    <!--    <button v-if="auth.isLoggedIn" @click="onHandleLogout">Logout</button>-->
<!--    <div v-if="userAuthMutation.isLoading.value">Iniciando sesión</div>-->
<!--    <div v-if="userAuthMutation.isSuccess.value">Login exitoso</div>-->
  </section>
</template>

<style scoped></style>