"use client";
import { useState } from "react";
export const handleImageUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이미지 업로드 핸들러
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/users/profileImg", {
        method: "POST",
        body: formData,
        // FormData를 사용할 때는 Content-Type 헤더를 설정하지 않음
        // 브라우저가 자동으로 multipart/form-data로 설정
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload success:", result);
      setIsModalOpen(false);

      // 필요한 경우 여기서 프로필 이미지 상태를 업데이트할 수 있습니다
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };
};
