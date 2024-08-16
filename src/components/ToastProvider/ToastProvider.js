import React from "react";
import useKeyDown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const memoizedEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown("Escape", memoizedEscape);

  function updateToasts(message, variant) {
    const newToasts = [
      ...toasts,
      { id: crypto.randomUUID(), message, variant },
    ];
    setToasts(newToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, updateToasts, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
