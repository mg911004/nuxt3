export default defineNuxtRouteMiddleware((to) => {
  // const authStore = useAuthStore();
  // if (to.path.startsWith('/auth')) {
  //   if (authStore.accessToken) {
  //     return navigateTo('/');
  //   }
  //   return;
  // }
  // if (!authStore.accessToken) {
  //   await authStore.refreshAccessToken();
  // }
  // if (authStore.accessToken) {
  //   return;
  // }
  // return navigateTo('/auth/login');
});
