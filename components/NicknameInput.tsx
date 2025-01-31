"use client";

import styles from "@/styles/nicknameInput.module.css";
import { useNickname } from "@/feature/useNickname";
import BackAndTitle from "@/components/BackAndTitle";

const NicknameInput = () => {
  const {
    nickname,
    handleNicknameChange,
    handleNext,
    error,
    AlertComponent,
    showAlertMessage,
  } = useNickname();

  return (
    <div>
      <BackAndTitle
        url={"interest"}
        title={"닉네임 입력"}
        subtitle={
          "앱 내에서 사용할 닉네임을 입력해주세요.\n닉네임을 입력하지 않을 시, 랜덤생성이 됩니다."
        }
      />
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={handleNicknameChange}
        />
        {/* <p>닉네임은 국문, 영문,숫자만 입력이 가능합니다.</p>
      <p>중복된 닉네임입니다.</p> */}
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.nextButton} onClick={handleNext}>
          다음
        </button>
      </div>
      <div>
        <AlertComponent />
      </div>
    </div>
  );
};

export default NicknameInput;
