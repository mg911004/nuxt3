import { defineStore } from 'pinia';
import type { User } from '~/models/user.model';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const userInfo = ref<User | null>(null);

    const setUserInfo = (tokenInfo: User) => {
      userInfo.value = tokenInfo;
    };

    const clearUserInfo = () => {
      userInfo.value = null;
    };

    const hasPermission = (permission: string) => {
      return userInfo.value?.permissions.includes(permission) ?? false;
    };

    const hasRole = (role: string) => {
      return userInfo.value?.roles.includes(role) ?? false;
    };

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      hasRole,
      hasPermission,
    };
  },
  {
    persist: true,
  },
);
