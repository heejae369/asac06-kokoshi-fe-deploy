"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useGenderSelection = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (e: React.ChangeEvent<any>) => {
    setSelectedGender(e.target.value);
  };

  const handleNextClick = () => {
    alert("선택된 성별: " + selectedGender);
    // 이후 이동 로직을 추가하거나 API 요청 등 작업을 수행
    router.push("/users/interest");
    localStorage.setItem("gender", selectedGender);
  };

  return {
    selectedGender,
    handleGenderChange,
    handleNextClick,
  };
};
