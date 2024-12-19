"use client";
import { useState, useEffect } from "react";

export const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  // 닉네임 유효성 검사 함수
  const validateNickname = (value) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    if (!value) {
      return { isValid: false, message: "닉네임을 입력해주세요." };
    }

    if (!nicknameRegex.test(value)) {
      return {
        isValid: false,
        message: "닉네임은 한글, 영문, 숫자만 입력 가능합니다.",
      };
    }

    if (value.length < 2 || value.length > 10) {
      return {
        isValid: false,
        message: "닉네임은 2자 이상 10자 이하로 입력해주세요.",
      };
    }

    return { isValid: true, message: "" };
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    const { isValid, message } = validateNickname(value);
    if (!isValid) {
      setError(message);
    } else {
      setError("");
    }
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    const { isValid, message } = validateNickname(nickname);

    if (!nickname) {
      alert("닉네임이 입력되지 않아 랜덤 닉네임이 설정됩니다.");
      setNickname("랜덤닉네임");
    } else {
      console.log("입력된 닉네임:", nickname);
    }
  };

  return { nickname, error, handleNicknameChange, handleNext };
};
