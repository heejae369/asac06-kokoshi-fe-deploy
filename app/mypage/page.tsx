"use client";

import React, { useState } from "react";
import styles from "@/styles/Mypage.module.css";
import Footer from "@/components/Footer";
import DEFAULT_PROFILE_IMAGE from "@/assets/img/default-profile.png";
import { useRouter } from "next/navigation";
import { authFetch, useLoginGuard } from "@/lib/utils";
import { ImageUploadModal } from "@/components/myPage/ImageUploadModal";

interface UserData {
  userPoint: number | null;
  coupons: number | null;
  userNickname: string | null;
  user_profile_path: string | null;
}
// const DEFAULT_PROFILE_IMAGE = "@/asse/default-profile.png";

const Mypage = () => {
  // useLoginGuard();

  const router = useRouter();
  const [isUserProfileImgModalOpen, setUserProfileImgModalOpen] =
    useState(false);
  const [userProfile, setUserProfile] = useState<string>("");
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
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/api/userdata?userEmail=${userEmail}`,
          {
            cache: "no-store",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data: UserData = await response.json();
        setUserData(data);
        setUserProfile(data.user_profile_path);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  // 기본 이미지 설정
  const profileImage = userProfile || DEFAULT_PROFILE_IMAGE;

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
              onClick={() => setUserProfileImgModalOpen(true)} // 모달 열기
            ></button>
            <div className={styles.greeting}>
              <p>안녕하세요!</p>
              <p className={styles.email}>
                {userData.userNickname || "사용자"}님
              </p>
            </div>
          </div>
          <a href="/mypage/editProfile" className={styles.editProfile}>
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
        {isUserProfileImgModalOpen && (
          <ImageUploadModal
            setUserProfile={setUserProfile}
            setUserProfileImgModalOpen={setUserProfileImgModalOpen}
          />
          // <div className={styles.modal}>
          //   <div className={styles.modalContent}>
          //     <h3>프로필 사진 변경</h3>
          //     <input
          //       type="file"
          //       accept="image/*"
          //       onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          //     />
          //     <div className={styles.modalActions}>
          //       <button
          //         onClick={handleImageUpload}
          //         className={styles.saveButton}
          //       >
          //         변경
          //       </button>
          //       <button
          //         onClick={() => setIsModalOpen(false)}
          //         className={styles.cancelButton}
          //       >
          //         취소
          //       </button>
          //     </div>
          //   </div>
          // </div>
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
            <a href="mypage/faq">자주 묻는 질문</a>
          </li>
          <li>
            <a href="mypage/settings">설정</a>
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
