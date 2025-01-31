"use client";
import styles from "@/styles/interestSelection.module.css";
import { useInterest } from "@/feature/useInterest";
import BackAndTitle from "@/components/BackAndTitle";
import { useCustomAlert } from "@/feature/useCustomAlert";

const InterestSelection = () => {
  const {
    interests,
    selectedInterest,
    handleSelect,
    handleNext,
    showAlertMessage,
    AlertComponent,
  } = useInterest();
  // const {  } = useCustomAlert();

  return (
    <div>
      <BackAndTitle
        url={"gender"}
        title={"관심사 선택"}
        subtitle={
          "나의 관심사에 맞는 선택지를 선택해주세요.\n홈 화면에 맞춤 컨텐츠가 제공됩니다."
        }
      />
      <div className={styles.container}>
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
      <div>
        <AlertComponent />
      </div>
    </div>
  );
};

export default InterestSelection;
