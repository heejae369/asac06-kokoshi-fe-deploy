"use client";

import { Button } from "@/components/ui/button";
import { accommodationApi } from "@/feature/accommodation/api/api";
import {
  RoomType,
  Room,
  requestAccommodationRoomList,
} from "@/feature/accommodation/type/accommodation.type";
import { useCalendar } from "@/feature/CalendarContext";
import { formattedRequestDate } from "@/feature/DateFormat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AccommodationRoomList = ({
  accommodationId,
}: {
  accommodationId: string;
}) => {
  const router = useRouter();
  const { checkInDate, checkOutDate, adultNumber } = useCalendar();

  const [roomList, setRoomList] = useState<Room[]>([]);

  // accommodationId: string;
  // reservationStart: string;
  // reservationEnd: string;
  // capacity: number;
  const requestAccommodationRoomList: requestAccommodationRoomList = {
    accommodationId: accommodationId,
    startDate: formattedRequestDate(checkInDate),
    endDate: formattedRequestDate(checkOutDate),
    capacity: adultNumber,
  };

  const { data, isLoading, isError, refetch } =
    accommodationApi.useAccommodationRoomListQuery({
      requestAccommodationRoomList: requestAccommodationRoomList,
    });

  useEffect(() => {
    if (data) {
      const { status, message, data: AccommodationRoomList } = data;
      setRoomList(AccommodationRoomList);
    }
  }, [data]);

  // 데이터가 준비된 이후에만 실행
  useEffect(() => {
    if (checkInDate && checkOutDate && adultNumber) {
      refetch(); // 수동으로 실행
    }
  }, [checkInDate, checkOutDate, adultNumber, refetch]);

  // useEffect(() => {
  //   if (data) {
  //     const { status, message, data: accommodationDetail } = data;

  //     setAccommodationCategory(accommodationDetail.accommodationCategory);
  //     setName(accommodationDetail.name);
  //     setTotalReview(accommodationDetail.totalReview);
  //     setRating(accommodationDetail.rating);
  //   }
  // }, [data]);

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때 처리
  if (isError) {
    return <div>Error loading accommodation details</div>;
  }

  const onClickReservation = ({ roomId }: { roomId: number }) => {
    router.push(`1/${roomId}`);
  };

  // router.push(url, as, options)
  // url: [필수] 라우팅 하려는 url
  // as: [선택] 브라우저 url 바에 보여지는 path
  // options: [선택] ]scroll(라우팅 후 스크롤업), shallow, locale 등

  // 필요 정보 : 썸네일, 타이틀, 인원, max 인원, 최소 가격
  // 운영 정보 : (ALL, 숙박, 대실), 숙박 : 입/퇴실 시간, ALL : 대실 기준시간, 입/퇴실시간, 대실 & 숙박 최소가격
  return (
    <>
      {roomList.map((roomInfo, index) => (
        <div
          key={index}
          className="mt-3 flex flex-col rounded-[10px] p-3 shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]"
        >
          <div className="flex">
            <div className="size-[110px]">
              <Image
                src={roomInfo.thumbnail}
                alt="productList"
                width={110}
                height={110}
                className="size-[110px]"
              />
            </div>
            {roomInfo.roomType === RoomType.STAY ? (
              <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
                <span className="mt-[3px] flex items-center text-sm font-bold">
                  TEST
                </span>
                <div className="flex flex-col items-start gap-2 rounded-md bg-gray-100 p-3 text-[10px] text-gray-800">
                  <div className="flex">
                    <div className="pr-3 font-bold">객실 정보</div>
                    <div className="pl-1">
                      기준 {roomInfo.capacity}인 (최대 {roomInfo.maxCapacity}인)
                    </div>
                  </div>
                  <div className="flex">
                    <div className="pr-3 font-bold">입실/퇴실</div>
                    <div className="pl-1">
                      입실 {roomInfo.checkIn} 퇴실 {roomInfo.checkOut}
                    </div>
                  </div>
                </div>
                <span className="p-1 text-right text-base font-bold">
                  {roomInfo.minPrice}원
                </span>
              </div>
            ) : (
              <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
                <span className="mt-[3px] flex items-center text-sm font-bold">
                  TEST
                </span>
                <div className="flex flex-col items-start gap-2 rounded-md bg-gray-100 p-3 text-[10px] text-gray-800">
                  <div className="flex">
                    <div className="pr-3 font-bold">객실 정보</div>
                    <div className="pl-1">
                      기준 {roomInfo.capacity}인 (최대 {roomInfo.maxCapacity}인)
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pt-1">
                    <div className="pr-3 text-[10px] font-bold">
                      대실{" "}
                      <span className="font-light">
                        ( {roomInfo.dayUseInfo.dayUseTime}시간 기준 )
                      </span>
                    </div>
                    <div className="pl-1">
                      <span className="p-1 text-right text-base font-bold">
                        {roomInfo.dayUseInfo.dayUseMinPrice}원
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="pr-3 text-[10px] font-bold">
                      숙박{" "}
                      <span className="font-light">
                        ( {roomInfo.checkIn}~{roomInfo.checkOut} )
                      </span>
                    </div>
                    <div className="pl-1">
                      <span className="p-1 text-right text-base font-bold">
                        {roomInfo.minPrice}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="py-3 text-right">
            <Button
              onClick={() => onClickReservation({ roomId: roomInfo.roomId })}
              variant={"point"}
            >
              객실 예약하기
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};
