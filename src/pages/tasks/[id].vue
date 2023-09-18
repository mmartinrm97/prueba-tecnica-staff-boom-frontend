<script lang="ts" setup>
import useTask from '~/composables/tasks/useTask'
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteTask, updateTask } from "~/composables/tasks/tasksApi";
import { TaskFormData } from "~/interfaces/tasks";

const { id } = useRoute().params

definePageMeta({ middleware: ['auth'] })

const { task, isLoading, isFetching } = useTask(id as string)


const form = ref({
  id: task.value?.id,
  title: task.value?.title,
  description: task.value?.description,
  expiration_date: task.value?.expiration_date
})


watch(task, () => {
  form.value.id = task.value?.id,
  form.value.title = task.value?.title
  form.value.description = task.value?.description
  form.value.expiration_date = task.value?.expiration_date
})


const toast = useToast()

const queryClient = useQueryClient()

const { mutate: deleteTaskMutate, isLoading: isLoadingDeleteMutation } = useMutation(
  (id: string) => deleteTask(id),
  {
    onSuccess: (dataTask) => {
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Tarea eliminada!'
      })
      queryClient.invalidateQueries({
        queryKey: ['tasks?page='],
        exact: false
      })
      queryClient.refetchQueries(['tasks?page='], {
        exact: false
      })
      // queryClient.setQueryData(['task', dataTask?.data.id], dataTask)
    },
    onError: (error: any) => {
      const errors = JSON.parse(error.message)
      //iterate through error and add to toast
      console.log(errors)
      for (const [key, value] of Object.entries(errors)) {
        toast.add({
          icon: 'i-heroicons-x-mark-circle',
          title: `${value}`,
          color: 'red'
        })
      }
    }
  }
)

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

//Modal open
const isOpen = ref(false)

const onSubmitDelete = () => {
  deleteTaskMutate(id as string)
  isOpen.value = false
  navigateTo('/tasks')
}

const onSubmitUpdate = () => {
  updateTaskMutate(form.value as TaskFormData)
}

const getBack = () => navigateTo('/tasks')

</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1>Detalles de tarea</h1>
      <div class="flex space-x-4">
        <UButton color="gray" label="Volver a la lista" @click="getBack()" />

        <UButton color="red" label="Eliminar tarea" @click="isOpen = true" />

      </div>
    </div>

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start gap-x-7">
              <Icon class="h-7 w-7 text-red-500" name="i-heroicons-trash-20-solid" />
              <h3 class="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                Eliminar tarea
              </h3>
            </div>
            <UButton
              class="-my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="">
          <p class="text-gray-500">
            ¿Estás seguro de que deseas eliminar esta tarea?. Esta acción no se puede deshacer.
          </p>
        </div>
        <div class="mt-2 gap-x-6 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <UButton label="Eliminar" color="red" @click="onSubmitDelete"
                   :loading="isLoadingDeleteMutation"/>
          <UButton color="gray" label="Cancelar" @click="isOpen = false" />
        </div>
      </UCard>
    </UModal>

    <div v-if="isLoading">Cargando ...</div>

    <div v-else-if="isFetching">Actualizando ...</div>
    <ClientOnly v-else>
      <div>
        <UForm :state="form" class="space-y-3 p-4">
          <UFormGroup label="Title" name="title" required>
            <UInput v-model="form.title" />
          </UFormGroup>
          <UFormGroup label="Description" name="description" required>
            <UInput v-model="form.description" autocomplete="description" />
          </UFormGroup>
          <UFormGroup label="Expiration Date" name="password" required>
            <UInput v-model="form.expiration_date" type="date" />
          </UFormGroup>
          <UButton type="submit" @click="onSubmitUpdate" :loading="isLoadingUpdateMutation">Actualizar tarea</UButton>
        </UForm>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>