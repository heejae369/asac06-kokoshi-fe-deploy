"use client";

import MainHeaders from "@/components/MainHeaders";
import EventBanner from "@/components/yanolza/hotelCategory/EventBanner";
import SelectRegion from "@/components/yanolza/hotelCategory/SelectRegion";
import HotelCards from "@/components/yanolza/hotelCategory/HotelCards";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

interface Hotel {
  accommodationId: number;
  thumbnail: string;
  price: number;
  name: string;
  rating: number;
  totalReview: number;
}

export default function Category() {
  const categoryParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const categoryFromParams = categoryParams.get("category");
    console.log(categoryFromParams);
    if (categoryFromParams != null) {
      setCategory(categoryFromParams);
    } else {
      router.push("/yanolza/main");
    }
  }, [categoryParams, router]);

  useEffect(() => {
    if (category === null) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/accommodation/detail/${category}`
        );

        if (!response.ok) {
          throw new Error("네트워크 응답이 정상적이지 않습니다");
        }

        const responseData = await response.json();
        setHotels(responseData);
        console.log(responseData);
      } catch (error) {
        console.log("숙소 목록을 가져오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [category]);

  // 로딩 페이지 넣기
  if (category === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex min-h-screen w-full justify-center bg-gray-100">
        <div className="h-full w-[360px] bg-white px-5">
          <div className="sticky top-0 z-10 -mx-5 flex w-[360px] items-center bg-white">
            <div className="w-full px-5">
              <MainHeaders title={category} backIcon={true} />
            </div>
          </div>

          <div className="mt-[5px]">
            <EventBanner />
          </div>
          <SelectRegion category={category} />
          {hotels && (
            <div className="pb-[60px]">
              <h2 className="mt-2 font-bold">{category} 목록</h2>
              <HotelCards hotels={hotels} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
