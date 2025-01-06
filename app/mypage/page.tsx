import { GetServerSideProps } from "next";
import styles from "@/styles/Mypage.module.css";
import Footer from "@/components/Footer";

interface MypageProps {
  points: number;
  coupons: number;
  username: string;
}

const Mypage = ({ points, coupons, username }: MypageProps) => {
  return (
    <div className={styles.container}>
      {/* 상단 프로필 섹션 */}
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.avatar}></div>
          <div className={styles.greeting}>
            <p>안녕하세요!</p>
            <p className={styles.username}>{username}님</p>
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
          <p className={styles.value}>{points} P</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.infoItem}>
          <p className={styles.label}>보유한 쿠폰</p>
          <p className={styles.value}>{coupons}개</p>
        </div>
      </div>
      {/* 리스트 메뉴 */}
      <ul className={styles.menuList}>
        <li>
          <a href="#">위시리스트</a>
        </li>
        <li>
          <a href="#">예약내역</a>
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

// 서버사이드 데이터 로딩
// export const getServerSideProps: GetServerSideProps = async () => {
//   // DB에서 데이터를 불러오는 부분
//   const response = await fetch("http://localhost:3000/api/userdata"); // API URL 예시
//   const data = await response.json();

//   return {
//     props: {
//       points: data.points || 0, // 포인트 값
//       coupons: data.coupons || 0, // 쿠폰 값
//       username: data.username || "사용자", // 사용자 이름
//     },
//   };
// };
