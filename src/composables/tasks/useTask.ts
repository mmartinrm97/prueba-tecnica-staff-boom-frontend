import { APITaskResponse, Task } from "~/interfaces/tasks";
import { useApiFetch } from "~/composables/useApiFetch";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getTask, updateTask } from "~/composables/tasks/useTasksApi";

const useTask = ( id: string ) => {

  const task = ref<Task>();


  const {
    isLoading,
    isFetching,
    data,
    isError } = useQuery(
    [ 'task', id ],
    () => getTask(id),
    { retry: false }
  );

  const taskMutation = useMutation( updateTask );


  watch( data, () => {
    if ( data.value )
      task.value = {...data.value.data};
  },{ immediate: true });


  return {
    task,
    taskMutation,
    isError,
    isLoading,
    isFetching,

    // Method
    updateTask:      taskMutation.mutate,
    isUpdating:        computed( () => taskMutation.isLoading.value ),
    isUpdatingSuccess: computed( () => taskMutation.isSuccess.value ),
    isErrorUpdating:   computed( () => taskMutation.isError.value ),

  }
}

export default useTask;