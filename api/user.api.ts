import type { User } from '~/models/user.model';

export const userApi = () => {
  const { $api } = useNuxtApp();

  return {
    getUserMe: () => $api.get<User>('/users/me'),
  };
};
