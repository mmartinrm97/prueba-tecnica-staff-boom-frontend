<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue'
import { getUsersResponse } from '~/composables/users/useApiUsers'
import { useQuery } from '@tanstack/vue-query'
import { User } from '~/interfaces/users'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

//Pagination
const currentPagePagination = ref<number>(1)
const paginationItems = ref(Array(100))
const perPagePagination = ref<number>(10)

watch(perPagePagination, () => {
  perPagePagination.value = Number(perPagePagination.value)
})

//Get data from endpoint
const { data, isLoading, isFetching, error, refetch } = useQuery(
  [`users?page=${currentPagePagination.value}?per_page=${perPagePagination.value}`],
  () => getUsersResponse(currentPagePagination, perPagePagination),
  {
    enabled: true,
    retry: 1
  }
)
const fromPagination = ref(1)

const labelBadgeByRole = (role_id: string) => {
  if (role_id === '1') {
    return '#AdminUser'
  }
  if (role_id === '2') {
    return '#NormalUser'
  }
  return '#WithoutRole'
}

const colorBadgeByRole = (role_id: string) => {
  if (role_id === '1') {
    return 'yellow'
  }
  if (role_id === '2') {
    return 'indigo'
  }
  return 'gray'
}

//Tabs
const tabItems = [
  {
    label: 'All users',
    role_filter: null
  },
  {
    label: 'All admin users',
    role_filter: '1'
  },
  {
    label: 'All normal users',
    role_filter: '2'
  }
]

function onTabChange(index: number) {
  const item = tabItems[index]
  roleFilter.value = item.role_filter
}

const roleFilter = ref<string | null>(null)

const filteredUsersByRoleId = (roleId: string | null): User[] | undefined => {
  if (roleId === null) {
    return data.value?.data
  }
  return data.value?.data.filter((user) => user.role_id === roleId)
}

dayjs.locale('en')
dayjs.extend(relativeTime)

const formatDate = (date: Date | undefined) => {
  if (!date) return null

  return dayjs(date).format('DD/MM/YYYY, HH:mm:ss')
}
</script>

<template>
  <TheBasePage>
    <TheHeader title="Users" />
    <!--is Loading-->
    <div v-if="isLoading">Cargando ...</div>
    <!--is Fetching-->
    <div v-else-if="isFetching">Actualizando ...</div>
    <!--    The Data-->
    <div class="flex flex-col gap-y-6">
      <UTabs :items="tabItems" class="w-full" @change="onTabChange" />
      <div
        v-if="data?.data"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <UCard v-for="user in filteredUsersByRoleId(roleFilter)" :key="user.id">
          <template #header>
            <!--          {{ // propiedad computada aquí }}-->
            <div class="flex items-center space-x-4 text-xl">
              <UAvatar :alt="user.name" />
              <h3 class="truncate font-bold">{{ user.name }}</h3>
            </div>
          </template>
          <ul>
            <li>
              <p class="text-md truncate">
                <span class="pr-2 font-bold">📧: </span>{{ user.email }}
              </p>
            </li>
            <li>
              <UTooltip>
                <template #text>
                  <span class="truncate text-sm">
                    Created at: {{ new Date(user.created_at).toLocaleString() }}</span
                  >
                </template>
                <p>
                  <span class="pr-2 font-bold">⛏:</span>{{ dayjs(user?.created_at).fromNow() }}
                </p>
              </UTooltip>
            </li>
          </ul>
          <template #footer>
            <div class="flex items-center justify-between">
              <UBadge
                :color="colorBadgeByRole(user.role_id)"
                :label="labelBadgeByRole(user.role_id)"
                variant="soft"
              />
              <NuxtLink :to="`/users/${user.id}`">
                <UButton icon="i-heroicons-eye" label="View" size="sm" />
              </NuxtLink>
            </div>
          </template>
        </UCard>
      </div>

      <!--    Pagination-->
      <nav class="grid grid-cols-3 items-center px-3 py-3 sm:px-6">
        <div class="">Showing 1 to 10 of 50 results</div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows per page:</span>

            <USelect
              v-model="perPagePagination"
              :options="[3, 5, 10, 20, 30, 40]"
              class="me-2 w-20"
              size="xs"
            />
          </div>
        </div>
        <UPagination
          v-model="currentPagePagination"
          :page-count="5"
          :total="paginationItems.length"
        />
      </nav>
    </div>
  </TheBasePage>
</template>
<style scoped></style>