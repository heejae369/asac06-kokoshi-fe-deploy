"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";
import modal from "@/styles/modal.module.css";
import Image from "next/image";
import barImage from "@/assets/barImage.png";
import checkImage from "@/assets/checkImage.png";

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

  const handleNameChange = (e) => {
    let inputText = e.currentTarget.value.replace(/\s/g, "");

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

  const handleVerificationCodeChange = (e) => {
    let inputText = e.currentTarget.value.replace(/[^0-9]/g, "");

    if (inputText.length > 6) {
      inputText = inputText.slice(0, 6);
    }

    setVerificationCode(inputText);
  };

  const handleCertificationButton = () => {
    setModalOpen(true);
    setCertification(true);
  };

  const handleCertificationSend = () => {
    if (
      name !== "유성환" ||
      carrierText !== "LG U+" ||
      phone.replace(/-/g, "") !== "01022952483"
    ) {
      setCertification(true);
      setErrorMessage("회원정보가 일치하지 않습니다.");
      return;
    } else {
      sendButtonText === "인증받기"
        ? setMessage("인증번호가 전송 되었습니다.")
        : setMessage("인증번호가 재전송되었습니다.");
      setSendButtonText("재전송");
      setCertification(false);
      setIsTimerActive(true);
      setTimer(180);
      setErrorMessage("");
    }
  };

  const handleOk = () => {
    if (verificationCode !== "111111") {
      setErrorMessage("인증번호가 일치하지 않습니다.");
      return;
    } else {
      setErrorMessage("");
    }
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

  const handleSelectCarrier = (carrier) => {
    setCertification(true);
    setSelectedCarrier(carrier);
  };

  const modalClose = () => {
    setCarrierText(selectedCarrier == "" ? "통신사" : selectedCarrier);
    setModalOpen(false);
  };
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans tracking-negative">
      <div className="w-[360px] bg-white relative">
        <LoginHeader
          titleText={"휴대폰 번호를\n입력해주세요."}
          prevUrl={"/users/login"}
        />
        <div className="relative w-[320px] top-[109px] left-5 font-semibold">
          <input
            className="w-80 h-[55px] mb-1.5 p-4 bg-gray-100 rounded "
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
          />
          <button
            className={`flex w-80 h-14 mb-1.5 p-4 rounded ${carrierText === "통신사" ? "text-gray-400" : "text-black"} bg-gray-100`}
            onClick={handleCertificationButton}
          >
            {carrierText}
          </button>
          <div className="flex">
            <input
              className="w-[235px] h-14 mb-1.5 p-4 bg-gray-100 rounded text-sm"
              placeholder="휴대폰 번호"
              onChange={handlePhoneChange}
              value={phone}
            />
            <button
              className={`w-[80px] h-14 ml-2 ${isSendButtonValid ? "bg-[#8728ff]" : "bg-[#B2B2B2]"} text-white text-[13px] rounded`}
              onClick={handleCertificationSend}
              disabled={!isSendButtonValid}
            >
              {sendButtonText}
            </button>
          </div>
          <div className="relative">
            <input
              className="w-80 h-14 p-4 mb-1.5 bg-gray-100 rounded text-sm"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            {isTimerActive && (
              <span className="absolute top-[14px] right-[24px] text-[#8728ff]">
                {formatTimer(timer)}
              </span>
            )}
          </div>
          {errorMessage && (
            <div className="text-sm text-red-500">{errorMessage}</div>
          )}
          <button
            className={`w-80 h-12 mt-6 rounded text-white ${
              isOkButtonValid ? "bg-[#8728ff]" : "bg-[#B2B2B2]"
            }`}
            onClick={handleOk}
            disabled={!isOkButtonValid}
          >
            확인
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
              <div className="w-[294px] flex flex-col gap-[21px] tracking-tighter text-[14px] font-semibold">
                <div className="mt-[18px] flex justify-center">
                  <Image src={barImage} width={77} height={3} alt="" />
                </div>
                <div className="text-[16px] mt-[1opx] mb-[5px] font-bold">
                  통신사 선택
                </div>
                <button
                  className="flex justify-between items-center"
                  onClick={() => handleSelectCarrier("SKT")}
                >
                  <span
                    className={`${selectedCarrier === "SKT" && "text-[#8728ff]"}`}
                  >
                    SKT
                  </span>
                  {selectedCarrier === "SKT" && (
                    <Image
                      src={checkImage}
                      alt="Checked"
                      width={17}
                      height={17}
                    />
                  )}
                </button>
                <button
                  className="flex justify-between items-center"
                  onClick={() => handleSelectCarrier("KT")}
                >
                  <span
                    className={`${selectedCarrier === "KT" && "text-[#8728ff]"}`}
                  >
                    KT
                  </span>
                  {selectedCarrier === "KT" && (
                    <Image
                      src={checkImage}
                      alt="Checked"
                      width={17}
                      height={17}
                    />
                  )}
                </button>
                <button
                  className="flex justify-between items-center"
                  onClick={() => handleSelectCarrier("LG U+")}
                >
                  <span
                    className={`${selectedCarrier === "LG U+" && "text-[#8728ff]"}`}
                  >
                    LG U+
                  </span>
                  {selectedCarrier === "LG U+" && (
                    <Image
                      src={checkImage}
                      alt="Checked"
                      width={17}
                      height={17}
                    />
                  )}
                </button>
                <button
                  className="flex justify-between items-center"
                  onClick={() => handleSelectCarrier("알뜰폰")}
                >
                  <span
                    className={`${selectedCarrier === "알뜰폰" && "text-[#8728ff]"}`}
                  >
                    알뜰폰
                  </span>
                  {selectedCarrier === "알뜰폰" && (
                    <Image
                      src={checkImage}
                      alt="Checked"
                      width={17}
                      height={17}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {!certification && (
          <div className="w-[320px] h-[42px] ml-5 flex items-center justify-center fixed bottom-10 bg-gray-800 text-white text-xs p-4 rounded-md opacity-70">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
