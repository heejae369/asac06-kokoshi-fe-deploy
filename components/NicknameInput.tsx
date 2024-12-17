"use client";

import styles from "@/styles/nicknameInput.module.css";
import { useNickname } from "@/hooks/useNickname";

const NicknameInput = () => {
  const { nickname, handleNicknameChange, handleNext } = useNickname();

  // if (!isClient) return null; // 클라이언트 사이드 확인 후 렌더링

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
        onChange={handleNicknameChange}
      />
      <p>비밀번호는 글자입니둥</p>
      <button className={styles.nextButton} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default NicknameInput;
