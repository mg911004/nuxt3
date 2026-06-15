<template>
  <NuxtRouteAnnouncer />
  <AppLoading />
  <NuxtLayout>
    <NuxtPage :keepalive="keepaliveProps" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const tabsStore = useTabsStore();

/**
 * 열린 탭에 해당하는 페이지만 KeepAlive로 메모리 캐시
 * - include: tabsStore.openPageNames (탭 닫으면 캐시도 해제)
 * - 각 페이지 defineOptions({ name }) ↔ menu.ts componentName 일치 필요
 */
const keepaliveProps = computed(() => ({
  include: tabsStore.openPageNames,
  max: MAX_TABS,
}));
</script>
