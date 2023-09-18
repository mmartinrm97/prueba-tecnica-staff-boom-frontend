<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";

definePageMeta({ middleware: ["auth"] });

const authUser = useAuthStore();
</script>

<template>
  <div>
    <h1 class="text-3xl">Bienvenido</h1>

    <pre>{{authUser.authUser.name}} </pre>
  </div>
</template>

<style scoped></style>
