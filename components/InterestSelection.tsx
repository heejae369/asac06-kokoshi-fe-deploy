"use client";
import { useState } from "react";
import styles from "@/styles/interestSelection.module.css";
import { useRouter } from "next/navigation";
import { useInterest } from "@/feature/useInterest";

const InterestSelection = () => {
  const { interests, selectedInterest, handleSelect, handleNext, handleBack } =
    useInterest();

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className="mt-10">
        <img src="/ic_back.png" alt="뒤로가기" />
      </button>
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
              selectedInterest.includes(interest.name) ? styles.active : ""
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
