import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { defineNuxtPlugin } from '#app';

type RequestConfig = InternalAxiosRequestConfig;

export default defineNuxtPlugin((nuxtApp) => {
  const runConfig = useRuntimeConfig();
  const authStore = useAuthStore();
  const loadingStore = useLoadingStore();

  const stopLoading = () => loadingStore.endLoading();

  const handleSessionExpired = async () => {
    stopLoading();
    await nuxtApp.runWithContext(async () => {
      await useAlert().showWarning(MESSAGES.STATUS.SESSION_EXPIRED);
      await authStore.logout();
      await navigateTo('/auth/login', { replace: true });
    });
  };

  const api = axios.create({
    baseURL: runConfig.public.API_HOST,
    // 클라이언트 쿠키를 서버로 전송
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const requestConfig = config as RequestConfig;

    if (!requestConfig.skipLoading) loadingStore.startLoading();
    // 인증 API는 토큰 없이 요청 가능
    if (requestConfig.skipAuth) return requestConfig;

    const accessToken = authStore.accessToken;

    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  });

  api.interceptors.response.use(
    (res) => {
      stopLoading();
      return res.data;
    },
    async (err) => {
      const originalRequest = err.config as RequestConfig | undefined;

      // 인증 API의 401은 "세션 만료"가 아니라 로그인 실패·리프레시 무효 등이므로 갱신·재시도하지 않음
      if (originalRequest?.url?.startsWith('/auth/')) {
        stopLoading();
        return Promise.reject(err);
      }

      // 일반 API의 401은 세션 만료이므로 리프레시·재시도
      if (err.response?.status === 401 && !originalRequest?._retry) {
        if (originalRequest) originalRequest._retry = true;

        try {
          const ok = await authStore.refreshAccessToken();
          if (!ok) {
            await handleSessionExpired();
            return Promise.reject(err);
          }

          const accessToken = authStore.accessToken;
          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            originalRequest.skipLoading = true;
            return api(originalRequest);
          }
        } catch {
          await handleSessionExpired();
          return Promise.reject(err);
        }
      }

      stopLoading();
      return Promise.reject(err);
    },
  );

  nuxtApp.provide('api', api);
});
