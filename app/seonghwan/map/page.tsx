"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import selectedMapIcon from "@/assets/selectedMapIcon.png";
import homeIcon from "@/assets/homeIcon.png";
import myPageIcon from "@/assets/myPageIcon.png";

export default function Map() {
  const [searchText, setSearchText] = useState("지역, 숙소 검색");
  const [calendar, setCalendar] = useState("6.2 화 - 6.3 수");
  const [personnel, setPersonnel] = useState("성인 2명");

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative flex h-full w-[360px] flex-col bg-white">
        <div className="z-20 h-[146px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.18)]">
          <div className="mt-[51px]">
            <button className="mx-[20px] flex h-[37px] w-[320px] items-center rounded-[18px] bg-[#F6F6F6]">
              <Image src={searchIcon} alt="search" className="ml-[15px]" />
              <span className="ml-[7px] h-[20px] text-[13px] font-[600] tracking-[-0.8px] text-[#999999]">
                {searchText}
              </span>
            </button>
          </div>
          <div className="flex gap-[7px] px-[20px] pt-[6px]">
            <button className="flex h-[37px] w-[200px] items-center rounded-[18px] bg-[#F6F6F6]">
              <Image src={calendarIcon} alt="calendar" className="ml-[17px]" />
              <span className="ml-[8px] h-[20px] text-[13px] font-[600] tracking-[-0.45px]">
                {calendar}
              </span>
            </button>
            <button className="flex h-[37px] w-[114px] items-center rounded-[18px] bg-[#F6F6F6]">
              <Image
                src={personnelIcon}
                alt="personnel"
                className="ml-[15px]"
              />
              <span className="ml-[8px] h-[20px] text-[13px] font-[600] tracking-[-0.45px]">
                {personnel}
              </span>
            </button>
          </div>
        </div>
        <div id="map" className="z-0 w-[360px] flex-1"></div>
        <div className="flex h-[68px] items-center justify-center text-[10px] font-semibold tracking-[-0.5px]">
          <div className="flex w-[120px] flex-col items-center text-[#8728FF]">
            <button className="flex w-[40px] flex-col items-center">
              <Image
                src={selectedMapIcon}
                alt="selectedMapIcon"
                width={20}
                height={20}
              />
              <span className="mt-[5px]">지도</span>
            </button>
          </div>
          <div className="flex w-[120px] flex-col items-center text-[#B2B2B2]">
            <button className="flex w-[40px] flex-col items-center">
              <Image src={homeIcon} alt="homeIcon" width={20} height={20} />
              <span className="mt-[5px]">홈</span>
            </button>
          </div>
          <div className="flex w-[120px] flex-col items-center text-[#B2B2B2]">
            <button className="flex w-[40px] flex-col items-center">
              <Image src={myPageIcon} alt="myPageIcon" width={20} height={20} />
              <span className="mt-[5px] w-[60px]">마이페이지</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
