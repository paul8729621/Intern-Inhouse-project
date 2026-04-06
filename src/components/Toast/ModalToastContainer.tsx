import { useToastStore } from "../../stores/toast";
import ToastView from "./view";

export default function ModalToastContainer() {
  const { toasts, removeToast } = useToastStore();
  return <ToastView toasts={toasts} onClose={removeToast} isModal />;
}
