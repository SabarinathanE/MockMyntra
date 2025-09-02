import { useState } from "react";
import Toast from "../../Components/Toast/Toast";

export const useToaster = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info", duration = 1000) => {
    setToast({ message, type, duration });
  };

  const ToastContainer = () =>
    toast ? (
      <div
        style={{
          position: "fixed",
          bottom: "20px", // stays at bottom
          right: "20px",  // stays at right
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      </div>
    ) : null;

  return { showToast, ToastContainer };
};
