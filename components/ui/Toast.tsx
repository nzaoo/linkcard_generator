import { ReactNode } from 'react';

export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useToast() {
  return {
    toasts: [],
    removeToast: () => {},
    showSuccess: (msg?: string) => {},
    showError: (msg?: string) => {},
  };
}

export function ToastContainer() {
  return null;
} 