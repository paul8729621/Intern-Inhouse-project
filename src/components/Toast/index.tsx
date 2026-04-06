import { useToastStore } from "../../stores/toast";
import ToastView from "./view";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  return <ToastView toasts={toasts} onClose={removeToast} />;
};

export default ToastContainer;
