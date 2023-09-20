<script lang="ts" setup>

const links = [
  {
    label: 'Inicio',
    to: '/'
  },
  {
    label: 'Usuarios',
    to: '/users'
  },
  {
    label: 'Tareas',
    to: '/tasks'
  }
]
</script>
<template>
  <aside
    class="fixed inset-y-0 start-0 z-30 grid h-screen w-[--sidebar-width] -translate-x-full content-start overflow-hidden bg-white transition-all rtl:translate-x-full dark:bg-gray-900 lg:z-0 lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:ring-0 rtl:lg:-translate-x-0 dark:lg:bg-transparent"
  >
    <header
      class="flex h-16 items-center bg-white px-6 ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 lg:shadow-sm"
    >
      <div>
        <RouterLink to="/">
          <div class="text-xl font-bold leading-5 tracking-tight text-gray-950 dark:text-white">
            Tasks StaffBoom
          </div>
        </RouterLink>
      </div>
    </header>
    <nav class="grid gap-y-7 overflow-y-auto overflow-x-hidden px-6 py-8">
      <UVerticalNavigation
        :links="links"
        :ui="{
          wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
          base: 'group  border-s -ms-px lg:leading-6 before:hidden',
          padding: 'p-0 ps-4',
          rounded: '',
          font: '',
          ring: '',
          active: 'text-primary-500 dark:text-primary-400 border-current font-semibold py-3',
          inactive:
            'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 py-3'
        }"
      />
    </nav>
  </aside>
</template>
