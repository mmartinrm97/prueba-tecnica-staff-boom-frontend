<script lang="ts" setup>
import useUser from '~/composables/users/useUser'

const { id } = useRoute().params
const router = useRouter();

const { user, isLoading, isFetching, isError } =
  useUser(id as string)

// watch( userMutation.isSuccess, () => {
//   setTimeout(() => {
//     userMutation.reset();
//   },2000)
// });
//
// watch( isError, () => {
//   if( isError.value )
//     router.replace('/users')
// });

</script>

<template>
  <div>
    <h2>User details for {{ id }}.</h2>
<!--    <h3 v-if="isUpdating">Guardando...</h3>-->
<!--    <h3 v-if="isUpdatingSuccess">Guardado</h3>-->
    <!-- LoadingModal -->
    <div v-if="isLoading">Cargando ...</div>

    <div v-else-if="isFetching">Actualizando ...</div>
    <ClientOnly v-if="user">
      <div>
        <h1>{{ user.name }}</h1>
        <form @submit.prevent="">
          <input
            type="text"
            placeholder="Nombre"
            v-model="user.name"
          />
          <br>
          <input
            type="text"
            placeholder="Dirección"
            v-model="user.email"
          />
          <br>

          <button
            type="submit"

          >Guardar</button>

        </form>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>