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
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import NowTomorrowDate from "@/feature/NowTomorrowDate";
import CalendarPage2 from "@/components/CalendarPage2";
import { Room } from "@/components/accommodation/accommodationRoomList";
import { ReviewList } from "@/app/accommodation/[accommodationId]/review/page";
import { RatingStars } from "@/components/RatingStar";

export default function AccommodationDetail({
  params,
}: {
  params: { accommodationId: string };
}) {
  const [calendar, setCalendar] = useState(NowTomorrowDate());
  const [onCalendar, setOnCalendar] = useState(false);
  const [adultNumber, setAdultNumber] = useState(1);
  const [kidNumber, setKidNumber] = useState(0);

  // 이미지 총 갯수 필요
  const dummy = {
    title: "해변 리조트",
    rating: 4.8,
    totalReview: 234,
    accommodationType: "리조트",
    rooms: [
      {
        roomId: 1,
        title: "스탠다드 룸",
        thumbnail: "/images/beach_resort_standard.jpg",
        capacity: 2,
        maxCapacity: 3,
        minPrice: 150000,
        checkIn: "15:00",
        checkOut: "11:00",
        type: "NORMAL",
        dayUseInfo: {
          dayUseMinPrice: 100000,
          dayUseTime: "4",
        },
      },
      {
        roomId: 2,
        title: "디럭스 룸",
        thumbnail: "/images/beach_resort_deluxe.jpg",
        capacity: 2,
        maxCapacity: 4,
        minPrice: 200000,
        checkIn: "15:00",
        checkOut: "11:00",
        type: "ALL",
        dayUseInfo: {
          dayUseMinPrice: 150000,
          dayUseTime: "3",
        },
      },
    ],
  };

  const [api, setApi] = useState<CarouselApi>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const test = "/images/test.jpg";

  const onClickBack = () => {
    console.log("history back");
  };

  const onClickCart = () => {
    console.log("cart click");
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
          {/* 컨텐츠 영역 */}
          <div className="px-5">
            <div className="flex flex-col ">
              <div className="flex items-center">
                <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
                  {/* {dummy.tag} */}TEST TAG
                </div>
              </div>
              <div className="mt-[3px] flex items-center font-bold">
                <span className="text-base">TEST</span>
              </div>
              <div className="mt-px flex items-center">
                <span className="text-[14px] ">4</span>
                <span className="ml-[5px] flex gap-[2px] text-[14px]">
                  {RatingStars(4)}
                </span>
                <span className="ml-[6px] text-[12px] text-[#999999]">
                  {/* {`(${dummy.reviewCount.toLocaleString()})`} */}
                  (400)
                </span>
              </div>
              <div className="mt-[2px] flex items-center">
                <span className="text-[10px] text-[#7F7F7F]">
                  {/* {dummy.distance} */}
                  TEST DIS
                </span>
              </div>
            </div>
            <Tabs defaultValue="room">
              <TabsList className="flex w-full border-b-2 border-gray-300">
                <TabsTrigger value="room">객실 선택</TabsTrigger>
                <TabsTrigger value="review">후기</TabsTrigger>
              </TabsList>
              <TabsContent value="room">
                <div className="flex gap-[7px] pt-[6px]">
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

                {/* 객실 리스트 */}
                {dummy.rooms.map((roomInfo, index) => (
                  <Room roomInfo={roomInfo} key={index} />
                ))}
              </TabsContent>
              <TabsContent value="review">
                <ReviewList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
