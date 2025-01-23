"use client";

import { useEffect, useState } from "react";

interface KakaoMapProps {
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
  accommodations: {
    name: string;
    address: string;
    rating: any;
    reviewCount: any;
    img: string | null;
  }[];
  setSelectedAccommodation: React.Dispatch<any>;
}

export default function KakaoMap({
  userLocation,
  setUserLocation,
  accommodations,
  setSelectedAccommodation,
}: KakaoMapProps) {
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 위치
          level: 1,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMapInstance(map);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              setUserLocation({ lat, lng });

              const markerPosition = new window.kakao.maps.LatLng(lat, lng);
              const markerImage = new window.kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                new window.kakao.maps.Size(50, 50), // 마커 이미지 크기
                { offset: new window.kakao.maps.Point(25, 25) } // 이미지의 중심을 기준으로 설정
              );

              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
              });

              marker.setMap(map);
              map.setCenter(markerPosition);
            },
            (error) => {
              console.error("GPS 위치 정보를 가져오는 데 실패했습니다:", error);
              alert("위치를 가져오지 못했습니다. 위치 권한을 확인하세요.");
            }
          );
        } else {
          alert("이 브라우저는 GPS 위치 정보를 지원하지 않습니다.");
        }

        displayMarkers(accommodations, map);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, [accommodations, setUserLocation]);

  const displayMarkers = (
    data: {
      name: string;
      address: string;
      rating: any;
      reviewCount: any;
      img: string | null;
    }[],
    map: any
  ) => {
    const bounds = new window.kakao.maps.LatLngBounds();

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

            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `
              <div style="width:150px;text-align:center;padding:6px 0;">
                <strong>${accommodation.name}</strong>
              </div>
            `,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
              infowindow.open(map, marker);
              setSelectedAccommodation(accommodation);
            });

            bounds.extend(coords);
            map.setBounds(bounds);
          } else {
            console.error("주소 검색에 실패했습니다:", accommodation.address);
          }
        }
      );
    });
  };

  const moveToMyLocation = () => {
    if (userLocation && mapInstance) {
      const { lat, lng } = userLocation;
      const moveLatLng = new window.kakao.maps.LatLng(lat, lng);

      mapInstance.setCenter(moveLatLng);
      mapInstance.setLevel(1); // 숫자가 낮을수록 지도가 더 확대됩니다 (기본값은 3)
    } else {
      alert("현재 위치 정보를 가져오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div id="map" className="w-full h-full"></div>
      {/* 내 위치로 이동 버튼 */}
      <button
        className="absolute bottom-16 left-4 p-3 bg-white rounded-full shadow-md"
        onClick={moveToMyLocation}
      >
        <span role="img" aria-label="location">
          📍
        </span>
      </button>
    </>
  );
}
