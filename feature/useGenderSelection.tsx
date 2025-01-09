"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useGenderSelection = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  // 초기 성별 선택화면의 기본값은 "남성"
  if (!selectedGender) setSelectedGender("남성");
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleNextClick = () => {
    if (!selectedGender) {
      alert("성별을 선택해주세요");
      return;
    }
    console.log("선택된 성별: " + selectedGender);
    // 이후 이동 로직을 추가하거나 API 요청 등 작업을 수행
    router.push("/users/signup/interest");
    localStorage.setItem("userGender", selectedGender);
  };

  // 뒤로가기 함수
  const handleBack = () => {
    router.back();
  };

  return {
    selectedGender,
    handleGenderChange,
    handleNextClick,
    handleBack,
  };
};
