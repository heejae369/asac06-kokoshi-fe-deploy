"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 현재 경로를 가져오기 위한 useRouter
import styles from "../styles/Footer.module.css";
import mainPage from "@/assets/icon/smiley-happy.png";
import goHome from "@/assets/icon/home-02.png";
import map from "@/assets/icon/ic_menu_map.png";

const Footer = () => {
  const router = useRouter(); // 현재 경로 확인

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        {/* 지도 */}
        <Link href="/map" className={styles.navItem}>
          <div
            className={`${styles.icon} ${
              router.pathname === "/map" ? styles.active : ""
            }`}
          >
            <img src={map.src} alt="지도" />
          </div>
          <span
            className={`${router.pathname === "/map" ? styles.active : ""}`}
          >
            지도
          </span>
        </Link>

        {/* 홈 */}
        <Link href="/yanolza/main" className={styles.navItem}>
          <div
            className={`${styles.icon} ${
              router.pathname === "/yanolza/main" ? styles.active : ""
            }`}
          >
            <img src={goHome.src} alt="홈" />
          </div>
          <span
            className={`${router.pathname === "/yanolza/main" ? styles.active : ""}`}
          >
            홈
          </span>
        </Link>

        {/* 마이페이지 */}
        <Link href="/mypage" className={styles.navItem}>
          <div
            className={`${styles.icon} ${
              router.pathname === "/mypage" ? styles.active : ""
            }`}
          >
            <img src={mainPage.src} alt="마이페이지" />
          </div>
          <span
            className={`${router.pathname === "/mypage" ? styles.active : ""}`}
          >
            마이페이지
          </span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
