"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import Footer from "@/components/Footer";
import { Router } from "lucide-react";

export default function Map() {
  const [searchText, setSearchText] = useState("지역, 숙소 검색");
  const [calendar, setCalendar] = useState("6.2 화 - 6.3 수");
  const [personnel, setPersonnel] = useState("성인 2명");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [accommodations, setAccommodations] = useState<
    { name: string; address: string; rating: any; reviewCount: any }[]
  >([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 위치 (제주도)
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 숙소 데이터 가져오기
        fetchAccommodations(map);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, []);

  // 숙소 데이터 가져오기
  const fetchAccommodations = async (map: any) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/accommodation/map"
      ); // 백엔드 API 호출
      if (!response.ok) {
        throw new Error("숙소 데이터를 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      setAccommodations(data); // 상태로 저장
      displayMarkers(data, map); // 지도에 마커 표시
    } catch (error) {
      console.error(error);
    }
  };

  // 지도에 마커 표시
  const displayMarkers = (
    data: { name: string; address: string; rating: any; reviewCount: any }[],
    map: any
  ) => {
    const bounds = new window.kakao.maps.LatLngBounds(); // 지도 범위 조정용

    const geocoder = new window.kakao.maps.services.Geocoder();
    data.forEach((accommodation) => {
      geocoder.addressSearch(
        accommodation.address,
        (result: any[], status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우 생성
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `
              <div style="width:150px;text-align:center;padding:6px 0;">
                <strong>${accommodation.name}</strong>
              </div>
            `,
            });

            // 마커에 클릭 이벤트 추가
            window.kakao.maps.event.addListener(marker, "click", () => {
              infowindow.open(map, marker),
                setSelectedAccommodation(accommodation);
            });

            // 지도 범위에 좌표 추가
            bounds.extend(coords);
            map.setBounds(bounds); // 지도 범위 조정
          } else {
            console.error("주소 검색에 실패했습니다:", accommodation.address);
          }
        }
      );
    });
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative flex h-full w-[360px] flex-col bg-white">
        {/* 검색 및 필터 */}
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
        {/* 지도 */}
        <div id="map" className="z-0 w-[360px] flex-1"></div>
        {/* 숙소 리스트
        <div className="absolute bottom-0 w-full bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">숙소 리스트</h2>
          <div className="flex gap-2 overflow-x-auto">
            {accommodations.map((accommodation, index) => (
              <button
                key={index}
                onClick={() => setSelectedAccommodation(accommodation)}
                className="flex-shrink-0 px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {accommodation.name}
              </button>
            ))}
          </div>
        </div> */}
        {selectedAccommodation && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h3 className="text-xl font-semibold mb-2">
                {selectedAccommodation.name}
              </h3>
              <p className="text-gray-600">{selectedAccommodation.address}</p>
              <p className="text-gray-600">
                별점 :{selectedAccommodation.rating}
              </p>
              <p className="text-gray-600">
                리뷰 : {selectedAccommodation.reviewCount}
              </p>

              <button
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg "
                onClick={() =>
                  alert(
                    `${selectedAccommodation.name} 상품 페이지로 이동합니다.`
                  )
                }
              >
                상품 페이지로 이동
              </button>
              <button
                className="mt-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setSelectedAccommodation(null)}
              >
                닫기
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
