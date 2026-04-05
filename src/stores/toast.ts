import { createContext, useCallback, useContext, useState } from "react";
import type { ToastItem, ToastType } from "../components/Toast/type";

interface ToastStore {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastStore | null>(null);

export function useToastStore(): ToastStore {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastStore must be used within ToastProvider");
  return ctx;
}

export function useToastState() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, message, type, duration: 3000 };
    setToasts((prev) => [...prev, item]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}
