<script lang="ts" setup>
type Theme = 'light' | 'dark'

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme
}

const appConfig = useAppConfig()
appConfig.ui.primary = 'orange'
appConfig.ui.notifications.position = 'top-0 right-0'

setColorTheme('light')
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<style scoped></style>