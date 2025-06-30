import { ReactNode } from 'react';

export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useToast() {
  return {
    toasts: [],
    removeToast: () => {},
    showSuccess: () => {},
    showError: () => {},
  };
}

export function ToastContainer() {
  return null;
} 