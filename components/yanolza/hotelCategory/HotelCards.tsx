"use client";

import ic_star_p from "@/assets/icon/ic_star_p_11px.png";
import ic_star_g from "@/assets/icon/ic_star_g_11px.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Hotel {
  accommodationId: number;
  thumbnail: string;
  price: number;
  name: string;
  rating: number;
  totalReview: number;
}

interface HotelCardsProps {
  hotels: Hotel[];
}

export default function HotelCards({ hotels }: HotelCardsProps) {
  const router = useRouter();

  return (
    <div className="mt-4 flex w-full flex-wrap justify-center">
      {hotels.map((hotel, index) => (
        <button
          key={index}
          className="mx-2 mb-2 flex h-48 w-36 flex-col text-left"
          onClick={() => router.push("/accommodation/" + hotel.accommodationId)}
        >
          <Image
            className="h-24 w-36 rounded-md"
            src={hotel.thumbnail}
            alt=""
            width={144}
            height={96}
          />
          <p className="mt-1 w-full text-sm font-medium">{hotel.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-xs font-bold">{hotel.rating.toFixed(1)}</p>
            <div className="flex">
              {Array.from({ length: Math.floor(hotel.rating) }).map(
                (_, index) => (
                  <img key={index} src={ic_star_p.src} alt="ic_star_p" />
                )
              )}
              {Array.from({ length: 5 - Math.floor(hotel.rating) }).map(
                (_, index) => (
                  <img key={index} src={ic_star_g.src} alt="ic_star_g " />
                )
              )}
            </div>
            <p className="text-xs text-gray-400">
              {"(" + hotel.totalReview.toLocaleString() + ")"}
            </p>
          </div>
          {/* <p className="-mb-1 w-full text-[10px] text-gray-500">
            {hotel.location}
          </p> */}
          <p className="mt-1 text-base font-bold">
            {hotel.price.toLocaleString() + "원"}
          </p>
        </button>
      ))}
    </div>
  );
}
