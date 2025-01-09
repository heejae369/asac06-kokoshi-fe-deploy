"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";
import CustomFetch from "@/feature/CustomFetch";
import { formatTimer } from "@/feature/FormatText";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/slice/userSlice";

export default function FindId() {
  const [certification, setCertification] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("인증번호가 전송되었습니다.");
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const pageRouter = (url) => {
    router.push(url);
  };

  const isOkButtonValid = verificationCode.length === 6 && timer > 0;
  const isSendButtonValid =
    name.length > 0 && phone.replace(/-/g, "").length >= 11;

  const handleNameChange = (e) => {
    // let inputText = e.currentTarget.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
    let inputText = e.currentTarget.value;

    if (inputText.length > 20) {
      inputText = inputText.slice(0, 20);
    }

    setName(inputText);
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

  const handleCodeRequest = async () => {
    const response = await CustomFetch("/users/findId/checkUser", "POST", {
      user_name: name,
      user_phone: phone /*.replace(/-/g, "")*/,
    });

    const data = await response.json();

    if (data.bool) {
      setCertification(false);
      setIsTimerActive(true);
      setTimer(180);
      setErrorMessage("");
    } else {
      setErrorMessage(data.message);
    }
  };

  const checkCode = async () => {
    const response = await CustomFetch("/users/findId/checkCode", "POST", {
      user_name: name,
      user_phone: phone /*.replace(/-/g, ""),*/,
      code: verificationCode,
    });

    const data = await response.json();
    console.log(data);

    if (data.bool) {
      console.log(data.user_email, data.created_at);
      dispatch(setUser({ email: data.user_email, createdAt: data.created_at }));
      pageRouter("/users/findId/email");
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleMessage = () => {
    setMessage("인증번호가 재전송되었습니다.");
    setErrorMessage("");
    setIsTimerActive(true);
    setTimer(180);
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
          setErrorMessage("인증시간이 초과되었습니다.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive]);

  return (
    <div className="tracking-negative flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative w-[360px] bg-white">
        <LoginHeader titleText={"아이디 찾기"} prevUrl={"/users/login"} />
        <div className="absolute left-5 top-36 text-[15px]">
          아이디를 찾기 위해서
          <br />
          <strong>이름과 휴대폰 번호</strong>를 입력해주세요.
        </div>
        <div className="absolute left-5 top-52 font-semibold">
          <input
            className="mb-1.5 h-12 w-80 rounded bg-gray-100 p-4 "
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
          />
          {certification ? (
            <>
              <input
                className="mb-1.5 h-12 w-80 rounded bg-gray-100 p-4 text-sm"
                placeholder="휴대폰 번호"
                value={phone}
                onChange={handlePhoneChange}
              />
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <button
                className={`mt-5 h-12 w-80 rounded text-sm text-white ${
                  isSendButtonValid ? "bg-[#8728ff]" : "bg-gray-300"
                }`}
                onClick={handleCodeRequest}
                disabled={!isSendButtonValid}
              >
                인증번호 전송
              </button>
            </>
          ) : (
            <>
              <input
                className="mb-1.5 h-14 w-[235px] rounded bg-gray-100 p-4 text-sm"
                value={phone}
                disabled
              />
              <button
                className="ml-2 h-14 w-[80px] rounded bg-[#8728ff] text-white"
                onClick={handleMessage}
              >
                재전송
              </button>
              <div className="relative">
                <input
                  className="mb-1.5 h-14 w-80 rounded bg-gray-100 p-4 text-sm"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={handleVerificationCode}
                />
                <span className="absolute right-10 top-4 text-[#8728ff]">
                  {formatTimer(timer)}
                </span>
              </div>
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <button
                className={`mt-6 h-12 w-80 rounded text-white ${
                  isOkButtonValid ? "bg-[#8728ff]" : "bg-gray-400"
                }`}
                onClick={checkCode}
                disabled={!isOkButtonValid}
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
      {!certification && (
        <div className="fixed bottom-10 flex h-[42px] w-80 items-center justify-center rounded-md bg-gray-800 p-4 text-xs text-white opacity-70">
          {message}
        </div>
      )}
    </div>
  );
}
