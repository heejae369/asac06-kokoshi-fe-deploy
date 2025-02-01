import Image from "next/image";
import { useEffect, useState } from "react";
import { getSearchResult } from "@/feature/fetch/Search";
import { formattedRequestDate } from "@/feature/DateFormat";
import { useCalendar } from "@/feature/CalendarContext";
import starFull from "@/assets/starFull.png";
import starEmpty from "@/assets/starEmpty.png";
import { useRouter } from "next/navigation";

const ProductCard = ({ hotel }) => {
  const router = useRouter();
  const { checkInDate, checkOutDate, adultNumber } = useCalendar();
  const [searchResultData, setSearchResultData] = useState([]);

  // 필터 적용 없이 검색 결과 가져오기
  const fetchData = async (hotelName) => {
    console.log("숙소리스트 가져오기");
    try {
      if (hotelName) {
        const data = await getSearchResult(
          hotelName, // 호텔 이름
          adultNumber, // 성인 수
          formattedRequestDate(checkInDate), // 체크인 날짜
          formattedRequestDate(checkOutDate), // 체크아웃 날짜
          {
            accommodationCategory: ["전체"],
            priceRange: [10000, 300000],
            keyword: [],
          } // 필터 없이 기본값 사용
        );
        setSearchResultData(data);
      } else {
        setSearchResultData([]); // 호텔 이름이 없다면 빈 배열로 설정
      }
    } catch (error) {
      console.error("searchResult : ", error);
    }
  };

  useEffect(() => {
    if (hotel) {
      fetchData(hotel); // 호텔 이름이 있을 때 fetchData 호출
    }
  }, [hotel]);

  if (!hotel || searchResultData.length === 0) {
    return null; // 데이터가 없거나 호텔 이름이 없으면 아무 것도 출력하지 않음
  }

  // 별점 계산 함수
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating); // 반올림된 별의 개수
    const fullStars = roundedRating; // 채워진 별의 개수 (반올림 후)
    const emptyStars = 5 - fullStars; // 빈 별의 개수

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={`full-${i}`}
          src={starFull}
          alt="full star"
          width={12}
          height={12}
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={`empty-${i}`}
          src={starEmpty}
          alt="empty star"
          width={12}
          height={12}
        />
      );
    }

    return stars; // 별 이미지 배열을 반환
  };

  // 첫 번째 검색 결과가 호텔 이름이므로 첫 번째 결과의 정보를 카드에 표시
  const hotelInfo = searchResultData[0];

  return (
    <button
      className="flex h-[133px] rounded-[10px] p-[11px] shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]"
      onClick={() => router.push(`/accommodation/${hotelInfo.accommodationId}`)}
    >
      <div className="size-[110px]">
        <Image
          src={hotelInfo.thumbnail}
          alt="productList"
          width={110}
          height={110}
          className="size-[110px]"
        />
      </div>
      <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
        <div className="flex items-center">
          <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
            {hotelInfo.accommodationCategory}
          </div>
        </div>
        <div className="mt-[3px] flex font-bold">
          <span className="text-[14px]">{hotelInfo.name}</span>
        </div>
        <div className="mt-px flex items-center">
          <span className="text-[14px]">{hotelInfo.rating}</span>
          <span className="ml-[5px] flex gap-[2px] text-[14px]">
            {renderStars(hotelInfo.rating)}
          </span>
          <span className="ml-[6px] text-[12px] text-[#999999]">
            {`(${hotelInfo.reviewCount.toLocaleString()})`}
          </span>
        </div>
        <div className="mr-[5px] mt-[8px] flex items-center justify-end">
          <span className="text-[16px] font-bold">
            {hotelInfo.price.toLocaleString()}
            {"원"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
