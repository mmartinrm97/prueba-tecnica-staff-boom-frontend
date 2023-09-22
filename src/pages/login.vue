<script lang="ts" setup>
import { LoginInput } from '~/interfaces/auth'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '~/stores/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { fetchUser, loginUser } from '~/composables/auth/useApiAuthUser'

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const loginSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('Email is required').email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .nonempty('Password is required')
      .min(8, { message: 'Must be at least 8 characters' }),
    remember: zod.boolean().optional()
  })
)

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: loginSchema
})

const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: remember } = useField('remember')

const formData = ref<LoginInput>({
  email: '',
  password: '',
  remember: false
})

const authStore = useAuthStore()

const toast = useToast()

const authResult = useQuery({
  queryKey: ['authUser'],
  queryFn: () => fetchUser,
  enabled: false,
  retry: 1
})

const queryClient = useQueryClient()

const { isLoading, mutate } = useMutation(
  ['authUser'],
  (credentials: LoginInput) => loginUser(credentials),
  {
    onSuccess: (data) => {

      queryClient.refetchQueries(['authUser'])
      navigateTo('/')
      toast.add({
        id: 'login_success',
        title: 'Login success',
        description: 'You have successfully logged in',
        icon: 'i-heroicons-check-circle-20-solid'
      })
      authStore.setAuthUserStore(data.data)
      resetForm()
    }
  }
)

const onHandleLogin = handleSubmit(async (values) => {
  mutate({
    email: values.email,
    password: values.password,
    remember: values.remember
  })
})
</script>

<template>
  <section class="grid auto-cols-fr gap-y-6">
    <header class="-header">
      <div class="mb-4 flex justify-center">
        <div class="text-xl font-bold leading-5 tracking-tight text-gray-950 dark:text-white">
          StaffBoomPerú Tasks
        </div>
      </div>
      <h1
        class="-header-heading text-center text-2xl font-bold tracking-tight text-gray-950 dark:text-white"
      >
        Sing In
      </h1>
    </header>

    <UForm :state="formData" class="grid gap-y-6" @submit.prevent="onHandleLogin">
      <div class="grid grid-cols-1 gap-6">
        <UFormGroup v-slot="{ error }" :error="errors.email" label="Email" name="email" required>
          <UInput
            v-model="email"
            :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
            autocomplete="email"
            icon="i-heroicons-envelope"
            :disabled="isLoading"
          />
        </UFormGroup>

        <UFormGroup
          v-slot="{ error }"
          :error="errors.password"
          label="Password"
          name="password"
          required
        >
          <UInput
            v-model="password"
            :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
            autocomplete="current-password"
            icon="i-heroicons-key"
            type="password"
            :disabled="isLoading"
          />
        </UFormGroup>

        <UCheckbox v-model="remember" label="Remember me" name="remember" />
      </div>
      <div>
        <div class="grid grid-cols-1 gap-3">
          <UButton :loading="isLoading" class="flex items-center justify-center" type="submit">
            Sign In
          </UButton>
        </div>
      </div>
    </UForm>
  </section>
</template>

<style scoped></style>