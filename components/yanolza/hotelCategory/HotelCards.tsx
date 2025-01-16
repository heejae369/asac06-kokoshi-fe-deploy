"use client";

import ic_star_p from "@/assets/icon/ic_star_p_11px.png";
import ic_star_g from "@/assets/icon/ic_star_g_11px.png";
import { useRouter } from "next/navigation";

interface hotel {
  hotelName: string;
  rating: number;
  number: number;
  location: string;
  price: number;
  page: number;
}
export default function HotelCards() {
  const router = useRouter();
  const hotels: hotel[] = [];
  // BE에서 값 받아와서 변수에 저장 / ~~일 경우 핫한 숙소 4개만, ~~일 경우 예약 빨리 마감 숙소 n개 가져오기
  hotels.push({
    hotelName: "김포 마리나베이 호텔",
    rating: 4.0,
    number: 136,
    location: "김포공항역 3분",
    price: 75000,
    page: 0,
  });
  hotels.push({
    hotelName: "더블유 에비뉴 김포",
    rating: 4.1,
    number: 140,
    location: "김포공항역 5분",
    price: 85000,
    page: 1,
  });
  hotels.push({
    hotelName: "리벨 닷지 호텔",
    rating: 5.0,
    number: 21,
    location: "검단역 5분",
    price: 82000,
    page: 2,
  });
  hotels.push({
    hotelName: "김포 B hotel",
    rating: 3.5,
    number: 216,
    location: "김포공항역 10분",
    price: 145000,
    page: 3,
  });
  hotels.push({
    hotelName: "반 킬리퍼 호텔",
    rating: 4.0,
    number: 97,
    location: "김포공항역 3분",
    price: 82000,
    page: 4,
  });
  hotels.push({
    hotelName: "라운지 얼로우 호텔",
    rating: 4.7,
    number: 301,
    location: "김포공항역 10분",
    price: 145000,
    page: 5,
  });

  return (
    <div className="mt-4 flex h-auto w-full flex-wrap justify-center">
      {hotels.map((hotel, index) => (
        <button
          key={index}
          className="mx-2 mb-2 flex h-48 w-36 flex-wrap text-left"
          onClick={() => router.push("/accommodation/" + hotel.page)}
        >
          <img className="h-24 w-36 rounded-md" src="" alt="" />
          {/* 위의 div를 버튼으로 혹은 아래의 p를 버튼으로 */}
          <p className="-mb-1 w-full text-sm font-medium">{hotel.hotelName}</p>
          <p className="-mb-1 text-xs font-bold">{hotel.rating.toFixed(1)}</p>
          <div className="mx-2 -mb-2 flex items-center">
            {Array.from({ length: Math.floor(hotel.rating) }).map(
              (_, index) => (
                <img
                  key={index}
                  src={ic_star_p.src}
                  alt="ic_star_p"
                  className="mt-0.5"
                />
              )
            )}
            {Array.from({ length: 5 - Math.floor(hotel.rating) }).map(
              (_, index) => (
                <img
                  key={index}
                  src={ic_star_g.src}
                  alt="ic_star_g "
                  className="mt-0.5"
                />
              )
            )}
          </div>
          <p className="-mb-1 text-xs text-gray-400">
            {"(" + hotel.number + ")"}
          </p>
          <p className="-mb-1 w-full text-[10px] text-gray-500">
            {hotel.location}
          </p>
          <p className="text-base font-bold">
            {hotel.price.toLocaleString() + " 원"}
          </p>
        </button>
      ))}
    </div>
  );
}
