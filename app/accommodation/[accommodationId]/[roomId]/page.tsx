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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NowTomorrowDate from "@/feature/NowTomorrowDate";
import CalendarPage2 from "@/components/CalendarPage2";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slice/modalSlice";
import { Modal } from "@/components/Modal";

export default function RoomDetail({ params }: { params: { roomId: string } }) {
  const [calendar, setCalendar] = useState(NowTomorrowDate());
  const [onCalendar, setOnCalendar] = useState(false);
  const [adultNumber, setAdultNumber] = useState(1);
  const [kidNumber, setKidNumber] = useState(0);

  // 이미지 총 갯수 필요
  const dummy = {
    title: "방 이름",
    comment: "방 설명",
    capacity: 2,
    maxCapacity: 4,
    type: "NORMAL | ALL",
    //숙박은 default
    minPrice: 200000,
    checkIn: "15:00",
    checkOut: "11:00",
    reserveAvailable: true,
    dayUseInfo: {
      dayUseStartTime: "13:00",
      dayUseEndTime: "21:00",
      dayUseMinPrice: 150000,
      dayUseTime: "4",
    },
  };

  const [api, setApi] = useState<CarouselApi>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const test = "/images/test.jpg";

  const dispatch = useDispatch();

  const onClickBack = () => {
    console.log("history back");
  };

  const onClickCart = () => {
    console.log("cart click");
  };

  const onClickReservation = () => {
    console.log("reserv click");
    dispatch(openModal());
  };

  const onClickDayUseReservation = () => {
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
          <CalendarPage2
            setAdultNumber={setAdultNumber}
            setCalendar={setCalendar}
            setKidNumber={setKidNumber}
            setOnCalendar={setOnCalendar}
            calendar={calendar}
            adultNumber={adultNumber}
            kidNumber={kidNumber}
          />
        </div>
      ) : (
        <div className="flex w-[360px] flex-col gap-2 bg-white">
          {/* 헤더 영역 (뒤로가기 | 타이틀 | 장바구니) */}
          <div className="flex flex-row  justify-between px-5 pt-[57px]">
            <button onClick={onClickBack}>
              <img src="/ic_back.png" alt="뒤로가기" />
            </button>
            <span className="text-base font-bold">title</span>
            <button onClick={onClickCart}>
              <img src="/ic_productdetail_market.png" alt="장바구니" />
            </button>
          </div>
          {/* 숙소 이미지 영역 */}
          <div>
            <Carousel
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
                    src="/images/beach_resort_standard.jpg"
                    alt="productList"
                    width={360}
                    height={228}
                    //   className="size-[110px]"
                  />
                  {slideIndex <= 1 ? slideIndex - 1 : test.length}
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src="/images/beach_resort_standard.jpg"
                    alt="productList"
                    width={360}
                    height={228}
                    //   className="size-[110px]"
                  />
                  {slideIndex}
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src={test}
                    alt="productList"
                    width={360}
                    height={228}
                    //   className="size-[110px]"
                  />
                  {slideIndex + 1}
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="px-5">
            <div className="flex flex-col gap-4 pb-4">
              <div className="mt-[3px] flex items-center font-bold">
                <span className="text-base">TEST</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-[#7F7F7F]">Room Comment</span>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-md bg-gray-100 p-3 text-xs text-gray-800">
                <div className="flex">
                  <div className="pr-3 font-bold">객실 정보</div>
                  <div className="pl-1">기준 2인 (최대 3인)</div>
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
                  {calendar}
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
              <div className="mt-3 flex flex-col rounded-[10px] p-3 shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]">
                <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
                  <span className="mt-[3px] flex items-center text-sm font-bold">
                    대실
                  </span>
                  <div className="flex justify-between">
                    <div className="flex flex-col pt-2">
                      <div className="flex items-center text-xs font-light">
                        이용시간
                        <span className="py-1 pl-2 font-normal">
                          최대 4시간 이용
                        </span>
                      </div>
                      <div className="flex items-center text-xs font-light">
                        운영시간
                        <span className="py-1 pl-2 font-normal">
                          13:00 ~ 21:00
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="p-1 text-right text-base font-bold">
                        35000원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-1 text-right">
                  <Button onClick={onClickDayUseReservation} variant={"point"}>
                    대실 예약
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex flex-col rounded-[10px] p-3 shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]">
                <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
                  <span className="mt-[3px] flex items-center text-sm font-bold">
                    숙박
                  </span>
                  <div className="flex justify-between">
                    <div className="flex flex-col pt-2">
                      <div className="flex items-center text-xs font-light">
                        체크인
                        <span className="py-1 pl-2 font-normal">16:00</span>
                      </div>
                      <div className="flex items-center text-xs font-light">
                        체크아웃
                        <span className="py-1 pl-2 font-normal">11:00</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <span className="p-1 text-right text-base font-bold">
                        35000원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-1 text-right">
                  <Button onClick={onClickReservation} variant={"point"}>
                    숙박 예약
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#F6F6F6] pt-6"></div>

            <div>
              이용 안내
              <div className="mt-4 flex rounded-md bg-gray-100 p-2 text-xs tracking-[-0.5px] text-gray-800">
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
        {/* 컴포넌트로 분리, 대실 숙박 구분 필요 */}
        <div className="mb-[5px] mt-[10px] text-[16px] font-bold">정렬</div>
        <div className="flex justify-between">
          <Image
            src="/images/beach_resort_standard.jpg"
            alt=""
            width={95}
            height={95}
          />
          <div className="flex flex-col gap-1">
            <span>Title</span>
            <div className="flex items-center justify-center gap-2.5 rounded-md bg-gray-100 p-3 text-xs">
              <div className="text-center">
                <span>체크인</span>
                <br />
                <span>2025.01.01</span>
                <br />
                <span>test3</span>
              </div>
              <div className="flex items-center rounded-2xl bg-[#666666] px-2.5 py-1">
                1박
              </div>
              <div className="text-center">
                <span>체크아웃</span>
                <br />
                <span>2025.01.02</span>
                <br />
                <span>test3</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          현장상황에 따라 객실 랜덤배정 (객실지정불가) <br />
          예약 후 10분 내 취소될 경우 취소 수수료가 발생하지 않습니다. <br />
          (*체크인 시간 경과 후 제외)
        </div>
        <div className="flex justify-between">
          <span>~~~</span>
          <span>****</span>
        </div>
        <div className="flex justify-between">
          <Button className="px-8 rounded-lg border border-[#8728FF] bg-white text-[#8728FF] hover:bg-purple-50">
            장바구니 담기
          </Button>
          <Button className="px-8" variant={"point"}>
            장바구니 담기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
