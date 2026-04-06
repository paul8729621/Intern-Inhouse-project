import type { ToastItem } from "./type";
import styles from "./style.module.scss";

interface Props {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  isModal?: boolean;
}

const ICON_MAP: Record<ToastItem["type"], string> = {
  success: "✔",
  error: "✖",
  warning: "!",
  info: "ℹ",
};

export default function ToastView({ toasts, onClose, isModal }: Props) {
  return (
    <div className={`${styles.wrapper} ${isModal ? styles.modal : styles.global}`}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          <div className={styles.content}>
            <span className={styles.icon}>{ICON_MAP[toast.type]}</span>
            <span className={styles.message}>{toast.message}</span>
            <button className={styles.close} onClick={() => onClose(toast.id)}>
              ✕
            </button>
          </div>
          <div className={styles.progress}>
            <span
              className={styles.bar}
              style={{ animationDuration: `${toast.duration ?? 3000}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
