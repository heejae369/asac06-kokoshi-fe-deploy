"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function MapComponent() {
  const [openInfowindow, setOpenInfowindow] = useState<any>(null);
  const router = useRouter();
  // 숙소 정보 타입 정의
  type Accommodation = {
    id: number;
    name: string;
    address: string;
    rating: number | any;
    reviewCount: number | any;
    img: string | null;
    minPrice: number | any;
  };

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null); // 지도 객체 저장

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;

    if (!document.querySelector(`script[src="${mapScript.src}"]`)) {
      document.head.appendChild(mapScript);
    }

    const onLoadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.warn("⚠️ 카카오 맵 API가 로드되지 않았습니다.");
        return;
      }

      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 (제주도)
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMapInstance(map); // ✅ 지도 객체 저장

        console.log("🗺️ 카카오 맵 로드 완료, 지도 객체 설정됨");
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, []);

  useEffect(() => {
    if (mapInstance && navigator.geolocation) {
      console.log("📍 현재 위치 가져오기 시작...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng }); // ✅ 현재 위치 상태 저장

          console.log("✅ 현재 위치 가져오기 성공:", { lat, lng });

          // ✅ 지도 객체가 있을 때만 setCenter 실행
          if (mapInstance) {
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const markerImage = new window.kakao.maps.MarkerImage(
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              new window.kakao.maps.Size(50, 50),
              { offset: new window.kakao.maps.Point(25, 50) }
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });

            marker.setMap(mapInstance);
            mapInstance.setCenter(markerPosition);
            // fetchAccommodations(mapInstance);
          }
        },
        (error) => {
          console.error("❌ 현재 위치 가져오기 실패:", error);
          alert("현재 위치를 가져올 수 없습니다. 위치 권한을 확인하세요.");
        }
      );
    }
  }, [mapInstance]); // ✅ mapInstance가 설정된 후에만 실행

  useEffect(() => {
    if (mapInstance) {
      console.log("🗺️ 현재 mapInstance 상태:", mapInstance);

      // ✅ 지도 객체가 설정된 후 숙소 데이터 가져오기
      fetchAccommodations(mapInstance);
    }
  }, [mapInstance]);
  // 숙소 데이터 가져오기
  const fetchAccommodations = async (map: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/accommodation/map`
      ); // 백엔드 API 호출
      if (!response.ok) {
        throw new Error("숙소 데이터를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      // setAccommodations(data); // 상태로 저장
      displayMarkers(data, map); // 지도에 마커 표시
    } catch (error) {
      console.error(error);
    }
  };
  const openInfowindowRef = useRef<any>(null);
  // 지도에 마커 표시
  const displayMarkers = (accommodations: Accommodation[], map: any) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    accommodations.forEach((accommodation) => {
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

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, "click", () => {
              if (openInfowindowRef.current === infowindow) {
                infowindow.close();
                openInfowindowRef.current = null;
                setSelectedAccommodation(null);
              } else {
                if (openInfowindowRef.current) {
                  openInfowindowRef.current.close(); // 기존 인포윈도우 닫기
                }
                infowindow.open(map, marker);
                openInfowindowRef.current = infowindow;
                setSelectedAccommodation(accommodation);
              }
            });
          } else {
            console.error("주소 검색에 실패했습니다:", accommodation.address);
          }
        }
      );
    });
  };
  // useEffect(() => {
  //   setSelectedAccommodation(null); // 상태 초기화
  // }, []);

  // 내 위치로 이동 버튼 클릭 시 실행
  const moveToMyLocation = () => {
    if (userLocation && mapInstance) {
      const { lat, lng } = userLocation;
      const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
      mapInstance.setCenter(moveLatLng); // 지도 중심을 내 위치로 설정
    } else {
      alert("현재 위치 정보를 가져오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };
  const moveReservation = (id) => {
    router.push(`/accommodation/${id}`);
  };

  return (
    <>
      <div
        id="map"
        className="z-0 w-[360px] flex-1 ml-[-20px]"
        style={{
          height: "100vh", // 높이 명시적 지정
          WebkitTransform: "translate3d(0,0,0)", // iOS 렌더링 이슈 해결
          transform: "translate3d(0,0,0)", // iOS 렌더링 이슈 해결
        }}
      />
      {/* 내 위치로 이동 버튼 */}

      <button
        className="absolute bottom-16 left-4 p-3 bg-white rounded-full shadow-md z-[9999]"
        style={{ pointerEvents: "auto" }}
        onClick={(e) => {
          e.stopPropagation(); // ✅ 다른 이벤트와 충돌 방지
          moveToMyLocation();
        }}
      >
        <span role="img" aria-label="location">
          📍
        </span>
      </button>

      {selectedAccommodation && (
        <div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-white p-4 rounded-lg shadow-lg "
          role="button"
          onClick={() => moveReservation(selectedAccommodation.id)}
        >
          {/* 왼쪽 이미지 섹션 */}
          <div className="flex items-center">
            <div className="w-1/3 mr-4">
              <div className="w-full h-24 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={selectedAccommodation.img || "/placeholder-image.jpg"}
                  alt={selectedAccommodation.name || "숙소 이미지"}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* 오른쪽 텍스트 섹션 */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-700 mb-1 truncate">
                {selectedAccommodation.name || "숙소 이름"}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-purple-600 mb-2">
                <span className="font-bold">
                  {selectedAccommodation.rating || "0"}
                </span>
                <div className="flex items-center">
                  {/* 별점 표시 */}
                  {Array.from({
                    length: Math.floor(selectedAccommodation.rating || "0"),
                  }).map((_, index) => (
                    <span key={index} className="text-purple-600 text-lg">
                      ⭐
                    </span>
                  ))}
                  {/* 리뷰 개수 */}
                  <span className="text-gray-500 ml-2">
                    ({selectedAccommodation.reviewCount || "0"})
                  </span>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {selectedAccommodation.minPrice || "전화문의"}원~
              </p>
              {/* <p className="text-sm text-gray-500">
                {selectedAccommodation.distance || "김포 공항역 3분"}
              </p> */}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
