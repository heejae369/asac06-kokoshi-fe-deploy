"use client";

import { Headers } from "@/components/SearchComponent";
import EventBanner from "@/components/yanolza/hotelCategory/EventBanner";
import SelectRegion from "@/components/yanolza/hotelCategory/SelectRegion";
import HotelCards from "@/components/yanolza/hotelCategory/HotelCards";

export default function HotelCategory() {
  return (
    <div className="flex h-auto w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <div className="sticky top-0 z-10 -mx-5 h-24 w-[360px] bg-white">
          <div className="absolute w-full px-5">
            <Headers title={"호텔"} backIcon={true} />
          </div>
        </div>

        <EventBanner />

        <SelectRegion />

        <h2 className="mt-3 font-bold">지금 핫한 숙소!</h2>
        <HotelCards />

        <h2 className="font-bold">예약이 빨리 마감되는 숙소!</h2>
        <HotelCards />
      </div>
    </div>
  );
}
