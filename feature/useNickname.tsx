"use client";
import { useState, useEffect } from "react";
import { generateRandomNickname } from "@/feature/generateRandomNickname";
// import { localStorageApi } from "@/lib/localStorageApi";
import CustomFetch from "@/feature/CustomFetch";
import { postApiSendingTest } from "@/feature/postApiSending";
import { useRouter } from "next/navigation";

export const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
    const value = e.target.value || "";
    setNickname(value);

    const { isValid, message } = validateNickname(value);
    if (!isValid) {
      setError(message);
    } else {
      setError("");
    }
  };

  // 닉네임 저장 함수
  const saveNicknameToLocalStorage = (value) => {
    localStorage.setItem("nickname", value); // 로컬 스토리지에 닉네임 저장
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    const { isValid, message } = validateNickname(nickname);
    if (!isValid) return;

    if (!nickname) {
      const randomNickname = generateRandomNickname(); // 랜덤 닉네임 생성
      alert(
        `닉네임이 입력되지 않아 랜덤 닉네임이 설정됩니다: ${randomNickname}`
      );
      setNickname(randomNickname);
    } else {
      alert(`닉네임이 저장되었습니다: ${nickname}`);
      console.log("닉네임:", nickname);
    }
    // 닉네임 유효성이 통과되면 로컬 스토리지에 저장
    saveNicknameToLocalStorage(nickname);

    router.push("/users/signup/terms");
  };

  return {
    nickname,
    error,
    handleNicknameChange,
    handleNext,
    saveNicknameToLocalStorage,
  };
};
