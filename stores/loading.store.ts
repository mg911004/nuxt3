import { defineStore } from 'pinia';

/** 스피너 최소 표시 시간(ms). 짧은 API 응답 시 깜빡임 방지 */
const MIN_VISIBLE_MS = 300;

export const useLoadingStore = defineStore('loadingStore', () => {
  const loadingCount = ref(0);
  const visible = ref(false);
  const visibleSince = ref(0);
  const hideTimer = ref<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (!hideTimer.value) return;

    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  };

  const showLoading = () => {
    clearHideTimer();
    visible.value = true;
    visibleSince.value = Date.now();
  };

  const scheduleHide = () => {
    clearHideTimer();

    const elapsed = Date.now() - visibleSince.value;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimer.value = setTimeout(() => {
      visible.value = false;
      hideTimer.value = null;
    }, remaining);
  };

  const startLoading = () => {
    loadingCount.value += 1;
    if (loadingCount.value === 1) {
      showLoading();
    }
  };

  const endLoading = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1);
    if (loadingCount.value !== 0) return;

    scheduleHide();
  };

  return {
    visible,
    startLoading,
    endLoading,
  };
});
