<script lang="ts" setup>
import { Task, TaskFormData } from '~/interfaces/tasks'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateTask } from '~/composables/tasks/tasksApi'

interface Props {
  tasks: Task[]
}

const props = defineProps<Props>()

const toast = useToast()

const queryClient = useQueryClient()

//edit
const { mutate: updateTaskMutate, isLoading: isLoadingUpdateMutation } = useMutation(
  (form: TaskFormData) => updateTask(form),
  {
    onSuccess: (dataTask) => {
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Tarea actualizada!'
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
          icon: 'i-heroicons-information-circle',
          title: `${value}`,
          color: 'red'
        })
      }
    }
  }
)

const onSubmitUpdate = (task: TaskFormData) => {
  const newTask = {
    ...task,
    is_done: !task.is_done
  }
  updateTaskMutate(newTask)
}
</script>

<template>
  <div class="py-4">
    <div v-for="task of props.tasks" :key="task.id">
      <div class="mb-6">
        <UCard class="transition-all hover:shadow-lg">
          <template #header>
            <div class="flex justify-between">
              <NuxtLink :to="`/tasks/${task.id}`">
                <UButton color="gray" icon="i-heroicons-eye" label="Ver más detalles" />
              </NuxtLink>
              <UButton
                color="gray"
                icon="i-heroicons-check-circle"
                label="Marcar como completada"
                @click="onSubmitUpdate(task)"
                :disabled="task.is_done"
              />
            </div>
          </template>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Título: {{ task.title }}
          </h3>
          <p class="font-medium text-gray-900 dark:text-white">Descripción:</p>
          {{ task.description }}
          <template #footer>
            <!--            Completado: if is_done is true render a check icon, else another icon-->
            <div class="flex items-center justify-between">
              <div>
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >Fecha de expiración: {{ task.expiration_date }}</span
                >
              </div>
              <div class="items-center p-2">
                <div>
                  <span class="text-sm text-gray-500 dark:text-gray-400">Estado: </span>
                  <Icon
                    v-if="task.is_done"
                    class="text-green-500 dark:text-green-400"
                    name="material-symbols:check-circle-rounded"
                  />
                  <Icon
                    v-else
                    class="text-red-500 dark:text-red-400"
                    name="material-symbols:cancel-rounded"
                  />
                </div>
              </div>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>