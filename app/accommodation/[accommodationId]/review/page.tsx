import { RatingStars } from "@/components/RatingStar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export const ReviewList = () => {
  const ratingDummy = {
    totalReviews: 511,
    ratringAvg: 4.3,
    scoreGroup: [
      { score: 5, scoreCount: 277 },
      { score: 4, scoreCount: 167 },
      { score: 3, scoreCount: 56 },
      { score: 2, scoreCount: 7 },
      { score: 1, scoreCount: 4 },
    ],
  };
  // nickName
  // roomName
  // createAt 우선은 등록일자 --- 등록일자 or 이용일자
  // review
  // reviewPhoto
  const reviewDummy = {
    reviews: [
      {
        nickName: "베토디럭스",
        roomName: "스탄다드 디럭스",
        createAt: "2022.11.15",
        rating: 5,
        review: "테스트테스트테스트테스트테스트테스트테스트",
        reviewPhoto: [],
      },
      {
        nickName: "베토디럭스",
        roomName: "스탄다드 디럭스",
        createAt: "2022.11.15",
        rating: 4,
        review: "테스트테스트테스트테스트테스트테스트테스트",
        reviewPhoto: [
          "/images/beach_resort_standard.jpg",
          "/images/beach_resort_standard.jpg",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 평점 및 리뷰 요약 */}
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-5 shadow-md">
        <div className="flex flex-col space-x-2 text-center">
          <h1 className="text-2xl font-bold">4.0</h1>
          <div className="flex justify-between space-x-1">
            {RatingStars(ratingDummy.ratringAvg)}
          </div>
          <span className="text-gray-600">(리뷰 1,136)</span>
        </div>
        <div className="w-3/5 flex-col">
          {ratingDummy.scoreGroup.map((scoreInfo, index) => (
            <div key={index} className="flex items-center gap-3 text-xs">
              <div>{scoreInfo.score}점</div>
              <div className="flex w-3/5 items-center py-2">
                <Progress
                  className="h-1.5"
                  value={
                    (scoreInfo.scoreCount / ratingDummy.totalReviews) * 100
                  }
                />
              </div>
              <div>{scoreInfo.scoreCount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 상세 */}
      {reviewDummy.reviews.map((reviewInfo, index) => (
        <div key={index} className="flex w-full border-b-2">
          <img
            className="my-4 mr-2 size-10 rounded-full"
            src="https://via.placeholder.com/48"
            alt="User profile"
          />
          <div className="relative flex w-full flex-col gap-1 py-5 text-xs">
            <span className="text-sm font-bold">{reviewInfo.nickName}</span>
            <div className="flex">{RatingStars(reviewInfo.rating)}</div>
            <span className="max-w-fit rounded-md bg-purple-100 p-1 tracking-[-0.5px] text-purple-700">
              {reviewInfo.roomName}
            </span>
            <span className="absolute right-5 top-5 text-gray-500">
              {reviewInfo.createAt}
            </span>
            <div className="mt-4 text-gray-700">
              <p>{reviewInfo.review}</p>
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
    </div>
  );
};
