import { RatingStars } from "@/components/RatingStar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { reviewApi } from "@/feature/review/api/api";
import { Review, ReviewStatistics } from "@/feature/review/type/review.type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ReviewList = ({
  rating,
  totalReview,
  accommodationId,
}: {
  accommodationId: string;
  rating: number;
  totalReview: number;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStatistics, setReviewStatistics] = useState<ReviewStatistics[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const elementRef = useRef(null);

  const {
    data: reviewStatisticsData,
    isLoading: isReviewStatisticsLoading,
    isError: isReviewStatisticsError,
  } = reviewApi.useAccommodationReviewStatisticsQuery({
    requestAccommodationReviewStatistics: {
      accommodationId: accommodationId,
    },
  });

  const {
    data: reviewData,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = reviewApi.useAccommodationReviewQuery({
    requestAccommodationReview: {
      accommodationId: accommodationId,
      page: currentPage,
      size: 4,
    },
  });

  useEffect(() => {
    if (reviewStatisticsData) {
      setReviewStatistics(reviewStatisticsData.data);
    }
  }, [reviewStatisticsData]);

  useEffect(() => {
    if (reviewData) {
      setReviews((prevReviews) => [...prevReviews, ...reviewData.data.content]);
      setCanScrollNext(!reviewData.data.last);
    }
  }, [reviewData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && canScrollNext && !isReviewLoading) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = elementRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [setCanScrollNext, isReviewLoading, canScrollNext]);

  if (isReviewStatisticsLoading || isReviewLoading) {
    return <div>Loading...</div>;
  }

  if (isReviewStatisticsError || isReviewError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 평점 및 리뷰 요약 */}
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-5 shadow-md">
        <div className="flex flex-col space-x-2 text-center">
          <h1 className="text-2xl font-bold">{rating}</h1>
          <div className="flex justify-between space-x-1">
            {RatingStars(rating)}
          </div>
          <span className="text-gray-600">(리뷰 {totalReview})</span>
        </div>
        <div className="w-3/5 flex-col">
          {/* {ratingDummy.scoreGroup.map((scoreInfo, index) => ( */}
          {reviewStatistics.map((scoreInfo, index) => (
            <div key={index} className="flex items-center gap-3 text-xs">
              <div>{scoreInfo.rate}점</div>
              <div className="flex w-3/5 items-center py-2">
                <Progress
                  className="h-1.5"
                  value={(scoreInfo.rateCount / totalReview) * 100}
                />
              </div>
              <div>{scoreInfo.rateCount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 상세 */}
      {reviews.map((reviewInfo, index) => (
        <div key={index} className="flex w-full border-b-2">
          <img
            className="my-4 mr-2 size-10 rounded-full"
            src="https://via.placeholder.com/48"
            alt="User profile"
          />
          <div className="relative flex w-[272px] flex-col gap-1 py-5 text-xs">
            <span className="text-sm font-bold">{reviewInfo.nickName}</span>
            <div className="flex">{RatingStars(reviewInfo.rate)}</div>
            <span className="max-w-fit rounded-md bg-purple-100 p-1 tracking-[-0.5px] text-purple-700">
              {reviewInfo.roomName} 이용
            </span>
            <span className="absolute right-5 top-5 text-gray-500">
              {reviewInfo.createDate}
            </span>
            <div className="mt-4 text-gray-700">
              <p>{reviewInfo.content}</p>
            </div>
            {reviewInfo.reviewPhoto?.length > 0 && (
              <div className="mt-4 gap-2">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                >
                  <CarouselContent>
                    {reviewInfo.reviewPhoto.map((photo, index) => (
                      <CarouselItem
                        key={index}
                        className={`basis-1/${reviewInfo.reviewPhoto?.length}`}
                      >
                        <Image
                          src={photo}
                          alt="productList"
                          width={128}
                          height={96}
                          className="h-24 w-32"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </div>
        </div>
      ))}
      {canScrollNext && <div ref={elementRef}></div>}
    </div>
  );
};
