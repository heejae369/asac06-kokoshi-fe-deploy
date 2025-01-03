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

interface IconItem {
  id: number;
  name: string;
  icon: string;
}

const IconButtons: React.FC = () => {
  const items: IconItem[] = [
    { id: 1, name: "모텔", icon: motel.src },
    { id: 2, name: "호텔", icon: hotel.src },
    { id: 3, name: "펜션/풀빌라", icon: pention.src },
    { id: 4, name: "캠핑", icon: camping.src },
    { id: 5, name: "게스트하우스", icon: guestHouse.src },
    { id: 6, name: "레저/티켓", icon: leisure.src },
    { id: 7, name: "해외숙소", icon: global.src },
    { id: 8, name: "항공", icon: airTicket.src },
  ];

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.iconButton}>
          <div className={styles.circle}>
            <img src={item.icon} alt={item.name} className={styles.icon} />
          </div>
          <span className={styles.label}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconButtons;
