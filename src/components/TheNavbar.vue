<script lang="ts" setup>
import { useAuthStore } from '~/stores/authStore'
import { useSidebarStore } from '~/stores/sidebarStore'
import { storeToRefs } from 'pinia'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const authUser = useAuthStore()

//get the first letter of the user
const firstLetter = computed(() => {
  if (authUser.authUser?.user.name === undefined) return
  return authUser.authUser?.user.name.charAt(0)
})

const sidebarStore = useSidebarStore()
const { sidebarOpened } = storeToRefs(sidebarStore)

const auth = useAuthStore()

async function onHandleLogout() {
  await auth.logoutUserStore()
  navigateTo('/login')
}

const items = [
  [
    {
      label: authUser?.authUser?.user.email,
      slot: 'account',
      disabled: true
    }
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => {
        onHandleLogout()
      }
    }
  ]
]
</script>
<template>
  <div class="sticky top-0 z-20 overflow-x-clip">
    <nav
      class="flex h-16 items-center gap-x-4 bg-white px-4 shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 md:px-6 lg:px-8"
    >
      <button
        class="-btn focus:ring-primary-600 dark:focus:ring-primary-500 relative -ms-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 outline-none transition duration-75 hover:text-gray-500 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-500 dark:hover:text-gray-400 lg:hidden"
        @click="sidebarOpened = true"
      >
        <span class="sr-only"> Expand sidebar </span>
        <Icon class="text-black dark:text-white" name="iconamoon:menu-burger-horizontal-bold" />
      </button>

      <div class="ms-auto flex items-center gap-x-4">
        <div class="flex">
          <ClientOnly>
            <UButton
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              aria-label="Theme"
              color="gray"
              variant="ghost"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="h-8 w-8" />
            </template>
          </ClientOnly>
          <div class="inline-block">
            <button
              class="-btn focus:ring-primary-600 dark:focus:ring-primary-500 relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 outline-none transition duration-75 hover:text-gray-500 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span class="sr-only"> Open notifications </span>
              <Icon class="text-black dark:text-white" name="material-symbols:notifications" />
              <div
                class="absolute start-full top-0 z-[1] -ms-1 -translate-x-1/2 rounded-md bg-white rtl:translate-x-1/2 dark:bg-gray-900"
              >
                <div
                  class="bg-custom-50 text-custom-600 ring-custom-600/10 dark:bg-custom-400/10 dark:text-custom-400 dark:ring-custom-400/30 flex min-w-[theme(spacing.4)] shrink-0 items-center justify-center gap-x-1 whitespace-nowrap rounded-md px-0.5 text-xs font-medium tracking-tighter ring-1 ring-inset"
                >
                  <span>5</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div aria-expanded="true" class="-trigger flex cursor-pointer">
          <UDropdown
            :items="items"
            :popper="{ placement: 'bottom-start' }"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
          >
            <button aria-label="User menu" type="button">
              <div
                :style="{
                  backgroundImage: `url('https://ui-avatars.com/api/?name=${firstLetter}&amp;color=FFFFFF&amp;background=09090b')`
                }"
                class="-avatar h-9 w-9 rounded-full bg-cover bg-center"
              ></div>
            </button>
            <template #account="{ item }">
              <div class="text-left">
                <p>Signed in as:</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
              </div>
            </template>
            <template #item="{ item }">
              <span class="truncate">{{ item.label }}</span>
              <UIcon
                :name="item.icon"
                class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
              />
            </template>
          </UDropdown>
        </div>
      </div>
    </nav>

    <USlideover v-model="sidebarOpened" side="left">
      <UCard
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
        class="flex flex-1 flex-col"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Slideover
            </h3>
            <UButton
              class="-my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="sidebarOpened = false"
            />
          </div>
        </template>
        <div class="h-full" />
      </UCard>
    </USlideover>
  </div>
</template>