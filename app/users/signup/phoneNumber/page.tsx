"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";
import modal from "@/styles/modal.module.css";
import Image from "next/image";
import barImage from "@/assets/barImage.png";
import checkImage from "@/assets/checkImage.png";
import { formatTimer } from "@/feature/FormatText";
import CustomFetch from "@/feature/CustomFetch";

export default function FindId() {
  const [certification, setCertification] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("인증번호가 전송되었습니다.");
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [carrierText, setCarrierText] = useState("통신사");
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [sendButtonText, setSendButtonText] = useState("인증받기");

  const isOkButtonValid = verificationCode.length === 6 && timer > 0;
  const isSendButtonValid =
    name.length > 0 &&
    phone.replace(/-/g, "").length >= 11 &&
    carrierText != "통신사";

  const router = useRouter();

  const pageRouter = (url) => {
    router.push(url);
  };

  const handleInputChange = (e, type) => {
    let inputText = e.currentTarget.value;
    if (type === "name") {
      inputText = inputText.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
      if (inputText.length > 20) inputText = inputText.slice(0, 20);
      setName(inputText);
    } else if (type === "phone") {
      inputText = inputText.replace(/[^0-9]/g, "");
      let formattedText = "";
      if (inputText.length <= 3) formattedText = inputText;
      else if (inputText.length <= 7)
        formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3)}`;
      else
        formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3, 7)}-${inputText.slice(7, 11)}`;
      setPhone(formattedText);
    } else if (type === "verificationCode") {
      inputText = inputText.replace(/[^0-9]/g, "");
      if (inputText.length > 6) inputText = inputText.slice(0, 6);
      setVerificationCode(inputText);
    }
  };

  const handleCertificationButton = () => {
    setModalOpen(true);
    setCertification(true);
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

  const handleSelectCarrier = (carrier) => {
    setCertification(true);
    setSelectedCarrier(carrier);
  };

  const modalClose = () => {
    setCarrierText(selectedCarrier == "" ? "통신사" : selectedCarrier);
    setModalOpen(false);
  };

  const codeRequest = async () => {
    const response = await CustomFetch(
      "/users/findId/signUpCheckUser",
      "POST",
      {
        user_name: name,
        carrier: carrierText,
        user_phone: phone.replace(/-/g, ""),
      }
    );

    const data = await response.json();

    if (data.bool) {
      setMessage(
        sendButtonText === "인증받기"
          ? "인증번호가 전송 되었습니다."
          : "인증번호가 재전송되었습니다."
      );

      setSendButtonText("재전송");
      setCertification(false);
      setIsTimerActive(true);
      setTimer(180);
      setErrorMessage("");
    }
  };

  const checkCode = async () => {
    const response = await CustomFetch(
      "/users/findId/signUpCheckCode",
      "POST",
      {
        user_name: name,
        carrier: carrierText,
        user_phone: phone.replace(/-/g, ""),
        code: verificationCode,
      }
    );

    const data = await response.json();

    if (data.bool) {
      localStorage.setItem("userPhoneNumber", phone);
      pageRouter("/users/signup/birthday");
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="tracking-negative flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative w-[360px] bg-white">
        <LoginHeader
          titleText={"휴대폰 번호를\n입력해주세요."}
          prevUrl={"/users/login"}
        />
        <div className="relative left-5 top-[109px] w-[320px] font-semibold">
          <input
            className="mb-1.5 h-[55px] w-80 rounded bg-gray-100 p-4 "
            placeholder="이름"
            value={name}
            onChange={(e) => handleInputChange(e, "name")}
          />
          <button
            className={`mb-1.5 flex h-14 w-80 rounded p-4 ${carrierText === "통신사" ? "text-gray-400" : "text-black"} bg-gray-100`}
            onClick={handleCertificationButton}
          >
            {carrierText}
          </button>
          <div className="flex">
            <input
              className="mb-1.5 h-14 w-[235px] rounded bg-gray-100 p-4 text-sm"
              placeholder="휴대폰 번호"
              onChange={(e) => handleInputChange(e, "phone")}
              value={phone}
            />
            <button
              className={`ml-2 h-14 w-[80px] ${isSendButtonValid ? "bg-[#8728ff]" : "bg-[#B2B2B2]"} rounded text-[13px] text-white`}
              onClick={codeRequest}
              disabled={!isSendButtonValid}
            >
              {sendButtonText}
            </button>
          </div>
          <div className="relative">
            <input
              className="mb-1.5 h-14 w-80 rounded bg-gray-100 p-4 text-sm"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => handleInputChange(e, "verificationCode")}
            />
            {isTimerActive && (
              <span className="absolute right-[24px] top-[14px] text-[#8728ff]">
                {formatTimer(timer)}
              </span>
            )}
          </div>
          {errorMessage && (
            <div className="text-sm text-red-500">{errorMessage}</div>
          )}
          <button
            className={`mt-6 h-12 w-80 rounded text-white ${
              isOkButtonValid ? "bg-[#8728ff]" : "bg-[#B2B2B2]"
            }`}
            onClick={checkCode}
            disabled={!isOkButtonValid}
          >
            다음
          </button>
        </div>
        {modalOpen && (
          <div
            className={modal["modal-container"]}
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                modalClose();
              }
            }}
          >
            <div className={modal["modal-content"]}>
              <div className="flex w-[294px] flex-col gap-[21px] text-[14px] font-semibold tracking-tighter">
                <div className="mt-[18px] flex justify-center">
                  <Image src={barImage} width={77} height={3} alt="" />
                </div>
                <div className="mb-[5px] mt-[10px] text-[16px] font-bold">
                  통신사 선택
                </div>
                {["SKT", "KT", "LG U+", "알뜰폰"].map((carrier) => (
                  <button
                    key={carrier}
                    className="flex items-center justify-between"
                    onClick={() => handleSelectCarrier(carrier)}
                  >
                    <span
                      className={`${selectedCarrier === carrier && "text-[#8728ff]"}`}
                    >
                      {carrier}
                    </span>
                    {selectedCarrier === carrier && (
                      <Image
                        src={checkImage}
                        alt="Checked"
                        width={17}
                        height={17}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {!certification && (
          <div className="fixed bottom-10 ml-5 flex h-[42px] w-[320px] items-center justify-center rounded-md bg-gray-800 p-4 text-xs text-white opacity-70">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
