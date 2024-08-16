import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function dismissAll(event) {
      if (event.code === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", dismissAll);

    return () => {
      window.removeEventListener("keydown", dismissAll);
    };
  }, []);

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
