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
import CalendarPage2 from "@/components/CalendarPage2";
import { RatingStars } from "@/components/RatingStar";

import { formattedMonthToDay } from "@/feature/DateFormat";
import { useCalendar } from "@/feature/CalendarContext";
import { AccommodationRoomList } from "@/components/accommodation/accommodationRoomList";
import { accommodationApi } from "@/feature/accommodation/api/api";
import { SlideImage } from "@/feature/accommodation/type/accommodation.type";
import { useRouter } from "next/navigation";
import ReviewList from "@/app/accommodation/[accommodationId]/review/ReviewListComponent";
import MainHeaders from "@/components/MainHeaders";
// interface ImgComponent {
//   imageUrl: string;
// }

export default function AccommodationDetail({
  params,
}: {
  params: { accommodationId: string };
}) {
  const [images, setImages] = useState<SlideImage[]>([]);

  const [accommodationCategory, setAccommodationCategory] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [totalReview, setTotalReview] = useState(0);

  const [onCalendar, setOnCalendar] = useState(false);
  const { checkInDate, checkOutDate, adultNumber } = useCalendar();

  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);
  // const [canScrollNext, setCanScrollNext] = useState(true);

  // const [imageIndex, setImageIndex] = useState<number>(0);
  // const [slideIndex, setSlideIndex] = useState<number>(0);
  const router = useRouter();

  const onClickBack = () => {
    console.log("history back");
  };

  const onClickCart = () => {
    console.log("cart click");
  };

  const {
    data: accommodationData,
    isLoading: isAccommodationLoading,
    isError: isAccommodationError,
  } = accommodationApi.useAccommodationDetailQuery({
    requestAccommodationDetail: { accommodationId: params.accommodationId },
  });

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = accommodationApi.useAccommodationImagesQuery({
    requestAccommodationImages: {
      accommodationId: params.accommodationId,
      page: currentPage,
      size: 3,
    },
  });

  useEffect(() => {
    if (accommodationData) {
      const { status, message, data: accommodationDetail } = accommodationData;

      setAccommodationCategory(accommodationDetail.accommodationCategory);
      setName(accommodationDetail.name);
      setTotalReview(accommodationDetail.totalReview);
      setRating(accommodationDetail.rating ?? 0);
    }
  }, [accommodationData]);

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
  // }, [api, canScrollNext, currentPage]);

  if (isAccommodationLoading || isImagesLoading) {
    return <div>Loading...</div>;
  }

  if (isAccommodationError || isImagesError) {
    alert("잘못된 접근입니다.");
    router.push("/");
  }

  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      {onCalendar ? (
        <div className="relative flex h-full w-[360px] flex-col bg-white px-[20px]">
          <CalendarPage2 setOnCalendar={setOnCalendar} />
        </div>
      ) : (
        <div className="flex w-[360px] flex-col gap-2 bg-white">
          {/* <div className="flex flex-row  justify-between px-5 pt-[57px]">
            <button onClick={onClickBack}>
              <img src="/ic_back.png" alt="뒤로가기" />
            </button>
            <span className="text-base font-bold">{name}</span>
            <button onClick={onClickCart}>
              <img src="/ic_productdetail_market.png" alt="장바구니" />
            </button>
          </div> */}
          {/* 헤더 영역 (뒤로가기 | 타이틀 | 장바구니) */}
          <div className="px-5">
            <MainHeaders title={"객실상세"} backIcon={true} cartIcon={true} />
          </div>
          {/* 숙소 이미지 영역 */}
          <div>
            <Carousel
              opts={{
                align: "start",
                watchDrag: false,
                duration: 10,
                // slidesToScroll: 5,
                //   startIndex: 1,
                //   loop: true,
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
                      //   className="size-[110px]"
                    />
                  </CarouselItem>
                ))}
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
                  {accommodationCategory}
                </div>
              </div>
              <div className="mt-[3px] flex items-center font-bold">
                <span className="text-base">{name}</span>
              </div>
              <div className="mt-px flex items-center">
                <span className="text-[14px] ">{rating}</span>
                <span className="ml-[5px] flex gap-[2px] text-[14px]">
                  {RatingStars(rating)}
                </span>
                <span className="ml-[6px] text-[12px] text-[#999999]">
                  {/* {`(${dummy.reviewCount.toLocaleString()})`} */}(
                  {totalReview.toLocaleString()})
                </span>
              </div>
              <div className="mt-[2px] flex items-center">
                <span className="text-[10px] text-[#7F7F7F]">
                  {/* TEST DISTANCE - 보류 */}
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

                {/* 객실 리스트 */}
                <AccommodationRoomList
                  accommodationId={params.accommodationId}
                />
              </TabsContent>
              <TabsContent value="review">
                <ReviewList
                  accommodationId={params.accommodationId}
                  rating={rating}
                  totalReview={totalReview}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
