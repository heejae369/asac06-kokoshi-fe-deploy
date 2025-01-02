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
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans tracking-negative">
      <div className="w-[360px] bg-white relative flex flex-col h-full">
        <div className="h-[146px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.18)] z-20">
          <div className="mt-[51px]">
            <button className="w-[320px] h-[37px] mx-[20px] bg-[#F6F6F6] rounded-[18px] flex items-center">
              <Image src={searchIcon} alt="search" className="ml-[15px]" />
              <span className="h-[20px] ml-[7px] text-[13px] text-[#999999] tracking-[-0.8px] font-[600]">
                {searchText}
              </span>
            </button>
          </div>
          <div className="flex pt-[6px] px-[20px] gap-[7px]">
            <button className="w-[200px] h-[37px] bg-[#F6F6F6] rounded-[18px] flex items-center">
              <Image src={calendarIcon} alt="calendar" className="ml-[17px]" />
              <span className="h-[20px] ml-[8px] text-[13px] tracking-[-0.45px] font-[600]">
                {calendar}
              </span>
            </button>
            <button className="w-[114px] h-[37px] bg-[#F6F6F6] rounded-[18px] flex items-center">
              <Image
                src={personnelIcon}
                alt="personnel"
                className="ml-[15px]"
              />
              <span className="h-[20px] ml-[8px] text-[13px] tracking-[-0.45px] font-[600]">
                {personnel}
              </span>
            </button>
          </div>
        </div>
        <div id="map" className="flex-1 w-[360px] z-0"></div>
        <div className="h-[68px] flex items-center justify-center text-[10px] tracking-[-0.5px] font-semibold">
          <div className="w-[120px] flex flex-col items-center text-[#8728FF]">
            <button className="w-[40px] flex flex-col items-center">
              <Image
                src={selectedMapIcon}
                alt="selectedMapIcon"
                width={20}
                height={20}
              />
              <span className="mt-[5px]">지도</span>
            </button>
          </div>
          <div className="w-[120px] flex flex-col items-center text-[#B2B2B2]">
            <button className="w-[40px] flex flex-col items-center">
              <Image src={homeIcon} alt="homeIcon" width={20} height={20} />
              <span className="mt-[5px]">홈</span>
            </button>
          </div>
          <div className="w-[120px] flex flex-col items-center text-[#B2B2B2]">
            <button className="w-[40px] flex flex-col items-center">
              <Image src={myPageIcon} alt="myPageIcon" width={20} height={20} />
              <span className="w-[60px] mt-[5px]">마이페이지</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
