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
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import CalendarPage2 from "@/components/CalendarPage2";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slice/modalSlice";
import { Modal } from "@/components/Modal";
import { useCalendar } from "@/feature/CalendarContext";
import { formattedMonthToDay } from "@/feature/DateFormat";
import {
  dayUseTimeFormat,
  calculateTimeDifference,
} from "@/feature/DateFormat";
import "@/styles/DragSlide.css";
import ReactSlick from "@/components/ReactSlick";
import { DragSlideTimeButton } from "@/components/DragSlideButton";

export default function RoomDetail({ params }: { params: { roomId: string } }) {
  const [onCalendar, setOnCalendar] = useState(false);
  const { adultNumber, checkInDate, checkOutDate } = useCalendar();

  const imageData = [
    "/img_productdetail_hotel01_tablet.png",
    "/hotel1.png",
    "/hotel2.png",
    "/hotel3.png",
    "/hotel4.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
    "/img_productdetail_hotel01_tablet.png",
  ];

  // 이미지 총 갯수 필요
  const dummy = {
    title: "프리미엄 트윈",
    comment: "주차불가 / 마운틴뷰 OR 오션뷰 OR 시티뷰 랜덤배정",
    capacity: 2,
    maxCapacity: 4,
    type: "NORMAL | ALL",
    //숙박은 default
    minPrice: "20,000원",
    checkIn: "15:00",
    checkOut: "11:00",
    reserveAvailable: true,
    dayUseInfo: {
      dayUseAvailable: true,
      dayUseStartTime: "13:00",
      dayUseEndTime: "21:00",
      dayUseMinPrice: "15,000원",
      dayUseTime: "4",
    },
  };

  const [api, setApi] = useState<CarouselApi>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [reservationType, setReservationType] = useState("");

  // const test = "/images/test.jpg";
  const test = "/hote1.png";

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
    setReservationType("");
    console.log("reserv click");
    dispatch(openModal());
  };

  const onClickDayUseReservation = () => {
    setReservationType("dayuse");
    console.log("dayUse reserv click");
    dispatch(openModal());
  };

  //   사용 보류
  useEffect(() => {
    let lastPosition = api?.scrollProgress(); // 이전 스크롤 위치
    let slidesMoved = 0;
    api?.on("scroll", () => {
      const currentPosition = api.scrollProgress(); // 현재 스크롤 위치

      // 스크롤 위치가 변경되면 이동량 계산
      if (Math.abs(currentPosition - lastPosition) > 0.5) {
        slidesMoved++;
        console.log(`Slides moved: ${slidesMoved}`);
        lastPosition = currentPosition; // 이전 위치 업데이트
      }
    });
  }, [api]);

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
            <ReactSlick dataImages={imageData} />
            {/*<Carousel
              opts={{
                align: "start",
                //   startIndex: 1,
                //   loop: true,
              }}
              setApi={setApi}
            >
              <CarouselContent>
                <CarouselItem>
                  <Image
                    // src="/images/beach_resort_standard.jpg"
                    src="/img_productdetail_hotel01_tablet.png"
                    alt="productList"
                    width={360}
                    height={228}
                    //   className="size-[110px]"
                  />
                  
                </CarouselItem>
                <CarouselItem>
                  <Image
                    // src="/images/beach_resort_standard.jpg"
                    src="/img_productdetail_hotel01_tablet.png"
                    alt="productList"
                    width={360}
                    height={228}
                    //   className="size-[110px]"
                  />
                  
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src={test}
                    alt="productList"
                    width={360}
                    height={228}
                    //   className="size-[110px]"
                  />
                  
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>*/}
          </div>
          <div className="px-5">
            <div className="flex flex-col gap-[5px] pb-4">
              <div className="mt-[3px] flex items-center font-bold">
                <span className="text-base">{dummy.title}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-[#7F7F7F]">{dummy.comment}</span>
              </div>
              <div className="mt-[6px] flex flex-col items-start gap-2 rounded-md bg-gray-100 p-3 text-xs text-gray-800">
                <div className="flex">
                  <div className="pr-3 font-bold text-[#7F7F7F]">객실 정보</div>
                  <div className="pl-1 text-[#4C4C4C]">기준 2인 (최대 3인)</div>
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
                          {`최대 ${dummy.dayUseInfo.dayUseTime}시간 이용`}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-[#7F7F7F]">
                        운영시간
                        <span className="py-1 pl-2 font-normal text-[#4C4C4C]">
                          {`${dummy.dayUseInfo.dayUseStartTime} ~ ${dummy.dayUseInfo.dayUseEndTime}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="px-1 text-[10px] text-[#8728FF]">
                        1개 남음
                      </span>
                      <span className="px-1 pb-px text-right text-base font-bold">
                        {dummy.dayUseInfo.dayUseMinPrice}
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
                          {dummy.checkIn}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-[#7F7F7F]">
                        체크아웃
                        <span className="py-1 pl-2 font-normal text-[#4C4C4C]">
                          {dummy.checkOut}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="px-1 text-[10px] text-[#8728FF]">
                        1개 남음
                      </span>
                      <span className="px-1 pb-px text-right text-base font-bold">
                        {dummy.minPrice}
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
        <ReservationType dummy={dummy} reservationType={reservationType} />
      </Modal>
    </div>
  );
}

const ReservationType = ({ dummy, reservationType }) => {
  return (
    <>
      <div className="mb-[16px] mt-[25px] text-[16px] font-bold">{`${reservationType == "dayuse" ? "대실 예약" : "숙박 예약"}`}</div>
      <div className="flex justify-between">
        <Image
          // src="/images/beach_resort_standard.jpg"
          src="/hotel2.png"
          alt=""
          width={95}
          height={95}
        />
        <div className="flex flex-col gap-1">
          <span>{dummy.title}</span>
          <div className="flex w-[218px] items-center justify-center gap-[7px] rounded-md bg-gray-100 p-[10px] text-xs">
            <div className="text-center">
              <span className="text-[#999999]">체크인</span>
              <br />
              <span>2023.06.14(수)</span>
              <br />
              <span>16:00</span>
            </div>
            <div className="rounded-2xl bg-[#CCCCCC] px-[8px] py-[2px] text-[10px] text-[#666666]">
              {"1박"}
            </div>
            <div className="text-center">
              <span className="text-[#999999]">체크아웃</span>
              <br />
              <span>2025.06.15(목)</span>
              <br />
              <span>11:00</span>
            </div>
          </div>
        </div>
      </div>
      <DragSlideTimeButton reservationType={reservationType} dummy={dummy} />
      <div
        className={`${reservationType == "dayuse" ? "mt-[9px]" : "mt-[14px]"} text-[12px] text-[#B2B2B2]`}
      >
        ⦁ &nbsp;&nbsp;현장상황에 따라 객실 랜덤배정 (객실지정불가) <br />
        ⦁ &nbsp;&nbsp;예약 후 10분 내 취소될 경우 취소 수수료가 발생하지
        않습니다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(*체크인 시간 경과 후 제외)
      </div>
      <div className="mb-[15px] mt-[20px] flex justify-between">
        {/* 숙박 몇박인지, 대실 몇시간인지 계산하는 로직 추가해야 함. */}
        <div>
          <span className="font-bold">{`${reservationType == "dayuse" ? `대실 ` : "숙박 "}`}</span>
          <span className="font-normal">{`${reservationType == "dayuse" ? `(${dummy.dayUseInfo.dayUseTime}시간)` : "(1박)"}`}</span>
        </div>
        <span className="font-bold">{`${reservationType == "dayuse" ? dummy.dayUseInfo.dayUseMinPrice : dummy.minPrice}`}</span>
      </div>
      <div className="flex justify-between">
        <Button className="w-[155px] rounded-lg border border-[#8728FF] bg-white px-8 text-[#8728FF] hover:bg-purple-50">
          장바구니 담기
        </Button>
        <Button className="w-[155px] px-8" variant={"point"}>
          장바구니 담기
        </Button>
      </div>
    </>
  );
};
