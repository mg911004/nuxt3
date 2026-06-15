type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

type AlertOptions = {
  title?: string;
  text: string;
  icon?: AlertIcon;
};

const BUTTON_LABELS = {
  CONFIRM: '확인',
  CANCEL: '취소',
} as const;

const SWAL_PRE_LINE_CLASS = 'swal-pre-line';

const swalTextOptions = (text: string) => ({
  text,
  customClass: { htmlContainer: SWAL_PRE_LINE_CLASS },
});

export const useAlert = () => {
  const { $swal } = useNuxtApp();

  const fire = (options: AlertOptions) => {
    return $swal.fire({
      ...(options.title ? { title: options.title } : {}),
      ...swalTextOptions(options.text),
      icon: options.icon ?? 'info',
      confirmButtonText: BUTTON_LABELS.CONFIRM,
    });
  };

  const confirm = async (text: string): Promise<boolean> => {
    const result = await $swal.fire({
      ...swalTextOptions(text),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: BUTTON_LABELS.CONFIRM,
      cancelButtonText: BUTTON_LABELS.CANCEL,
      reverseButtons: true,
      focusCancel: true,
    });

    return result.isConfirmed;
  };

  const showInfo = (text: string, title?: string) => fire({ text, title, icon: 'info' });
  const showSuccess = (text: string, title?: string) => fire({ text, title, icon: 'success' });
  const showWarning = (text: string, title?: string) => fire({ text, title, icon: 'warning' });
  const showError = (text: string, title?: string) => fire({ text, title, icon: 'error' });

  return { confirm, showInfo, showSuccess, showWarning, showError };
};
