import type { User } from '~/models/user.model';
import type { UserLogin } from '~/schemas/user.schema';

export const authApi = () => {
  const { $api } = useNuxtApp();

  return {
    login: (payload: UserLogin) => $api.post('/auth/login', payload, { skipAuth: true }),
    signup: (payload: User) => $api.post('/auth/signup', payload, { skipAuth: true }),
    logout: () => $api.post('/auth/logout', undefined),
    refreshAccessToken: () => $api.post('/auth/refresh', undefined, { skipAuth: true }),
  };
};
