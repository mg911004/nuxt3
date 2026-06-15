import type { Directive } from 'vue';

type InputElement = HTMLInputElement & {
  _onlyNumberHandler?: (event: Event) => void;
};

const handleOnlyNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const filtered = target.value.replace(/\D/g, '');

  if (target.value === filtered) {
    return;
  }

  target.value = filtered;
  target.dispatchEvent(new Event('input', { bubbles: true }));
};

export const vOnlyNumber: Directive<InputElement> = {
  mounted(el) {
    el._onlyNumberHandler = handleOnlyNumberInput;
    el.addEventListener('input', el._onlyNumberHandler);
  },
  unmounted(el) {
    if (!el._onlyNumberHandler) {
      return;
    }

    el.removeEventListener('input', el._onlyNumberHandler);
    delete el._onlyNumberHandler;
  },
};
