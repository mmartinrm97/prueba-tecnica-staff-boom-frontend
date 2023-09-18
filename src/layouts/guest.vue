<script lang="ts" setup>
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-normal text-gray-950 antialiased dark:bg-gray-950 dark:text-white">
    <div class="-layout flex min-h-screen items-center">
     <div class="-main-ctn w-full">
       <main class="-main mx-auto my-16 w-full bg-white px-6 py-12 shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 sm:max-w-lg sm:rounded-xl sm:px-12">
         <slot />
       </main>
     </div>
    </div>
  </div>
</template>

<style scoped></style>
