import { authFormFetch } from "@/lib/utils";
import styles from "@/styles/Mypage.module.css";
import { useState } from "react";

export const ImageUploadModal = ({
  setUserProfile,
  setUserProfileImgModalOpen,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 선택한 이미지

  // 프로필 이미지 변경 핸들러
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await authFormFetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/api/uploadProfile`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // 서버에서 반환하는 에러 메시지
        console.error("Server Error:", errorMessage);
        throw new Error("Failed to upload profile image");
      }

      const updatedData = await response.json();
      console.log("Updated data:", updatedData); // 서버 응답 확인

      if (!updatedData.user_profile_path) {
        throw new Error("Missing user_profile_path in server response");
      }

      // 업데이트된 사용자 데이터 반영
      setUserProfile(updatedData.user_profile_path);
      alert("프로필 이미지가 변경되었습니다.");
      setUserProfileImgModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error(error);
      alert("프로필 이미지 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h3>프로필 사진 변경</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          />
          <div className={styles.modalActions}>
            <button onClick={handleImageUpload} className={styles.saveButton}>
              변경
            </button>
            <button
              onClick={() => setUserProfileImgModalOpen(false)}
              className={styles.cancelButton}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
