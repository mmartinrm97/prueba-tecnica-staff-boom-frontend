<script lang="ts" setup>
import { User } from '~/interfaces/users'

interface Props {
  users: User[]
}

const props = defineProps<Props>()

</script>

<template>
  <ul>
    <li v-for="user of props.users" :key="user.id">
<!--      -->
      <NuxtLink click="isOpen = true" class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                :to="`/users/${user.id}`">
       {{user.id}} - {{ user.name }}
      </NuxtLink>
    </li>
  </ul>
<!--  <div>-->
<!--    <UButton label="Open" @click="isOpen = true" />-->
<!--    <UModal v-model="isOpen">-->
<!--      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">-->
<!--        <template #header>-->
<!--          <div class="flex items-center justify-between">-->
<!--            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">-->
<!--              Modal-->
<!--            </h3>-->
<!--            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />-->
<!--          </div>-->
<!--        </template>-->
<!--        <div class="">Contenido</div>-->
<!--        <template #footer>-->
<!--          <div class="">Footer</div>-->
<!--        </template>-->
<!--      </UCard>-->
<!--    </UModal>-->
<!--  </div>-->

</template>

<style scoped></style>