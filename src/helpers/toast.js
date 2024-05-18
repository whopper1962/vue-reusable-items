import { toast } from "vue3-toastify";

const defaultOptions = {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  theme: toast.THEME.COLORED,
};

export const useToastHelper = () => {
  const showSuccessToast = (message, options = {}) => {
    toast(message, {
      ...defaultOptions,
      type: toast.TYPE.SUCCESS,
      ...options,
    });
  };

  const showErrorToast = (message, options = {}) => {
    toast(message, {
      ...defaultOptions,
      type: toast.TYPE.ERROR,
      ...options,
    });
  };

  return { showSuccessToast, showErrorToast };
};
