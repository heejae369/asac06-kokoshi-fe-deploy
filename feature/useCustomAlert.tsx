"use client";
import { useState } from "react";

// 커스텀 훅
export const useCustomAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // ✅ 알림 표시 함수 (기본 3초 후 자동 닫힘)
  const showAlertMessage = (message, duration = 3000, callback) => {
    setAlertMessage(message);
    setShowAlert(true);

    if (duration > 0) {
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
        if (callback) callback(); // 콜백 함수 실행
      }, duration);
    }
  };

  // ✅ 닫기 함수
  const hideAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  // ✅ Alert 컴포넌트 (useCallback 제거)
  const AlertComponent = () => {
    if (!showAlert) return null;

    return (
      <div className="fixed inset-0 z-50 flex w-[360] items-center justify-center">
        {/* 배경 (클릭 시 닫기) */}
        <div className="fixed inset-0 bg-black/50" onClick={hideAlert} />

        {/* 알림 박스 */}
        <div className="relative mx-4 w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
          <p className="mb-4 whitespace-pre-line text-center">{alertMessage}</p>
          {/* <button
            className="w-full rounded bg-violet-800 py-2 text-black hover:bg-violet-900"
            onClick={hideAlert}
          >
            확인
          </button> */}
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
