import React from "react";

function useKeyDown(key, callback) {
  React.useEffect(() => {
    function runCallback(event) {
      if (event.code === key) {
        callback(event);
      }
    }

    window.addEventListener("keydown", runCallback);

    return () => {
      window.removeEventListener("keydown", runCallback);
    };
  }, [key, callback]);
}

export default useKeyDown;
