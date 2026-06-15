import { vOnlyNumber } from '~/directives/only-number';
import { vFocus } from '~/directives/focus';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('only-number', vOnlyNumber);
  nuxtApp.vueApp.directive('focus', vFocus);
});
