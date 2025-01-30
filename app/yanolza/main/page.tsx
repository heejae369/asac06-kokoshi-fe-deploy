"use client";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import IconButtons from "@/components/IconButtons";
import search from "@/assets/icon/search.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const searchRef = useRef("");
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className={styles.container}>
        <Head>
          <title>Kokoshi</title>
          <meta name="description" content="Travel Booking App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* 흐린 배경 텍스트 */}
        <div className={styles.backgroundText}>Kokoshi</div>

        <header className={styles.header}>
          <h1 className={styles.logo}>Kokoshi</h1>
          <button className={styles.notification}>🔔</button>
        </header>

        <main className={styles.main}>
          <div className={styles.searchBar}>
            <img src={search.src} alt="검색" className={styles.searchIcon} />
            <input
              type="text"
              className={styles.input}
              placeholder="어떤 숙소를 찾으시나요?"
              ref={searchRef}
              onChange={(e) => {
                searchRef.current = e.target.value;
              }}
              onKeyUp={(e) => {
                if (e.keyCode == 13) {
                  router.push(`/search?search=${searchRef.current}`);
                }
              }}
            />
          </div>

          <IconButtons />

          <button className="mx-4 px-4" onClick={() => router.push("event")}>
            <img src="/images/img_home_banner.png" alt="" />
          </button>
        </main>

        <Footer />
      </div>
    </div>
  );
}
