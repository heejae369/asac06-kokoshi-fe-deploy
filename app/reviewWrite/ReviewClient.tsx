"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/ReviewWrite.module.css";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useCustomAlert } from "@/feature/useCustomAlert";
import MainHeaders from "@/components/MainHeaders";
import { authFormFetch } from "@/lib/utils";

const ReviewClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString: string = searchParams.get("data");
  const param = decodeURIComponent(queryString);

  const [rating, setRating] = useState<number>(0); // 별점 상태
  const [reviewText, setReviewText] = useState<string>(""); // 리뷰 텍스트 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // 업로드된 이미지 상태
  const { showAlertMessage, AlertComponent } = useCustomAlert();
  // 별점 설정
  const handleRating = (value: number) => {
    setRating(value);
  };

  // 파일 업로드 처리
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newImages = Array.from(event.target.files);

    // 최대 5개의 이미지 제한
    if (images.length + newImages.length > 5) {
      // alert("최대 5개의 이미지만 업로드할 수 있습니다.");
      showAlertMessage("최대 5개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    setImages([...images, ...newImages]);
    setIsModalOpen(false); // 모달 닫기
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // 등록 버튼 클릭
  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim() === "") {
      // alert("별점과 후기를 모두 작성해주세요.");
      showAlertMessage("별점과 후기를 모두 작성해주세요.");
      return;
    }
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("review_text", reviewText);
      formData.append("reservationRoomId", param);
      // 이미지 파일들 추가
      images.forEach((image, index) => {
        formData.append("image", image);
      });
      // API 요청
      const response = await authFormFetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/review`,
        {
          method: "POST",
          body: formData,
          // FormData를 사용할 때는 Content-Type 헤더를 설정안함
          // 브라우저가 자동으로 multipart/form-data로 설정
        }
      );
      const result = await response.json();
      console.log("Success:", result);
      // alert("후기가 성공적으로 등록되었습니다!");
      showAlertMessage("후기가 성공적으로 등록되었습니다!");

      router.push("/mypage");
      // 폼 초기화
      // setRating(0);
      // setReviewText("");
      // setImages([]);
    } catch (error) {
      console.error("Error:", error);
      alert("후기 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className={styles.container}>
        {/* 제목 */}
        <div className="px-5">
          <MainHeaders
            title={"후기 작성하기"}
            backIcon={true}
            cartIcon={false}
          />
        </div>

        {/* 별점 */}
        <div className={styles.ratingSection}>
          <p className={styles.ratingValue}>{rating.toFixed(1)}</p>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <span
                key={i}
                className={`${styles.star} ${i < rating ? styles.filledStar : ""}`}
                onClick={() => handleRating(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <p className={styles.ratingInfo}>숙소에 대한 별점을 눌러주세요.</p>
        </div>

        <hr className={styles.hr} />

        {/* 후기 작성 입력 */}
        <div className={styles.reviewInput}>
          <p>후기 작성하기</p>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="숙소에 대한 상세한 후기를 입력해주세요."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        {/* 사진 업로드 */}
        <div className={styles.imageUploadContainer}>
          <button
            className={styles.imageUploadButton}
            onClick={() => setIsModalOpen(true)}
          >
            + 사진 업로드
          </button>

          <div className={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className={styles.uploadedImage}
                />
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button
                className={styles.modalButton}
                onClick={() => {
                  // alert("사진 찍기 기능이 호출되었습니다.");
                  showAlertMessage("사진 찍기 기능이 호출되었습니다");
                  setIsModalOpen(false);
                }}
              >
                사진 찍기
              </button>
              <label htmlFor="imageInput" className={styles.modalButton}>
                사진 보관함
              </label>
              <input
                type="file"
                id="imageInput"
                className={styles.hiddenInput}
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <button
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        )}
        <Footer />
        {/* 등록 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          등록하기
        </button>
      </div>
      <div>
        <AlertComponent />
      </div>
    </div>
  );
};

export default ReviewClient;
