"use client";

import grayDownIcon from "@/assets/grayDownIcon.png";
import filterIcon from "@/assets/filterIcon.png";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import hotel1 from "@/components/mock/seonghwan/hotel1.png";
import starFull from "@/assets/starFull.png";
import starEmpty from "@/assets/starEmpty.png";
import modalCss from "@/styles/modal.module.css";
import barImage from "@/assets/barImage.png";
import checkImage from "@/assets/checkImage.png";
import getSearchResult from "@/feature/fetch/SearchResult";
import { formattedRequestDate } from "@/feature/DateFormat";
import { dataArray } from "@/feature/DataArray";
import { useRouter } from "next/navigation";

export default function SearchResult({
  // searchText,
  // adultNumber,
  // kidNumber,
  setOnFilter,
  searchResultData,
  // setSearchResultData,
  array,
  setArray,
}) {
  const [modal, setModal] = useState(false);
  const [selectedArray, setSelectedArray] = useState(array);
  const modalBackground = useRef();

  const router = useRouter();

  const handlePageRouter = () => {
    router.push("/accommodation/1");
  };

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setArray(selectedArray == "" ? "코코시 추천순" : selectedArray);
    setModal(false);
  };

  const handleSelectedArray = (array) => {
    setSelectedArray(array);
  };

  const handleFilterOpen = () => {
    setOnFilter(true);
  };

  return (
    <>
      <div className="mt-[19px] flex font-bold tracking-[-0.45px]">
        <span className="ml-[3px] text-[16px]">검색 결과</span>
        <button
          className="ml-auto flex cursor-pointer items-center text-[14px] text-[#999999]"
          onClick={handleFilterOpen}
        >
          <Image
            src={filterIcon}
            alt="filter"
            className="mr-[7px] h-[11px] w-[14px]"
          />
          필터
        </button>
      </div>
      <div className="mb-[9px] mt-[7px]">
        <button
          className="flex items-center text-[14px] tracking-[-0.45px] text-[#999999]"
          onClick={modalOpen}
        >
          {array}
          <Image
            src={grayDownIcon}
            alt="searchArray"
            className="ml-[6px] w-[10px]"
          />
        </button>
      </div>
      <div className="flex flex-col gap-[15px]">
        {searchResultData.map((item, index) => (
          <SearchProductList
            key={index}
            dummy={item}
            handlePageRouter={handlePageRouter}
          />
        ))}
      </div>
      {modal && (
        <div
          className={modalCss["modal-container"]}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              modalClose();
            }
          }}
        >
          <div className={modalCss["modal-content2"]}>
            <div className="flex w-[294px] flex-col gap-[21px] text-[14px] font-semibold tracking-tighter">
              <div className="mt-[18px] flex justify-center">
                <Image src={barImage} width={77} height={3} alt="" />
              </div>
              <div className="mb-[5px] mt-[10px] text-[16px] font-bold">
                정렬
              </div>
              {[
                "코코시 추천순",
                "리뷰 많은 순",
                "평점 높은 순",
                "거리순",
                "낮은 가격 순",
                "높은 가격 순",
              ].map((array) => (
                <button
                  key={array}
                  className="flex items-center justify-between"
                  onClick={() => handleSelectedArray(array)}
                >
                  <span
                    className={`${selectedArray === array && "text-[#8728ff]"}`}
                  >
                    {array}
                  </span>
                  {selectedArray === array && (
                    <Image
                      src={checkImage}
                      alt="Checked"
                      width={17}
                      height={17}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const SearchProductList = ({ dummy, handlePageRouter }) => {
  if (!dummy) {
    return null; // 데이터가 없으면 아무것도 렌더링하지 않음
  }

  // 별점 계산 함수
  const renderStars = (rating: number) => {
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
      ); // 채워진 별
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
      ); // 빈 별
    }

    return stars; // 별 이미지 배열을 반환
  };

  return (
    <>
      <div className="flex h-[133px] rounded-[10px] p-[11px] shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)]">
        <div className="size-[110px]">
          <Image
            src={dummy.image}
            // src={"/hotel1.png"}
            alt="productList"
            width={110}
            height={110}
            className="size-[110px]"
            onClick={() => handlePageRouter()}
          />
        </div>
        <div className="ml-[10px] flex grow flex-col tracking-[-0.5px]">
          <div className="flex items-center">
            <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
              {dummy.accommodationCategory}
            </div>
          </div>
          <div className="mt-[3px] flex font-bold">
            <span className="text-[14px]">{dummy.name}</span>
          </div>
          <div className="mt-px flex items-center">
            <span className="text-[14px] ">{dummy.rating}</span>
            <span className="ml-[5px] flex gap-[2px] text-[14px]">
              {renderStars(dummy.rating)}
            </span>
            <span className="ml-[6px] text-[12px] text-[#999999]">
              {`(${dummy.reviewCount.toLocaleString()})`}
            </span>
          </div>
          <div className="mt-[2px] flex items-center">
            <span className="text-[10px] text-[#7F7F7F]">
              공덕역 3분
              {/* {dummy.distance} */}
            </span>
          </div>
          <div className="mr-[5px] mt-[8px] flex items-center justify-end">
            <span className="text-[16px] font-bold">
              {dummy.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
