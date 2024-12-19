"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const interests = [
  { id: 1, name: "호캉스", icon: "🏨" },
  { id: 2, name: "풀빌라", icon: "🏠" },
  { id: 3, name: "게스트하우스", icon: "🏘️" },
  { id: 4, name: "전원주택", icon: "🌳" },
  { id: 5, name: "비즈니스 호텔", icon: "🏢" },
  { id: 6, name: "레저", icon: "🏄" },
  { id: 7, name: "해외숙소", icon: "🕌" },
];

export const useInterest = () => {
  const router = useRouter();
  const [selectedInterest, setSelectedInterest] = useState("");

  const handleSelect = (interest) => {
    if (!interest) {
      alert("관심사를 선택하세요");
      return;
    }
    setSelectedInterest(interest);
    console.log("interest", interest);
  };

  const handleNext = () => {
    console.log("선택된 관심사:", selectedInterest);
    router.push("/users/nickname");
    localStorage.setItem("interest", selectedInterest);
  };
  return {
    interests,
    selectedInterest,
    handleSelect,
    handleNext,
  };
};
