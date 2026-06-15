<template>
  <section class="error-page">
    <div class="error-page__inner">
      <p class="error-page__status">{{ statusCode }}</p>
      <h1 class="error-page__title">{{ title }}</h1>
      <p v-if="devMessage" class="error-page__dev">{{ devMessage }}</p>

      <div class="error-page__actions">
        <button type="button" class="error-page__btn error-page__btn--primary" @click="goHome">홈으로 이동</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

definePageMeta({ layout: false });

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => Number(props.error?.statusCode) || 500);

const title = computed(() => {
  switch (statusCode.value) {
    case 404:
      return '요청하신 페이지를 찾을 수 없습니다.';
    case 403:
      return '접근 권한이 없습니다.';
    default:
      return '페이지를 표시하는 중 오류가 발생했습니다.';
  }
});

const devMessage = computed(() => {
  if (!import.meta.dev) return '';
  return props.error?.message ?? '';
});

const goHome = () => {
  clearError({ redirect: '/' });
};
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 2rem 1rem;
}

.error-page__inner {
  width: 100%;
  max-width: 28rem;
  padding: 2.25rem 2rem;
  text-align: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px rgb(15 23 42 / 4%);
}

.error-page__status {
  margin: 0 0 0.5rem;
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1e3a5f;
}

.error-page__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
}

.error-page__desc {
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
}

.error-page__dev {
  margin: 0 0 1.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.4rem;
  word-break: break-word;
}

.error-page__actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.error-page__btn {
  font-size: 0.8125rem;
  padding: 0.5rem 0.9rem;
  border-radius: 0.4rem;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  cursor: pointer;
}

.error-page__btn:hover {
  background: #f1f5f9;
}

.error-page__btn--primary {
  background: #1e3a5f;
  border-color: #1e3a5f;
  color: #fff;
}

.error-page__btn--primary:hover {
  background: #17304f;
}
</style>
