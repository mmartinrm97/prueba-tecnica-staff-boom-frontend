<script lang="ts" setup>
import useUsers from '~/composables/users/useUsers'
import UserList from '~/components/users/UsersList.vue'

const { isLoading, isFetching, users, totalPages, getPage, currentPage, totalPagesNumber } =
  useUsers()
</script>

<template>
  <div>
    <h1>Listado de usuarios</h1>
    <!-- LoadingModal -->
    <div v-if="isLoading">Cargando ...</div>

    <div v-else-if="isFetching">Actualizando ...</div>

    <ClientOnly v-else>
      <div>
        <!-- Client List -->
        <UserList :users="users" />

        <!-- PaginationNumbers -->
        <PaginationNumbers
          :current-page="currentPage"
          :total-page-numbers="totalPagesNumber"
          :total-pages="totalPages"
          @page-changed="getPage"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>