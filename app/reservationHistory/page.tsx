"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Headers } from "@/components/SearchComponent";
import Footer from "@/components/Footer";

const ReservationHistory = () => {
  const router = useRouter();

  const handleReviewWrite = (reservationNumber) => {
    // 세션 스토리지에 예약번호 저장
    sessionStorage.setItem("reservationNumber", reservationNumber);
    // 리뷰 작성 페이지로 이동
    router.push("/reviewWrite");
  };
  return (
    <div className="flex h-auto w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 font-sans">
        {/* Header */}
        <div className="sticky top-0 z-10 -mx-5 h-24 w-[360px] bg-white">
          <div className="absolute w-full px-5">
            <Headers title={"예약내역"} backIcon={true} />
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex gap-2 p-4">
          <select className="flex-1 p-2 border rounded-md text-gray-600">
            <option>카테고리 전체</option>
          </select>
          <select className="flex-1 p-2 border rounded-md text-gray-600">
            <option>최근 6개월</option>
          </select>
        </div>

        {/* Reservations List */}
        <div className="px-4 space-y-4">
          {/* First Reservation */}
          <div className="border rounded-lg overflow-hidden">
            <div className="flex justify-between p-4 border-b">
              <div className="text-lg font-medium">2025.01.01 (월)</div>
              <button className="text-blue-500">상세보기 &gt;</button>
            </div>

            <div className="p-4">
              <div className="text-gray-500 text-sm mb-2">
                숙소 예약번호 25010300583400004
              </div>
              {/* <div className="text-gray-500 inline-block px-2 py-1 bg-gray-100 rounded-md text-sm mb-2">
              이용완료
            </div> */}
              <h3 className="text-lg font-medium mb-2">test 1</h3>

              <div className="flex gap-4 mb-4">
                <img
                  src="/api/placeholder/100/100"
                  alt="Room"
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium mb-1">
                    Deluxe(랜덤배정 / 주차불가)
                  </div>
                  <div className="text-gray-600 mb-2">도보방문</div>
                  <div className="text-sm text-gray-500">
                    2025.01.02 (목) ~ 2025.01.03 (금) | 1박
                  </div>
                  <div className="text-sm text-gray-500">
                    체크인 21:00 | 체크아웃 13:00
                  </div>
                  <div className="text-sm text-gray-500">
                    기준 2명 / 최대 2명
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleReviewWrite("25010300583400004")}
                className="w-full py-2 text-center border rounded-md text-gray-600"
              >
                후기 작성하기 가기
              </button>
            </div>
          </div>

          {/* Second Reservation */}
          <div className="border rounded-lg overflow-hidden">
            <div className="flex justify-between p-4 border-b">
              <div className="text-lg font-medium">2024.09.13 (금)</div>
              <button className="text-blue-500">상세보기 &gt;</button>
            </div>

            <div className="p-4">
              <div className="text-gray-500 text-sm mb-2">
                숙소 예약번호 24091319463400062
              </div>
              {/* <div className="text-gray-500 inline-block px-2 py-1 bg-gray-100 rounded-md text-sm mb-2">
              이용완료
            </div> */}
              <h3 className="text-lg font-medium mb-2">test 2</h3>

              <div className="flex gap-4 mb-4">
                <img
                  src="/api/placeholder/100/100"
                  alt="Room"
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium mb-1">
                    일반실 -안.심.클.린(4번출구도보2분+넷플릭스가능+안심소독)
                  </div>
                  <div className="text-gray-600 mb-2">도보방문</div>
                  <div className="text-sm text-gray-500">
                    2024.09.13 (금) | 3시간
                  </div>
                  <div className="text-sm text-gray-500">
                    체크인 20:00 | 체크아웃 23:00
                  </div>
                  <div className="text-sm text-gray-500">
                    기준 2명 / 최대 2명
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleReviewWrite("25010300583400004")}
                className="w-full py-2 text-center border rounded-md text-gray-600"
              >
                후기 작성 기간 만료
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ReservationHistory;
