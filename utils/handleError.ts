import axios from 'axios';

type ApiErrorCallback = (status?: number) => void;

export const handleError = (err: unknown, errorCallBack?: ApiErrorCallback) => {
  if (!axios.isAxiosError(err)) {
    useAlert().showError(MESSAGES.ERROR.UNKNOWN);
    return;
  }

  const nuxtApp = useNuxtApp();
  const showError = (msg: string) => nuxtApp.runWithContext(() => useAlert().showError(msg));

  const status = err.response?.status;
  const detail = (err.response?.data as { detail?: unknown } | undefined)?.detail;

  // 1. timeout
  if (err.code === 'ECONNABORTED' || status === 408) {
    showError(MESSAGES.ERROR.TIMEOUT);
    return;
  }
  // 2. 인증 없음
  if (status === 401) {
    showError(String(detail || MESSAGES.ERROR.UNAUTHORIZED));
    return;
  }
  // 3. 권한 없음
  if (status === 403) {
    showError(String(detail || MESSAGES.STATUS.FORBIDDEN_ACCESS));
    return;
  }

  // 4. 콜백 우선 처리
  if (errorCallBack) {
    errorCallBack(status);
    return;
  }

  if (detail) {
    showError(String(detail));
    return;
  }
  showError(MESSAGES.ERROR.DEFAULT(status));
};
