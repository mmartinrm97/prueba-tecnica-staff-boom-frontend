import { defineStore } from 'pinia'
import { ref } from 'vue'

// Composition api style
export const useSidebarStore = defineStore('sidebar', () => {
  //States
  const sidebarOpened = ref(true)

  //Actions
  function setSidebarOpen() {
    sidebarOpened.value = !sidebarOpened.value
  }

  return { sidebarOpened, setSidebarOpen }
})
