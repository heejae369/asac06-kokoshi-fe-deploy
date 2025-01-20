"use client";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CalendarPage2 from "@/components/CalendarPage2";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slice/modalSlice";
import { Modal } from "@/components/Modal";
import { useCalendar } from "@/feature/CalendarContext";
import {
  formattedMonthToDay,
  formattedRequestDate,
} from "@/feature/DateFormat";
import "@/styles/DragSlide.css";
import {
  requestAccommodationRoomDetail,
  Room,
  SlideImage,
} from "@/feature/accommodation/type/accommodation.type";
import { accommodationApi } from "@/feature/accommodation/api/api";
import { ReservationType } from "@/components/accommodation/reservationModalContent";

export default function RoomDetail({
  params,
}: {
  params: { roomId: string; accommodationId: string };
}) {
  const [onCalendar, setOnCalendar] = useState(false);
  const { adultNumber, checkInDate, checkOutDate } = useCalendar();

  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);

  const [roomDetail, setRoomDetail] = useState<Room>();
  const [images, setImages] = useState<SlideImage[]>([]);
  const [reservationType, setReservationType] = useState("STAY");

  // 장바구니 수
  const cartCount = "1";

  const dispatch = useDispatch();

  const onClickBack = () => {
    console.log("history back");
  };

  const onClickCart = () => {
    console.log("cart click");
  };

  const onClickReservation = () => {
    setReservationType("STAY");
    dispatch(openModal());
  };

  const onClickDayUseReservation = () => {
    setReservationType("DAY_USE");
    dispatch(openModal());
  };

  const requestAccommodationRoomDetail: requestAccommodationRoomDetail = {
    roomId: params.roomId,
    startDate: formattedRequestDate(checkInDate),
    endDate: formattedRequestDate(checkOutDate),
    capacity: adultNumber,
  };

  const {
    data: roomDetailData,
    isLoading: isRoomDetailLoading,
    isError: isRoomDetailError,
  } = accommodationApi.useAccommodationRoomDetailQuery({
    requestAccommodationRoomDetail: requestAccommodationRoomDetail,
  });

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = accommodationApi.useAccommodationRoomImagesQuery({
    requestAccommodationRoomImages: {
      roomId: params.roomId,
      page: currentPage,
      size: 3,
    },
  });

  useEffect(() => {
    if (roomDetailData) {
      setRoomDetail(roomDetailData.data);
    }
  }, [roomDetailData]);

  useEffect(() => {
    if (imagesData) {
      // setCanScrollNext(!imagesData.data.last);
      setImages((prevImages) => [...prevImages, ...imagesData.data.content]);
    }
  }, [imagesData]);

  useEffect(() => {
    api?.on("slidesInView", () => {
      // console.log("canScrollNext : ", canScrollNext);
      // if (!canScrollNext) {
      //   return;
      // }

      if (!api?.canScrollNext()) {
        setCurrentPage(currentPage + 1);
      }
    });
  }, [api, currentPage]);

  if (isRoomDetailLoading || isImagesLoading) {
    return <div>Loading...</div>;
  }

  if (isRoomDetailError || isImagesError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      {onCalendar ? (
        <div className="relative flex h-full w-[360px] flex-col bg-white px-[20px]">
          <CalendarPage2 setOnCalendar={setOnCalendar} />
        </div>
      ) : (
        <div className="flex w-[360px] flex-col bg-white tracking-[-0.5px]">
          {/* 헤더 영역 (뒤로가기 | 타이틀 | 장바구니) */}
          <div className="flex flex-row  justify-between px-5 pt-[57px]">
            <button onClick={onClickBack}>
              <img src="/ic_back.png" alt="뒤로가기" />
            </button>
            <span className="text-base font-bold">객실상세</span>
            <button onClick={onClickCart}>
              <div className="relative right-1.5  top-1 flex size-[12px] items-center justify-center rounded-[50%] bg-[#8728FF]">
                <span className="text-center text-[10px] text-white">
                  {cartCount}
                </span>
              </div>
              <img src="/ic_productdetail_market.png" alt="장바구니" />
            </button>
          </div>
          {/* 숙소 이미지 영역 */}
          <div className="mb-[13px] mt-[12px]">
            <Carousel
              opts={{
                align: "start",
                watchDrag: false,
                duration: 10,
              }}
              setApi={setApi}
            >
              <CarouselContent>
                {images.map((images, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={images.imageUrl}
                      alt="productList"
                      width={360}
                      height={228}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="px-5">
            <div className="flex flex-col gap-[5px] pb-4">
              <div className="mt-[3px] flex items-center font-bold">
                <span className="text-base">{roomDetail?.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-[#7F7F7F]">
                  {roomDetail?.comment}
                </span>
              </div>
              <div className="mt-[6px] flex flex-col items-start gap-2 rounded-md bg-gray-100 p-3 text-xs text-gray-800">
                <div className="flex">
                  <div className="pr-3 font-bold text-[#7F7F7F]">객실 정보</div>
                  <div className="pl-1 text-[#4C4C4C]">
                    기준 {roomDetail?.capacity}인 (최대{" "}
                    {roomDetail?.maxCapacity}인)
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#F6F6F6] pt-4"></div>

            <div className="flex gap-[7px] pb-4">
              <button
                className="flex h-[37px] w-[200px] items-center rounded-[18px] bg-[#F6F6F6]"
                onClick={() => setOnCalendar(true)}
              >
                <Image
                  src={calendarIcon}
                  alt="calendar"
                  className="ml-[17px]"
                />
                <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
                  {formattedMonthToDay(checkInDate, checkOutDate)}
                </span>
              </button>
              <button
                className="flex h-[37px] w-[114px] items-center rounded-[18px] bg-[#F6F6F6]"
                onClick={() => setOnCalendar(true)}
              >
                <Image
                  src={personnelIcon}
                  alt="personnel"
                  className="ml-[15px]"
                />
                <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
                  {`성인 ${adultNumber}명`}
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-1 pb-6">
              <div className="mt-3 flex flex-col rounded-[10px] px-3 pb-[15px] pt-3 shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]">
                <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
                  <div className="flex items-end justify-between">
                    <span className="mt-[3px] flex items-center text-sm font-bold">
                      대실
                    </span>
                    <div className="flex h-[16px] items-center bg-[#8728FF] bg-opacity-20 px-[4px]">
                      <span className="text-[10px] font-bold text-[#8728FF]">
                        선착순 3,000원 특가
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col pt-2">
                      <div className="flex items-center text-xs text-[#7F7F7F]">
                        이용시간
                        <span className="py-1 pl-2 font-normal text-[#4C4C4C]">
                          {`최대 ${roomDetail?.dayUseInfo?.dayUseTime}시간 이용`}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-[#7F7F7F]">
                        운영시간
                        <span className="py-1 pl-2 font-normal text-[#4C4C4C]">
                          {`${roomDetail?.dayUseInfo?.dayUseStartTime} ~ ${roomDetail?.dayUseInfo?.dayUseEndTime}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="px-1 text-[10px] text-[#8728FF]">
                        {roomDetail?.dayUseInfo?.dayUseAvailableQuantity}개 남음
                      </span>
                      <span className="px-1 pb-px text-right text-base font-bold">
                        {roomDetail?.dayUseInfo?.dayUseMinPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-1 text-right">
                  <Button
                    onClick={onClickDayUseReservation}
                    variant={"point"}
                    className="h-[30px] w-[68px] text-[12px]"
                  >
                    대실 예약
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex flex-col rounded-[10px] px-3 pb-[15px] pt-3 shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]">
                <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
                  <div className="flex items-end justify-between">
                    <span className="mt-[3px] flex items-center text-sm font-bold">
                      숙박
                    </span>
                    <div className="flex h-[16px] items-center bg-[#8728FF] bg-opacity-20 px-[4px]">
                      <span className="text-[10px] font-bold text-[#8728FF]">
                        선착순 3,000원 특가
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col pt-2">
                      <div className="flex items-center text-xs text-[#7F7F7F]">
                        체크인
                        <span className="py-1 pl-2 font-normal text-[#4C4C4C]">
                          {roomDetail?.checkIn}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-[#7F7F7F]">
                        체크아웃
                        <span className="py-1 pl-2 font-normal text-[#4C4C4C]">
                          {roomDetail?.checkOut}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="px-1 text-[10px] text-[#8728FF]">
                        {roomDetail?.availableQuantity}개 남음
                      </span>
                      <span className="px-1 pb-px text-right text-base font-bold">
                        {roomDetail?.minPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-1 text-right">
                  <Button
                    onClick={onClickReservation}
                    variant={"point"}
                    className="h-[30px] w-[68px] text-[12px]"
                  >
                    숙박 예약
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#F6F6F6] pt-[13px]"></div>

            <div className="mb-[15px]">
              <span className="text-[14px]">이용 안내</span>
              <div className="mt-[10px] flex rounded-md bg-gray-100 px-[13px] py-[19px] text-xs tracking-[-0.5px] text-gray-800">
                객실 호수 및 디자인은 호텔 운영 상황에 따라 랜덤 배정됩니다.
                <br />
                객실은 사진과 다른 방이 배정 될 수 있습니다.
                <br />
                퇴실 시간 초과 시 추가 요금이 자동 부과될 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal>
        <ReservationType
          roomDetail={roomDetail}
          reservationType={reservationType}
        />
      </Modal>
    </div>
  );
}
