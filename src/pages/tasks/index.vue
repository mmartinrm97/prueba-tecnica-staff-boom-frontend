<script lang="ts" setup>
import useTasks from '~/composables/tasks/useTasks'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { TaskFormData } from '~/interfaces/tasks'
import { createTask } from '~/composables/tasks/tasksApi'

definePageMeta({ middleware: ['auth'] })

const { isLoading, isFetching, tasks, totalPages, getPage, currentPage, totalPagesNumber } =
  useTasks()

const createTaskSchema = toTypedSchema(
  zod.object({
    title: zod
      .string()
      .nonempty('Title is required')
      .min(10, { message: 'Title must be at least 10 characters long' }),
    description: zod.string().nonempty('Description is required'),
    expiration_date: zod.string().nonempty('Expiration date is required')
  })
)

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: createTaskSchema
})

const form = ref({
  id: '',
  title: '',
  description: '',
  expiration_date: '',
  is_done: false
})

const toast = useToast()

const queryClient = useQueryClient()


//create a computed function to filter tasks by is_completed
const filteredTasksByIsCompleted = (isCompleted: boolean) => {
  return tasks.value.filter((task) => task.is_done === isCompleted)
}

const { mutate: createTaskMutate, isLoading: isLoadingCreateMutation } = useMutation(
  (form: TaskFormData) => createTask(form),
  {
    onSuccess: (dataTask) => {
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Tarea creada!'
      })
      queryClient.invalidateQueries({
        queryKey: ['tasks?page='],
        exact: false
      })
      queryClient.refetchQueries(['tasks?page='], {
        exact: false
      })
      queryClient.setQueryData(['task', dataTask?.data.id], dataTask)
    },
    onError: (error: any) => {
      const errors = JSON.parse(error.message)
      //iterate through error and add to toast
      console.log(errors)
      for (const [key, value] of Object.entries(errors)) {
        toast.add({
          id: `${key}.${value}`,
          icon: 'i-heroicons-information-circle',
          title: `${value}`,
          color: 'red'
        })
      }
    }
  }
)

//Modal open
const isOpen = ref(false)
const onSubmit = () => {
  createTaskMutate(form.value)
  resetForm()
  isOpen.value = false
}

//Tabs
const items = [
  {
    slot: 'completeTasks',
    label: 'Tareas Completadas'
  },
  {
    slot: 'incompleteTasks',
    label: 'Tareas incompletas'
  }
]
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-3xl">Listado de tareas</h1>
      <div class="flex items-center gap-x-6">
        <UInput
          :trailing="false"
          color="white"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Buscar tareas por título o descripción"
          size="sm"
        />
        <UButton label="Crear tarea" @click="isOpen = true" />
      </div>
    </div>

    <UModal v-model="isOpen">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Crear nueva tarea
            </h3>
          </div>
        </template>

        <div>
          <UForm :state="form" class="space-y-3 px-4" @submit="onSubmit">
            <UFormGroup label="Title" name="title" required>
              <UInput v-model="form.title" />
            </UFormGroup>
            <UFormGroup label="Description" name="description" required>
              <UInput v-model="form.description" autocomplete="description" />
            </UFormGroup>
            <UFormGroup label="Expiration Date" name="password" required>
              <UInput v-model="form.expiration_date" type="date" />
            </UFormGroup>
            <UButton type="submit">Crear tarea</UButton>
          </UForm>
        </div>
        <template #footer>
          <span class="text-sm">Ánimo y suerte en tu próxima actividad!</span>
        </template>
      </UCard>
    </UModal>

    <!-- LoadingModal -->
    <div v-if="isLoading">Cargando ...</div>

    <div v-else-if="isFetching">Actualizando ...</div>

    <ClientOnly v-else>
      <div class="py-8">
        <UTabs :items="items" class="w-full">
          <template #default="{ item, index, selected }">
            <div class="relative flex items-center gap-2 truncate">
              <span class="truncate">{{ item.label }}</span>
              <span
                v-if="selected"
                class="bg-primary-500 dark:bg-primary-400 absolute -right-4 h-2 w-2 rounded-full"
              />
            </div>
          </template>
          <template #completeTasks>
            <div>
              <!-- Client List -->
              <TasksList :tasks="filteredTasksByIsCompleted(true)" />

              <!--     PaginationNumbers -->
              <PaginationNumbers
                :current-page="currentPage"
                :total-page-numbers="totalPagesNumber"
                :total-pages="totalPages"
                @page-changed="getPage"
              />
            </div>
          </template>
          <template #incompleteTasks ="{item}">
            <div>
              <!-- Client List -->
              <TasksList :tasks="filteredTasksByIsCompleted(false)" />

              <!--     PaginationNumbers -->
              <PaginationNumbers
                :current-page="currentPage"
                :total-page-numbers="totalPagesNumber"
                :total-pages="totalPages"
                @page-changed="getPage"
              />
            </div>
          </template>
        </UTabs>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>