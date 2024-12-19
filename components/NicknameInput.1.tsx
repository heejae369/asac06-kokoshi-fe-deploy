"use client";
import styles from "@/styles/nicknameInput.module.css";
import { useNickname } from "@/hooks/useNickname";

export const NicknameInput = () => {
  const { nickname, handleNicknameChange, handleNext, error } = useNickname();

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
      <p>닉네임은 국문, 영문,숫자만 입력이 가능합니다.</p>
      <p>중복된 닉네임입니다.</p>

      <button className={styles.nextButton} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};
