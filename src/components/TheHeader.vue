<template>
  <header class="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
        {{ props.title }}
      </h1>
    </div>

    <div
      v-if="props.buttons?.length"
      class="flex shrink-0 flex-wrap items-center justify-start gap-3"
    >
      <NuxtLink v-for="(button, index) in props.buttons" :key="index" :to="button.to">
        <UButton :label="button.label" />
      </NuxtLink>
      <UButton />
    </div>
  </header>
</template>
<script lang="ts" setup>
type Props = {
  title: string
  buttons?: Array<{ label: string; onClick: () => void; to: string }>
}

const props = defineProps<Props>()
</script>