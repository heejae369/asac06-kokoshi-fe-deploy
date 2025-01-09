"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import selectedMapIcon from "@/assets/selectedMapIcon.png";
import homeIcon from "@/assets/homeIcon.png";
import myPageIcon from "@/assets/myPageIcon.png";
import Footer from "@/components/Footer";

export default function Map() {
  const [searchText, setSearchText] = useState("지역, 숙소 검색");
  const [calendar, setCalendar] = useState("6.2 화 - 6.3 수");
  const [personnel, setPersonnel] = useState("성인 2명");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              setUserLocation({ lat, lng });

              const mapContainer = document.getElementById("map");
              const mapOption = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3,
              };

              // 지도 생성
              const map = new window.kakao.maps.Map(mapContainer, mapOption);

              // 현재 위치 마커 생성
              const markerPosition = new window.kakao.maps.LatLng(lat, lng);
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });

              // 마커 지도에 표시
              marker.setMap(map);

              // 커스텀 오버레이 생성
              const content = `
                <div style="padding:5px;background:#fff;border-radius:50%;border:2px solid #8728FF;">
                  <div style="width:10px;height:10px;border-radius:50%;background:#8728FF;"></div>
                </div>`;

              const customOverlay = new window.kakao.maps.CustomOverlay({
                position: markerPosition,
                content: content,
                map: map,
              });

              // 지도 컨트롤 추가
              const zoomControl = new window.kakao.maps.ZoomControl();
              map.addControl(
                zoomControl,
                window.kakao.maps.ControlPosition.RIGHT
              );
            },
            (error) => {
              console.error("현재 위치를 가져오는데 실패했습니다:", error);
              // 기본 위치 (제주도)로 설정
              const mapContainer = document.getElementById("map");
              const mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
              };
              new window.kakao.maps.Map(mapContainer, mapOption);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 5000,
            }
          );
        } else {
          alert("이 브라우저에서는 위치 정보를 제공하지 않습니다.");
        }
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
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
        <Footer />
      </div>
    </div>
  );
}
