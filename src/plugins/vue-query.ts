import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { dehydrate, hydrate, QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
// Nuxt 3 app aliases
import { useState } from '#app'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 2, // 2 minutes cache time
        staleTime: 1000 * 60 * 2, // 2 minute stale time,
        refetchOnReconnect: 'always'
      }
    }
  })
  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (process.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
