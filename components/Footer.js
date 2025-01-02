"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 현재 경로를 가져오기 위한 usePathname
import styles from "../styles/Footer.module.css";
import myPage from "@/assets/icon/ic_menu_mypage_p.png";
import goHome from "@/assets/icon/home-02.png";
import map from "@/assets/icon/ic_menu_map_p.png";

const Footer = () => {
  const pathname = usePathname(); // 현재 경로 가져오기

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        {/* 지도 */}
        <Link href="/map">
          <div
            className={`${styles.navItem} ${
              pathname === "/map" ? styles.active : ""
            }`}
          >
            <img
              src={map.src}
              alt="지도"
              className={`${styles.icon} ${
                pathname === "/map" ? styles.activeIcon : ""
              }`}
            />
            <span className={`${pathname === "/map" ? styles.activeText : ""}`}>
              지도
            </span>
          </div>
        </Link>

        {/* 홈 */}
        <Link href="/yanolza/main">
          <div
            className={`${styles.navItem} ${
              pathname === "/yanolza/main" ? styles.active : ""
            }`}
          >
            <img
              src={goHome.src}
              alt="홈"
              className={`${styles.icon} ${
                pathname === "/yanolza/main" ? styles.activeIcon : ""
              }`}
            />
            <span
              className={`${
                pathname === "/yanolza/main" ? styles.activeText : ""
              }`}
            >
              홈
            </span>
          </div>
        </Link>

        {/* 마이페이지 */}
        <Link href="/mypage">
          <div
            className={`${styles.navItem} ${
              pathname === "/mypage" ? styles.active : ""
            }`}
          >
            <img
              src={myPage.src}
              alt="마이페이지"
              className={`${styles.icon} ${
                pathname === "/mypage" ? styles.activeIcon : ""
              }`}
            />
            <span
              className={`${pathname === "/mypage" ? styles.activeText : ""}`}
            >
              마이페이지
            </span>
          </div>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
