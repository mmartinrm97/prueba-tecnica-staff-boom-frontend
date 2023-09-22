<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue'

definePageMeta({ middleware: ['auth'] })

// const headerButtons = [
//   {
//     label: 'Logout',
//     onClick: () => {
//       const authStore = useAuthStore()
//       authStore.logoutUserStore()
//       // navigateTo('/login')
//     },
//     to: '/login'
//   }
// ]
</script>

<template>
  <div>
    <TheHeader title="Dashboard" />
  </div>
</template>

<style scoped></style>