"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";

export default function FindId() {
  const [certification, setCertification] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("인증번호가 전송되었습니다.");
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const pageRouter = () => {
    router.push("/users/findId/email");
  };

  const isOkButtonValid = verificationCode.length === 6 && timer > 0;
  const isSendButtonValid =
    name.length > 0 && phone.replace(/-/g, "").length >= 11;

  const handleNameChange = (e) => {
    let inputText = e.currentTarget.value.replace(/\s/g, "");

    if (inputText.length > 20) {
      inputText = inputText.slice(0, 20);
    }

    setName(inputText);
  };

  const handleSend = () => {
    if (name !== "유성환" || phone.replace(/-/g, "") !== "01022952483") {
      setErrorMessage("존재하지 않는 회원입니다.");
      return;
    } else {
      setCertification(false);
      setIsTimerActive(true);
      setTimer(180);
      setErrorMessage("");
    }
  };

  const handlePhoneChange = (e) => {
    const inputText = e.currentTarget.value.replace(/[^0-9]/g, "");
    let formattedText = "";

    if (inputText.length <= 3) {
      formattedText = inputText;
    } else if (inputText.length <= 7) {
      formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3)}`;
    } else {
      formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3, 7)}-${inputText.slice(7, 11)}`;
    }

    setPhone(formattedText);
  };

  const handleMessage = () => {
    setMessage("인증번호가 재전송되었습니다.");
    setErrorMessage("");
    setIsTimerActive(true);
    setTimer(180);
  };

  const handleOk = () => {
    if (verificationCode !== "111111") {
      setErrorMessage("인증번호가 일치하지 않습니다.");
      return;
    } else {
      pageRouter();
      setErrorMessage("");
    }
  };

  const handleVerificationCode = (e) => {
    let inputText = e.currentTarget.value.replace(/[^0-9]/g, "");

    if (inputText.length > 6) {
      inputText = inputText.slice(0, 6);
    }

    setVerificationCode(inputText);
  };

  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive]);

  useEffect(() => {
    if (timer === 0) {
      setErrorMessage("인증시간이 초과되었습니다.");
    }
  }, [timer]);

  const formatTimer = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, []);

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans tracking-negative">
      <div className="w-[360px] bg-white relative">
        <LoginHeader titleText={"아이디 찾기"} />
        <div className="absolute top-36 left-5 text-[15px]">
          아이디를 찾기 위해서
          <br />
          <strong>이름과 휴대폰 번호</strong>를 입력해주세요.
        </div>
        <div className="absolute top-52 left-5 font-semibold">
          <input
            className="w-80 h-[55px] mb-1.5 p-4 bg-gray-100 rounded "
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
          />
          {certification ? (
            <>
              <input
                className="w-80 h-[55px] mb-1.5 p-4 bg-gray-100 rounded text-sm"
                placeholder="휴대폰 번호"
                value={phone}
                onChange={handlePhoneChange}
              />
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <button
                className={`w-80 h-12 mt-5 rounded text-white text-sm ${
                  isSendButtonValid ? "bg-[#8728ff]" : "bg-gray-400"
                }`}
                onClick={handleSend}
                disabled={!isSendButtonValid}
              >
                인증번호 전송
              </button>
            </>
          ) : (
            <>
              <input
                className="w-[235px] h-14 mb-1.5 p-4 bg-gray-100 rounded text-sm"
                value={phone}
                disabled
              />
              <button
                className="w-[80px] h-14 ml-2 bg-[#8728ff] text-white rounded"
                onClick={handleMessage}
              >
                재전송
              </button>
              <div className="relative">
                <input
                  className="w-80 h-14 p-4 mb-1.5 bg-gray-100 rounded text-sm"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={handleVerificationCode}
                />
                <span className="absolute top-4 right-10 text-[#8728ff]">
                  {formatTimer(timer)}
                </span>
              </div>
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <button
                className={`w-80 h-12 mt-6 rounded text-white ${
                  isOkButtonValid ? "bg-[#8728ff]" : "bg-gray-400"
                }`}
                onClick={handleOk}
                disabled={!isOkButtonValid}
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
      {!certification && (
        <div className="w-80 h-[42px] flex items-center justify-center fixed bottom-8 bg-gray-800 text-white text-xs p-4 rounded-md opacity-70">
          {message}
        </div>
      )}
    </div>
  );
}
