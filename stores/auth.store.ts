import { defineStore } from 'pinia';
import type { User } from '~/models/user.model';
import type { UserLogin } from '~/schemas/user.schema';

let refreshInFlight: Promise<boolean> | null = null;

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref<string | null>(null);

  const parseAccessTokenPayload = (token: string): User => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  };

  const clearSession = () => {
    accessToken.value = null;
    useUserStore().clearUserInfo();
  };

  const requestAccessTokenRefresh = async (): Promise<boolean> => {
    try {
      const res = await authApi().refreshAccessToken();
      if (!res.data?.accessToken) return false;

      accessToken.value = res.data.accessToken;

      // 사용자정보 갱신도 필요할지??
      // useUserStore().setUserInfo(parseAccessTokenPayload(res.data.accessToken));
      return true;
    } catch {
      return false;
    }
  };

  /** 리프레시 토큰으로 액세스 토큰을 재발급한다. 동시 호출은 한 번의 요청으로 합친다. */
  const refreshAccessToken = (): Promise<boolean> => {
    if (refreshInFlight) return refreshInFlight;

    refreshInFlight = (async () => {
      try {
        return await requestAccessTokenRefresh();
      } finally {
        refreshInFlight = null;
      }
    })();

    return refreshInFlight;
  };

  const login = async (payload: UserLogin): Promise<User | undefined> => {
    try {
      const res = await authApi().login(payload);
      accessToken.value = res.data.accessToken;
      return parseAccessTokenPayload(res.data.accessToken);
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      await authApi().logout();
    } catch (error) {
      console.error(error);
    } finally {
      clearSession();
    }
  };

  return {
    accessToken,
    refreshAccessToken,
    login,
    logout,
  };
});
