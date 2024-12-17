"use client";
import { useState } from "react";
import styles from "@/styles/nicknameInput.module.css";

const NicknameInput = () => {
  const [nickname, setNickname] = useState();

  const handleChange = (e) => {
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>닉네임 입력</h2>
      <p className={styles.subtitle}>
        앱 내에서 사용할 닉네임을 입력해주세요. <br />
        닉네임을 입력하지 않을 시, 랜덤생성이 됩니다.
      </p>

      <input
        type="text"
        className={styles.input}
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={handleChange}
      />

      <button className={styles.nextButton} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default NicknameInput;
