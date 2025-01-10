import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import IconButtons from "@/components/IconButtons";
import search from "@/assets/icon/search.png";

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

          <section className={styles.eventSection}>
            <div className={styles.eventBanner}>
              <h2>여름 초특가</h2>
              <p>Summer Event!</p>
              <p>초특가 할인 숙소를 만나보세요.</p>
            </div>
          </section>

          <section className={styles.recentSection}>
            <h3>최근 본 숙소</h3>
            <div className={styles.recentList}>
              {[
                { name: "코코시하우스", price: "45,000원" },
                { name: "알라베티 호텔", price: "253,000원" },
                { name: "로첼라 루 호텔", price: "85,000원" },
              ].map((item, index) => (
                <div key={index} className={styles.recentItem}>
                  <div className={styles.imagePlaceholder}></div>
                  <div className={styles.itemInfo}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
