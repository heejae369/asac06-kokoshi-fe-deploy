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
        <Link href="/seonghwan/map">
          <div
            className={`${styles.navItem} ${
              pathname === "/seonghwan/map" ? styles.active : ""
            }`}
          >
            <img
              src={map.src}
              alt="내위치"
              className={`${styles.icon} ${
                pathname === "/seonghwan/map" ? styles.activeIcon : ""
              }`}
            />
            <span
              className={`${pathname === "/seonghwan/map" ? styles.activeText : ""}`}
            >
              내위치
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
              pathname.startsWith("/mypage") ? styles.active : ""
            }`}
          >
            <img
              src={myPage.src}
              alt="마이페이지"
              className={`${styles.icon} ${
                pathname.startsWith("/mypage") ? styles.activeIcon : ""
              }`}
            />
            <span
              className={`${pathname.startsWith("/mypage") ? styles.activeText : ""}`}
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
