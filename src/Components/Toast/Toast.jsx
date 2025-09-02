import React, { useEffect } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: "#4caf50",
    error: "#f44336",
    info: "#333",
  }[type];

  return (
    <div
      style={{
        minWidth: "220px",
        background: bgColor,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        fontSize: "14px",
        marginTop: "10px", // for stacking if needed later
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
