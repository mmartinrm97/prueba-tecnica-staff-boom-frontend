<script lang="ts" setup>
import TheNavbar from '~/components/TheNavbar.vue'
</script>

<template>
  <div
    class=" min-h-screen overscroll-y-none bg-gray-50 font-normal text-gray-950 antialiased dark:bg-gray-950 dark:text-white"
  >
    <div class=" flex min-h-screen w-full overflow-x-clip">
      <TheSidebar />
      <!--    output the page content-->
      <div class="flex w-screen flex-1 flex-col lg:ps-[--sidebar-width]">
        <TheNavbar />
        <main class=" mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div class="grid auto-cols-fr gap-y-8 py-8">
            <slot />
          </div>
          <!--          <NuxtPage class="grid auto-cols-fr gap-y-8 py-8"/>-->
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>