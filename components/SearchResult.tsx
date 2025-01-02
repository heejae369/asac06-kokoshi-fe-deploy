"use client";

import grayDownIcon from "@/assets/grayDownIcon.png";
import filterIcon from "@/assets/filterIcon.png";
import Image from "next/image";
import { useState, useRef } from "react";
import hotel1 from "@/components/mock/seonghwan/hotel1.png";
import starFull from "@/assets/starFull.png";
import starEmpty from "@/assets/starEmpty.png";
import modalCss from "@/styles/modal.module.css";
import barImage from "@/assets/barImage.png";
import checkImage from "@/assets/checkImage.png";

export default function SearchResult({
  calendar,
  adultNumber,
  kidNumber,
  setOnFilter,
}) {
  const [modal, setModal] = useState(false);
  const [array, setArray] = useState("코코시 추천순");
  const [selectedArray, setSelectedArray] = useState(array);
  const modalBackground = useRef();

  const [dummyData, setDummyData] = useState([
    {
      image: hotel1,
      tag: "호텔",
      title: "김포 마리나베이 호텔",
      star: 4.5,
      reviewCount: 1136,
      distance: "김포공항역 3분",
      price: 75000,
    },
    {
      image: hotel1, // 다른 이미지로 변경 가능
      tag: "호텔",
      title: "서울 강남 파크호텔",
      star: 3.8,
      reviewCount: 874,
      distance: "강남역 5분",
      price: 95000,
    },
    {
      image: hotel1, // 다른 이미지로 변경 가능
      tag: "리조트",
      title: "제주 해변 리조트",
      star: 4.2,
      reviewCount: 1352,
      distance: "제주 공항 10분",
      price: 120000,
    },
    {
      image: hotel1, // 다른 이미지로 변경 가능
      tag: "호텔",
      title: "부산 해운대 호텔",
      star: 4.0,
      reviewCount: 562,
      distance: "해운대역 7분",
      price: 85000,
    },
    {
      image: hotel1, // 다른 이미지로 변경 가능
      tag: "호텔",
      title: "대전 엑스포 호텔",
      star: 4.7,
      reviewCount: 998,
      distance: "대전역 4분",
      price: 65000,
    },
  ]);

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setArray(selectedArray == "" ? "코코시 추천순" : selectedArray);
    setModal(false);

    const sortedData = [...dummyData]; // 데이터 복사
    if (array === "리뷰 많은 순") {
      sortedData.sort((a, b) => b.reviewCount - a.reviewCount); // 리뷰 개수 기준 내림차순 정렬
    } else if (array === "평점 높은 순") {
      sortedData.sort((a, b) => b.star - a.star); // 평점 기준 내림차순 정렬
    } else if (array === "낮은 가격 순") {
      sortedData.sort((a, b) => b.price - a.price); // 가격 기준 내림차순 정렬
    } else if (array === "높은 가격 순") {
      sortedData.sort((a, b) => a.price - b.price); // 가격 기준 오름차순 정렬
    }

    setDummyData(sortedData); // 정렬된 데이터로 상태 업데이트
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
        <span className="text-[16px] ml-[3px]">검색 결과</span>
        <button
          className="ml-auto text-[14px] text-[#999999] cursor-pointer flex items-center"
          onClick={handleFilterOpen}
        >
          <Image
            src={filterIcon}
            alt="filter"
            className="w-[14px] h-[11px] mr-[7px]"
          />
          필터
        </button>
      </div>
      <div className="mt-[7px] mb-[9px]">
        <button
          className="flex items-center text-[#999999] text-[14px] tracking-[-0.45px]"
          onClick={modalOpen}
        >
          {array}
          <Image
            src={grayDownIcon}
            alt="searchArray"
            className="w-[10px] ml-[6px]"
          />
        </button>
      </div>
      <div className="flex flex-col gap-[15px]">
        {dummyData.map((item, index) => (
          <SearchProductList key={index} dummy={item} />
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

const SearchProductList = ({ dummy }) => {
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
      <div className="h-[133px] p-[11px] flex shadow-[0px_4px_11px_4px_rgba(121,121,121,0.1)] rounded-[10px]">
        <div className="w-[110px] h-[110px]">
          <Image
            src={dummy.image}
            alt="productList"
            width={110}
            height={110}
            className="w-[110px] h-[110px]"
          />
        </div>
        <div className="ml-[10px] flex flex-col flex-grow tracking-[-0.5px]">
          <div className="flex items-center">
            <div className="border border-[#8728FF] rounded-[9px] text-[10px] text-[#8728FF] px-[9px] py-[2px] h-[18px]">
              {dummy.tag}
            </div>
          </div>
          <div className="flex itmes-center mt-[3px] font-bold">
            <span className="text-[14px]">{dummy.title}</span>
          </div>
          <div className="flex items-center mt-[1px]">
            <span className="text-[14px] ">{dummy.star}</span>
            <span className="text-[14px] flex ml-[5px] gap-[2px]">
              {renderStars(dummy.star)}
            </span>
            <span className="text-[12px] ml-[6px] text-[#999999]">
              {`(${dummy.reviewCount.toLocaleString()})`}
            </span>
          </div>
          <div className="mt-[2px] flex items-center">
            <span className="text-[10px] text-[#7F7F7F]">{dummy.distance}</span>
          </div>
          <div className="mt-[8px] mr-[5px] flex items-center justify-end">
            <span className="text-[16px] font-bold">
              {dummy.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
