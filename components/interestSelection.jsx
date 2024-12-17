"use client";
import { useState } from "react";
import styles from "@/styles/interestSelection.module.css";

const interests = [
  { id: 1, name: "호캉스", icon: "🏨" },
  { id: 2, name: "풀빌라", icon: "🏠" },
  { id: 3, name: "게스트하우스", icon: "🏘️" },
  { id: 4, name: "전원주택", icon: "🌳" },
  { id: 5, name: "비즈니스 호텔", icon: "🏢" },
  { id: 6, name: "레저", icon: "🏄" },
  { id: 7, name: "해외숙소", icon: "🕌" },
];

const InterestSelection = () => {
  const [selectedInterest, setSelectedInterest] = useState("");

  const handleSelect = (interest) => {
    setSelectedInterest(interest);
  };

  const handleNext = () => {
    console.log("선택된 관심사:", selectedInterest);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>관심사 선택</h2>
      <p className={styles.subtitle}>
        나의 관심사에 맞는 선택지를 선택해주세요.
        <br />홈 화면에 맞춤 컨텐츠가 제공됩니다.
      </p>

      <div className={styles.grid}>
        {interests.map((interest) => (
          <div
            key={interest.id}
            className={`${styles.card} ${
              selectedInterest === interest.name ? styles.active : ""
            }`}
            onClick={() => handleSelect(interest.name)}
          >
            <span className={styles.icon}>{interest.icon}</span>
            <span className={styles.label}>{interest.name}</span>
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default InterestSelection;
