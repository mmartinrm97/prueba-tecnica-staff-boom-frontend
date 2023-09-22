<script lang="ts" setup></script>

<template>
  <div
    class="min-h-screen overscroll-y-none bg-gray-50 font-normal text-gray-950 antialiased dark:bg-gray-950 dark:text-white"
  >
    <div class="flex min-h-screen w-full overflow-x-clip">
      <TheSidebar />
      <!--    output the page content-->
      <div class="flex w-screen flex-1 flex-col lg:ps-[--sidebar-width]">
        <TheNavbar />
        <main class="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <UContainer>
              <slot />
            <!--          <UContainer-->
            <!--            :ui="{-->
            <!--              base: 'grid auto-cols-fr gap-y-8',-->
            <!--              padding: 'py-8'-->
            <!--            }"-->
            <!--            as="section"-->
            <!--          >-->
            <!--            <slot />-->
            <!--          </UContainer>-->
            <!--            <section class="grid auto-cols-fr gap-y-8 py-8">-->
            <!--              <slot />-->
            <!--            </section>-->
          </UContainer>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
