import { GetServerSideProps } from "next";
import styles from "@/styles/Mypage.module.css";
import Footer from "@/components/Footer";

interface UserData {
  userPoint: number;
  coupons: number;
  userName: string;
  user_profile_path: string; // S3에서 가져온 프로필 이미지 URL
}

const Mypage = async () => {
  // 데이터 서버에서 가져오기
  const response = await fetch(
    "http://localhost:8080/users/api/userdata?userEmail=jiho@naver.com",
    {
      cache: "no-store", // 항상 최신 데이터 가져오기
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data: UserData = await response.json();
  console.log("Fetched user data:", data);

  // 프로필 이미지 URL 수정
  const fixedProfileImage = decodeURIComponent(data.user_profile_path).replace(
    "/yanolza-s3-bucket.s3.ap-southeast-2.amazonaws.com/https:/",
    ""
  );
  console.log(fixedProfileImage);

  return (
    <div className={styles.container}>
      {/* 상단 프로필 섹션 */}
      <header className={styles.header}>
        <div className={styles.profile}>
          <div
            className={styles.avatar}
            style={{
              backgroundImage: `url(${fixedProfileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className={styles.greeting}>
            <p>안녕하세요!</p>
            <p className={styles.email}>{data.userName}님</p>
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
          <p className={styles.value}>{data.userPoint} P</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.infoItem}>
          <p className={styles.label}>보유한 쿠폰</p>
          <p className={styles.value}>{data.coupons}개</p>
        </div>
      </div>
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
      <div className={styles.eventBanner}>
        <h2>Summer event!</h2>
        <p>여름 이벤트! 초특가 할인 숙소를 만나보세요.</p>
      </div>

      <Footer />
    </div>
  );
};

export default Mypage;
