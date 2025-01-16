"use client";
import styles from "../styles/IconButtons.module.css";
import motel from "@/assets/icon/motel_icon.png";
import hotel from "@/assets/icon/hotel_icon.png";
import pention from "@/assets/icon/pention.png";
import camping from "@/assets/icon/camping_icon.png";
import guestHouse from "@/assets/icon/guestHouse_icon.png";
import leisure from "@/assets/icon/leisure.png";
import global from "@/assets/icon/global_icon.png";
import airTicket from "@/assets/icon/airTicket_icon.png";
import { useRouter } from "next/navigation";

interface IconItem {
  id: number;
  name: string;
  icon: string;
  path: string;
}

const IconButtons: React.FC = () => {
  const items: IconItem[] = [
    { id: 1, name: "모텔", icon: motel.src, path: "motel" },
    { id: 2, name: "호텔", icon: hotel.src, path: "hotelCategory" },
    {
      id: 3,
      name: "펜션/풀빌라",
      icon: pention.src,
      path: "pension-poolvilla",
    },
    { id: 4, name: "캠핑", icon: camping.src, path: "camping" },
    { id: 5, name: "게스트하우스", icon: guestHouse.src, path: "guesthouse" },
    { id: 6, name: "레저/티켓", icon: leisure.src, path: "leisure-ticket" },
    { id: 7, name: "해외숙소", icon: global.src, path: "global" },
    { id: 8, name: "항공", icon: airTicket.src, path: "air-ticket" },
  ];
  const router = useRouter();
  // 버튼 클릭 시 /detail/hotelDetail/{path}로 라우팅
  const handleNextClick = (path: string) => {
    const url = `/detail/${path}`;
    router.push(url);
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.iconButton}>
          <div className={styles.circle}>
            <button onClick={() => handleNextClick(item.path)}>
              <img src={item.icon} alt={item.name} className={styles.icon} />
            </button>
          </div>
          <span className={styles.label}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconButtons;
