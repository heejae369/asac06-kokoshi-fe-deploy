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
  // page : string;
}
export default function HotelCards() {
  const router = useRouter();
  const ratings: hotel[] = [];
  // BE에서 값 받아와서 변수에 저장 / ~~일 경우 핫한 숙소 4개만, ~~일 경우 예약 빨리 마감 숙소 n개 가져오기
  ratings.push({
    hotelName: "김포 마리나베이 호텔",
    rating: 4.0,
    number: 136,
    location: "김포공항역",
    price: 75000,
    // page: ??,
  });
  ratings.push({
    hotelName: "더블유 에비뉴 김포",
    rating: 4.0,
    number: 140,
    location: "김포공항역",
    price: 75000,
  });
  ratings.push({
    hotelName: "리벨 닷지 호텔",
    rating: 5.0,
    number: 21,
    location: "김포공항역",
    price: 75000,
  });
  ratings.push({
    hotelName: "김포 B hotel",
    rating: 4.0,
    number: 216,
    location: "김포공항역",
    price: 75000,
  });

  return (
    <div className="mt-4 flex h-auto w-full flex-wrap justify-center">
      {ratings.map((rating, index) => (
        <div key={index} className="mx-2 mb-2 flex h-48 w-36 flex-wrap ">
          <img className="h-24 w-36 rounded-md" src="" alt="" />
          {/* 위의 div를 버튼으로 혹은 아래의 p를 버튼으로 */}
          <button
            className="-mb-1 w-full text-left text-sm font-medium"
            onClick={() => router.push("/rating.page")}
          >
            {rating.hotelName}
          </button>
          <p className="-mb-1 text-xs font-bold">{rating.rating.toFixed(1)}</p>
          <div className="mx-2 -mb-2 flex items-center">
            {Array.from({ length: Math.floor(rating.rating) }).map(
              (_, index) => (
                <img
                  key={index}
                  src={ic_star_p.src}
                  alt="ic_star_p"
                  className="-mt-2"
                />
              )
            )}
            {Array.from({ length: 5 - Math.floor(rating.rating) }).map(
              (_, index) => (
                <img
                  key={index}
                  src={ic_star_g.src}
                  alt="ic_star_g "
                  className="-mt-2"
                />
              )
            )}
          </div>
          <p className="-mb-1 text-xs">{"(" + rating.number + ")"}</p>
          <p className="-mb-1 w-full text-[10px]">{rating.location}</p>
          <p className="text-base font-bold">
            {rating.price.toLocaleString() + " 원"}
          </p>
        </div>
      ))}
    </div>
  );
}
