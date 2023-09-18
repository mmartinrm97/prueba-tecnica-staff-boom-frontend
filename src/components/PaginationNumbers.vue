<script lang="ts" setup>
import { Link } from '~/interfaces/shared'

interface Props {
  totalPages: number
  currentPage: number
  totalPageNumbers: Link[]
}

interface Emits {
  (e: 'pageChanged', page: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

// const totalPages = toRef(props, 'totalPages')
// const currentPage = toRef(props, 'currentPage')

// const totalPageNumbers = ref<number[]>([])
//
// watch(
//   totalPages,
//   () => {
//     totalPageNumbers.value = [...new Array(totalPages.value)].map((v, i) => i + 1)
//   },
//   { immediate: true }
// )

const handlePageChanged = (url: string | null) => {
  if (url) {
    const matchResult = url.match(/page=(\d+)/)
    if (matchResult) {
      const page = parseInt(matchResult[1])
      emits('pageChanged', page)
    }
  }
}
</script>

<template>
  <div class="flex w-full justify-center">
    <button
      v-for="number in props.totalPageNumbers"
      :key="number"
      :class="{ active: number.active }"
      :disabled="number.url === null"
      @click="handlePageChanged(number.url)"
    >
      <span v-html="number.label" />
    </button>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}

button {
  background-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  padding: 10px;
  transition: all 0.5s;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}

button:disabled {
  cursor: not-allowed;
}

.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>