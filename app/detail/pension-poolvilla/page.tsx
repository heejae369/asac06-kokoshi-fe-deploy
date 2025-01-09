"use client";
import Image from "next/image";
import styles from "@/styles/HotelDetail.module.css";
import { useRouter } from "next/navigation";
import seoul from "@/assets/img/img_hotel_seoul.png";
import chungcheong from "@/assets/img/img_hotel_chungcheong.png";
import gangwon from "@/assets/img/img_hotel_gangwon.png";
import gyengsang from "@/assets/img/img_hotel_gyengsang.png";
import jeonla from "@/assets/img/img_hotel_jeonla.png";
import jeju from "@/assets/img/img_hotel_jeju.png";
import Footer from "@/components/Footer";

const hotels = [
  {
    id: 1,
    name: "김포 마리나베이 호텔",
    price: "75,000원",
    rating: 4.0,
    reviews: 136,
    distance: "김포공항역 3분",
    image: "/hotel1.jpg",
  },
  {
    id: 2,
    name: "더블유 어베뉴 김포",
    price: "85,000원",
    rating: 4.0,
    reviews: 136,
    distance: "김포공항역 5분",
    image: "/hotel2.jpg",
  },
  {
    id: 3,
    name: "리벨 닷지 호텔",
    price: "85,000원",
    rating: 4.0,
    reviews: 136,
    distance: "공항역 5분",
    image: "/hotel3.jpg",
  },
  {
    id: 4,
    name: "김포 B hotel",
    price: "55,000원",
    rating: 4.0,
    reviews: 136,
    distance: "김포공항역 10분",
    image: "/hotel4.jpg",
  },
  {
    id: 5,
    name: "호텔 Arbo",
    price: "65,000원",
    rating: 4.0,
    reviews: 136,
    distance: "김포공항역 15분",
    image: "/hotel5.jpg",
  },
  {
    id: 6,
    name: "호텔 더 루트릭",
    price: "105,000원",
    rating: 4.0,
    reviews: 136,
    distance: "김포공항역 2분",
    image: "/hotel6.jpg",
  },
];

const regions = [
  { id: 1, name: "서울/경인", image: seoul.src },
  { id: 2, name: "충청", image: chungcheong.src },
  { id: 3, name: "경상", image: gyengsang.src },
  { id: 4, name: "전라", image: jeonla.src },
  { id: 5, name: "강원", image: gangwon.src },
  { id: 6, name: "제주", image: jeju.src },
];

const HotelPage = () => {
  // 뒤로가기 함수
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      {/* 상단 배너 */}
      <div className={styles.header}>
        <button onClick={handleBack} className="mt-10">
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <h1 className={styles.title}>펜션/풀빌라</h1>
      </div>

      <div className={styles.banner}>
        <p>미리예약 OPEN!</p>
        <p>미리 예약하면 더 할인된 가격으로 예약할 수 있어요!</p>
      </div>

      {/* 지역 선택 */}
      <div className={styles.regionSection}>
        <h2>지역 선택</h2>
        <div className={styles.regionList}>
          {regions.map((region) => (
            <div key={region.id} className={styles.regionItem}>
              <Image
                src={region.image}
                alt={region.name}
                width={65}
                height={80}
                className={styles.regionImage}
              />
              <p>{region.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 지금 핫한 숙소 */}
      <div className={styles.hotSection}>
        <h2>지금 핫한 숙소!</h2>
        <div className={styles.hotelList}>
          {hotels.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCard}>
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={150}
                height={100}
                className={styles.hotelImage}
              />
              <div className={styles.hotelInfo}>
                <h3>{hotel.name}</h3>
                <p>{hotel.distance}</p>
                <p>
                  <span className={styles.rating}>⭐ {hotel.rating}</span> (
                  {hotel.reviews})
                </p>
                <p className={styles.price}>{hotel.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelPage;
