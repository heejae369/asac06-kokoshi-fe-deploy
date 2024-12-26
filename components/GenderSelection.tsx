"use client";
import styles from "@/styles/genderSelection.module.css";
import { useGenderSelection } from "@/feature/useGenderSelection";

const GenderSelection = () => {
  const { selectedGender, handleGenderChange, handleNextClick, handleBack } =
    useGenderSelection();

  return (
    <div className={styles.container}>
      {/* 뒤로가기 버튼 */}
      <button onClick={handleBack} className="mt-10">
        <img src="/ic_back.png" alt="뒤로가기" />
      </button>
      <h2 className={styles.title}>성별 선택</h2>
      <p className={styles.subtitle}>회원님의 성별을 선택해주세요.</p>

      <div className={styles.radioGroup}>
        <label
          className={`${styles.radioLabel} ${
            selectedGender === "남성" ? styles.active : ""
          }`}
        >
          <input
            type="radio"
            value="남성"
            checked={selectedGender === "남성"}
            onChange={handleGenderChange}
          />
          남성
        </label>
        <label
          className={`${styles.radioLabel} ${
            selectedGender === "여성" ? styles.active : ""
          }`}
        >
          <input
            type="radio"
            value="여성"
            checked={selectedGender === "여성"}
            onChange={handleGenderChange}
          />
          여성
        </label>
        <label
          className={`${styles.radioLabel} ${
            selectedGender === "기타" ? styles.active : ""
          }`}
        >
          <input
            type="radio"
            value="기타"
            checked={selectedGender === "기타"}
            onChange={handleGenderChange}
          />
          기타
        </label>
      </div>

      <button className={styles.nextButton} onClick={handleNextClick}>
        다음
      </button>
    </div>
  );
};

export default GenderSelection;
