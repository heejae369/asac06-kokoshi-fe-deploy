"use client";

import MainHeaders from "@/components/MainHeaders";
import EventBanner from "@/components/yanolza/hotelCategory/EventBanner";
import SelectRegion from "@/components/yanolza/hotelCategory/SelectRegion";
import HotelCards from "@/components/yanolza/hotelCategory/HotelCards";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Hotel {
  accommodationId: number;
  thumbnail: string;
  price: number;
  name: string;
  rating: number;
  totalReview: number;
}

export default function CategoryClient() {
  const categoryParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const categoryFromParams = categoryParams.get("category");
    if (categoryFromParams != null) {
      setCategory(categoryFromParams);
    } else {
      router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/yanolza/main`);
    }
  }, [categoryParams, router]);

  // 로딩 페이지 넣기
  if (category === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-auto w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <div className="sticky top-0 z-10 -mx-5 h-24 w-[360px] bg-white">
          <div className="absolute w-full px-5">
            <MainHeaders title={category} backIcon={true} />
          </div>
        </div>

        <EventBanner />

        <SelectRegion category={category} />
        {hotels.length > 0 && (
          <>
            <h2 className="mt-2 font-bold">{category} 목록</h2>
            <HotelCards
              category={category}
              setHotels={setHotels}
              hotels={hotels}
            />
          </>
        )}
      </div>
    </div>
  );
}
