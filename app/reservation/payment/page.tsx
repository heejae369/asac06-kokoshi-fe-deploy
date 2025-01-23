"use client";

import MainHeaders from "@/components/MainHeaders";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  calculateDaysDifference,
  formattedYearToDayNotDayOfWeek,
} from "@/feature/DateFormat";
import { useEffect, useState } from "react";
import { PaymentFetch } from "@/feature/payment/PaymentFetch";
import { PaymentResponseDto } from "@/feature/payment/payment";

export default function ReservationPayment() {
  const [paymentResponse, setPaymentResponse] =
    useState<PaymentResponseDto | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
  const reservationNumber = searchParams.get("reservationNumber"); // reservation 파라미터 값 읽기

  const handleHome = () => {
    router.push("/yanolza/main");
  };

  useEffect(() => {
    const paymentFetch = async () => {
      if (reservationNumber != null) {
        console.log(reservationNumber);
        const response = await PaymentFetch({ reservationNumber });
        setPaymentResponse(response);
      }
    };
    paymentFetch();
  }, []);

  useEffect(() => {
    console.log(paymentResponse);
  }, [paymentResponse]);

  const startDate = {
    year: "2023",
    month: "06",
    day: "14",
  };
  const endDate = {
    year: "2023",
    month: "06",
    day: "15",
  };

  const data = {
    type: "호텔",
    roomName: "김포 마리나베이 호텔",
    startDate: startDate,
    endDate: endDate,
    roomType: "디럭스 트윈",
    capacity: 2,
    maxCapacity: 3,
    checkIn: "16:00",
    checkOut: "12:00",
    price: 75000,
  };

  const payment = {
    type: "카카오페이",
    date: "2023-06-12 10:57 AM",
    state: "결제 완료",
    orderId: "어쩌고저쩌고",
  };
  return (
    <>
      <div className="flex h-screen w-full justify-center bg-gray-100 font-sans">
        <div className="relative flex h-full w-[360px] flex-col bg-white px-[20px]">
          <MainHeaders title={"결제 완료"} backIcon={true} />
          <div className="mb-[16px] mt-[26px]">
            <span className="text-[14px] font-bold">상품 정보</span>
          </div>
          {paymentResponse?.paymentRooms.map((reservationRoom, index) => {
            return (
              <div key={reservationRoom.roomName}>
                <ReservationRoomList reservationRoom={reservationRoom} />
                {index !== paymentResponse.paymentRooms.length - 1 && (
                  <hr className="my-[18px]" />
                )}
              </div>
            );
          })}
          <hr className="mb-[17px] ml-[-20px] mt-[14px] w-[360px] border-[3.5px]"></hr>
          <div className="flex flex-col gap-[17px] text-[14px] tracking-[-1px]">
            <div>
              <span className="font-bold">결제 정보</span>
            </div>
            {paymentResponse && (
              <>
                <div className="flex gap-[30px]">
                  <span>결제 수단</span>
                  <span className="text-[#666666]">
                    {paymentResponse.accommodationCategory}
                  </span>
                </div>
                <div className="flex gap-[30px]">
                  <span>결제 일시</span>
                  <span className="text-[#666666]">
                    {paymentResponse.paymentAt}
                  </span>
                </div>
                <div className="flex gap-[30px]">
                  <span>주문 상태</span>
                  <span className="text-[#666666]">
                    {paymentResponse.paymentStatus}
                  </span>
                </div>
                <div className="flex gap-[30px]">
                  <span>주문 번호</span>
                  <span className="text-[#666666]">
                    {paymentResponse.reservationNumber}
                  </span>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className="fixed bottom-0 mb-[20px] mt-[50px] h-[50px] w-[320px] rounded-[5px] bg-[#8728FF]"
              onClick={handleHome}
            >
              <span className="font-bold tracking-[-0.5px] text-white">
                홈으로 돌아가기
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const ReservationRoomList = ({ reservationRoom }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <div>
            <Image
              src={"/hotel1.png"}
              width={100}
              height={100}
              alt="productImage"
            ></Image>
          </div>
          <div className="ml-[9px]">
            <div className="tracking-[-0.5px]">
              <div className="flex items-center">
                <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
                  {reservationRoom.accommodationCategory}
                </div>
              </div>
              <div className="mb-[3px] mt-[2px] flex items-center">
                <span className="text-[14px] font-bold">
                  {reservationRoom.accommodationName}
                </span>
              </div>
              <div className="mb-px flex h-[19px] items-center">
                <span className="text-[12px] font-bold">
                  {`${formattedYearToDayNotDayOfWeek(reservationRoom.reservationRoomStartDate, reservationRoom.reservationRoomEndDate)}, ${calculateDaysDifference(reservationRoom.reservationRoomStartDate, reservationRoom.reservationRoomEndDate)}박`}
                </span>
              </div>
              <div className="flex h-[19px] items-center">
                <span className="text-[12px] font-bold text-[#7F7F7F]">{`${reservationRoom.roomName} (기준 ${reservationRoom.roomCapacity}/최대 ${reservationRoom.roomMaxCapacity})`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[17px] flex h-[45px] items-center justify-between rounded-[7px] bg-[#E5E5E5]/40 px-[16px] text-[12px] font-bold">
          <span className="text-[#333333]">이용시간</span>
          <div className="mr-[16px] flex gap-[20px]">
            <div className="flex gap-[5px]">
              <span className="text-[#7F7F7F]">체크인</span>
              <span className="text-[#4C4C4C]">
                {reservationRoom.reservationRoomStartTime}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span className="text-[#7F7F7F]">체크아웃</span>
              <span className="text-[#4C4C4C]">
                {reservationRoom.reservationRoomEndTime}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[13px] flex items-center justify-between">
          <span className="pl-4 text-[12px] font-bold">결제 금액</span>
          <span className="mr-[3px] font-bold">{`${reservationRoom.reservationRoomPrice}원`}</span>
        </div>
      </div>
    </>
  );
};
