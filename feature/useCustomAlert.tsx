"use client";
import { useState } from "react";

// 커스텀 훅
export const useCustomAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  // Alert 컴포넌트
  const AlertComponent = () => {
    if (!showAlert) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black/50" onClick={hideAlert} />
        <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
          <p className="mb-4 text-center">{alertMessage}</p>
          <button
            onClick={hideAlert}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    );
  };

  return {
    showAlertMessage,
    hideAlert,
    AlertComponent,
  };
};
