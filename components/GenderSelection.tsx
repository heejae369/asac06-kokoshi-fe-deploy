"use client";
import { useState } from "react";
import styles from "@/styles/genderSelection.module.css";
import { useRouter } from "next/navigation";

const GenderSelection = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (e: React.ChangeEvent<any>) => {
    setSelectedGender(e.target.value);
  };

  const handleNextClick = () => {
    alert("선택된 성별: " + selectedGender);
    // 이후 이동 로직을 추가하거나 API 요청 등 작업을 수행
    router.push("/users/interest");
    localStorage.setItem("nickname", selectedGender);
  };

  return (
    <div className={styles.container}>
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

      <button
        className={styles.nextButton}
        onClick={
          // () => router.push("/users/interest")
          handleNextClick
        }
      >
        다음
      </button>
    </div>
  );
};

export default GenderSelection;
