"use client";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import IconButtons from "@/components/IconButtons";
import search from "@/assets/icon/search.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Home() {
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
            />
          </div>

          <IconButtons />

          <button className="mx-4 px-4">
            <img src="/images/img_home_banner.png" alt="" />
          </button>

          <section className={styles.recentSection}>
            <h3>최근 본 숙소</h3>
            <Swiper
              modules={[Pagination]}
              spaceBetween={12} // 슬라이드 간 간격
              slidesPerView={2.2} // 한 번에 보여지는 슬라이드 수
              loop={false} // 슬라이드 반복
            >
              <div>
                {[
                  { name: "코코시하우스", price: "45,000원" },
                  { name: "알라베티 호텔", price: "253,000원" },
                  { name: "로첼라 루 호텔", price: "85,000원" },
                ].map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.recentItem}>
                      <div className={styles.imagePlaceholder}></div>
                      <div className={styles.itemInfo}>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
