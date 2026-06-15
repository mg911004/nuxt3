export default defineNuxtRouteMiddleware((to) => {
  // const publicPages = ['/', '/auth'];
  // if (publicPages.includes(to.path)) {
  //   return;
  // }
  // const userStore = useUserStore();
  // if (!userStore.userInfo) {
  //   return navigateTo('/login');
  // }
  // const routePermissionMap: Record<string, string> = {
  //   '/defect': 'DEFECT_VIEW',
  //   '/defect/create': 'DEFECT_CREATE',
  // };
  // const requiredPermission = routePermissionMap[to.path];
  // if (requiredPermission && !userStore.hasPermission(requiredPermission)) {
  //   throw createError({
  //     statusCode: 403,
  //     statusMessage: 'Forbidden',
  //   });
  // }
});
