<template>
  <div class="admin-shell">
    <AppHeader />
    <div class="admin-shell__body">
      <AppSidebar />
      <div class="admin-shell__main-col">
        <main class="admin-shell__content">
          <slot />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f1f5f9;
}

.admin-shell__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.admin-shell__main-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
}

.admin-shell__content {
  flex: 1;
  overflow: auto;
  padding: 1.5rem 1.75rem;
}
</style>
