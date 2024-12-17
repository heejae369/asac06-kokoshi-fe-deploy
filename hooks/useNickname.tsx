"use client";
import { useState, useEffect } from "react";

export const useNickname = () => {
  const [nickname, setNickname] = useState("");
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true); // 클라이언트 사이드 확인
  // }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNext = () => {
    if (!nickname) {
      alert("닉네임이 입력되지 않아 랜덤 닉네임이 설정됩니다.");
      setNickname("랜덤닉네임");
    } else {
      console.log("입력된 닉네임:", nickname);
    }
  };

  return { nickname, handleNicknameChange, handleNext };
};
