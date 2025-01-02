"use client";

import Image from "next/image";
import { useState } from "react";
import xIcon from "@/assets/xIcon.png";
import CustomCheckbox from "@/feature/CustomCheckBox";
import FilterPriceSlide from "@/feature/FilterPriceSlide";

export default function SearchFilter({ setOnFilter }) {
  const [slideRange, setSlideRange] = useState([10000, 300000]);

  const filterList = [
    "전체",
    "호텔",
    "펜션",
    "풀빌라",
    "캠핑",
    "게스트하우스",
    "리조트",
  ];

  const keyword = [
    "여름 특가",
    "수영장",
    "조식",
    "야외 수영장",
    "주차 가능",
    "바다 전망",
    "PC룸",
  ];

  const [checkedItems, setCheckedItems] = useState({
    전체: true,
    호텔: false,
    펜션: false,
    풀빌라: false,
    캠핑: false,
    게스트하우스: false,
    리조트: false,
  });

  const handleXIcon = () => {
    setOnFilter(false);
  };

  const handleChecked = (filter) => {
    if (filter === "전체" && !checkedItems["전체"]) {
      const newState = {
        전체: !checkedItems["전체"],
        호텔: checkedItems["전체"],
        펜션: checkedItems["전체"],
        풀빌라: checkedItems["전체"],
        캠핑: checkedItems["전체"],
        게스트하우스: checkedItems["전체"],
        리조트: checkedItems["전체"],
      };
      setCheckedItems(newState);
    } else {
      const newState = {
        ...checkedItems,
        [filter]: !checkedItems[filter],
      };

      if (Object.values(newState).every((value) => !value)) {
        newState["전체"] = false;
      }

      setCheckedItems(newState);
    }
  };

  const handleDisabledChecked = (filter) => {
    if (checkedItems["전체"]) {
      return filter !== "전체";
    }
    return false;
  };

  return (
    <>
      <div className="h-[82px] relative font-semibold">
        <div className="flex items-center h-[24px] mt-[59px]">
          <button className="ml-[8px] h-[19px]" onClick={handleXIcon}>
            <Image src={xIcon} alt="xIcon" width={9} height={19} />
          </button>
          <div className="flex-1 flex justify-center ml-[22px]">
            <span className="text-[16px] tracking-[-0.8px]">필터</span>
          </div>
          <div>
            <button className="text-[14px] tracking-[-1px] text-[#8728FF]">
              초기화
            </button>
          </div>
        </div>
      </div>
      <FilterTitle title={"숙소 유형"} />
      <div className="w-[290px] mt-[20px] ml-[1px] grid grid-cols-2 gap-y-[25px] tracking-[-1px] text-[14px]">
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleChecked(filter)}
            className="flex items-center"
            disabled={handleDisabledChecked(filter)}
          >
            <CustomCheckbox
              className={"size-[18px]"}
              size="18px"
              checked={checkedItems[filter]}
            />
            <span className="ml-[6px]">{filter}</span>
          </button>
        ))}
      </div>
      <FilterTitle title={"키워드"} />
      <div className="mt-[19px] flex gap-[10px] flex-wrap text-[14px] tracking-[-0.4px]">
        {keyword.map((keyword) => (
          <KeywordButton key={keyword} text={keyword} />
        ))}
      </div>
      <FilterTitle title={"가격대"} />
      <div className="flex justify-center mt-[20px]">
        <FilterPriceSlide
          slideRange={slideRange}
          setSlideRange={setSlideRange}
        />
      </div>
      <div className="flex justify-between text-[14px] tracking-[-0.4px] mt-[12px] px-[11px]">
        <span>{slideRange[0] / 10000}만원</span>
        <span>{slideRange[1] / 10000}만원</span>
      </div>
      <button className="fixed bottom-0 bg-[#8728FF] rounded-[7px] text-[16px] h-[48px] w-[320px] mb-[16px] text-white tracking-[-0.5px]">
        필터 적용하기
      </button>
    </>
  );
}

// 키워드 버튼 컴포넌트
const KeywordButton = ({ text }) => {
  return (
    <button className="border border-[#CCCCCC] rounded-[21px] py-[9px] px-[10.5px]">
      <span>{text}</span>
    </button>
  );
};

// 부제목 컴포넌트
const FilterTitle = ({ title }) => {
  return (
    <div className="mt-[28px]">
      <span className="text-[16px] font-bold tracking-[-1px]">{title}</span>
    </div>
  );
};
