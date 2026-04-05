import React from "react";
import { ToastContext, useToastState } from "./stores/toast";
import MarketingReviewPopPage from "./pages/marketing/MarketingReviewPopPage";

function ToastProvider({ children }: { children: React.ReactNode }) {
  const store = useToastState();
  return <ToastContext.Provider value={store}>{children}</ToastContext.Provider>;
}

export default function App() {
  return (
    <ToastProvider>
      <MarketingReviewPopPage />
    </ToastProvider>
  );
}
