"use client";
import { useState } from "react";

// 커스텀 훅
export const useCustomAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // ✅ 알림 표시 함수 (기본 3초 후 자동 닫힘)
  const showAlertMessage = (message) => {
    if (showAlert) return; // ❌ 중복 실행 방지

    setAlertMessage(message);
    setShowAlert(true);

    // if (duration > 0) {
    //   setTimeout(() => {
    //     setShowAlert(false);
    //     setAlertMessage("");
    //   }, duration);
    // }
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
      <div className="fixed w-[360] inset-0 flex items-center justify-center z-50">
        {/* 배경 (클릭 시 닫기) */}
        <div className="fixed inset-0 bg-black/50" onClick={hideAlert} />

        {/* 알림 박스 */}
        <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
          <p className="mb-4 text-center whitespace-pre-line">{alertMessage}</p>
          {/* <button
            className="w-full py-2 bg-violet-800 text-black rounded hover:bg-violet-900"
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
