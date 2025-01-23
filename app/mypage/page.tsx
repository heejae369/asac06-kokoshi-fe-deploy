"use client";

import React, { useState } from "react";
import styles from "@/styles/Mypage.module.css";
import Footer from "@/components/Footer";
import DEFAULT_PROFILE_IMAGE from "@/assets/img/default-profile.png";
import { useRouter } from "next/navigation";
import JwtTokenHandler from "@/feature/JwtTokenHandler";

interface UserData {
  userPoint: number | null;
  coupons: number | null;
  userNickname: string | null;
  user_profile_path: string | null;
}
// const DEFAULT_PROFILE_IMAGE = "@/asse/default-profile.png";

const Mypage = () => {
  JwtTokenHandler();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 선택한 이미지
  const [userData, setUserData] = useState<UserData>({
    userPoint: null,
    coupons: null,
    userNickname: "사용자",
    user_profile_path: null,
  }); // 사용자 데이터

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  // console.log(userEmail);

  // 데이터 서버에서 가져오기
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/api/userdata?userEmail=${userEmail}`,
          {
            cache: "no-store",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  // 프로필 이미지 변경 핸들러
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("email", userEmail || "");

    try {
      const response = await fetch(
        "http://localhost:8080/users/api/uploadProfile",
        {
          method: "POST",
          body: formData,
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
      setUserData((prev) =>
        prev
          ? { ...prev, user_profile_path: updatedData.user_profile_path }
          : prev
      );
      alert("프로필 이미지가 변경되었습니다.");
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error(error);
      alert("프로필 이미지 변경에 실패했습니다.");
    }
  };

  // 기본 이미지 설정
  const profileImage = userData?.user_profile_path || DEFAULT_PROFILE_IMAGE;

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white p-4 font-sans">
        {/* <div className={styles.container}> */}
        {/* 상단 프로필 섹션 */}
        <header className={styles.header}>
          <div className={styles.profile}>
            <button
              className={styles.avatar}
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => setIsModalOpen(true)} // 모달 열기
            ></button>
            <div className={styles.greeting}>
              <p>안녕하세요!</p>
              <p className={styles.email}>
                {userData.userNickname || "사용자"}님
              </p>
            </div>
          </div>
          <a href="#" className={styles.editProfile}>
            내 정보 수정 &gt;
          </a>
        </header>

        {/* 포인트 및 쿠폰 */}
        <div className={styles.infoBox}>
          <div className={styles.infoItem}>
            <p className={styles.label}>포인트</p>
            <p className={styles.value}>
              {userData.userPoint !== null ? `${userData.userPoint} P` : "-"}
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.infoItem}>
            <p className={styles.label}>보유한 쿠폰</p>
            <p className={styles.value}>
              {userData.coupons !== null ? `${0}개` : "-"}
            </p>
          </div>
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>프로필 사진 변경</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
              <div className={styles.modalActions}>
                <button
                  onClick={handleImageUpload}
                  className={styles.saveButton}
                >
                  변경
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelButton}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 리스트 메뉴 */}
        <ul className={styles.menuList}>
          <li>
            <a href="#">위시리스트</a>
          </li>
          <li>
            <a href="reservationHistory">예약내역</a>
          </li>
          <li>
            <a href="#">1:1 카카오 문의</a>
          </li>
          <li>
            <a href="#">자주 묻는 질문</a>
          </li>
          <li>
            <a href="#">설정</a>
          </li>
        </ul>

        {/* 이벤트 배너 */}
        <button onClick={() => router.push("/yanolza/event")}>
          <img src="images/img_mypage_banner.png" alt="" />
        </button>

        <Footer />
      </div>
    </div>
  );
};

export default Mypage;
