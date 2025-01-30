"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import xIcon from "@/assets/xIcon.png";
import CustomCheckbox from "@/feature/CustomCheckBox";
import FilterPriceSlide from "@/feature/FilterPriceSlide";

export default function SearchFilter({
  setOnFilter,
  setFilterApply,
  filterApply,
}) {
  const [slideRange, setSlideRange] = useState(filterApply.priceRange);
  const [checkedKeywords, setCheckedKeywords] = useState(filterApply.keyword);
  const [onFilterReset, setOnFilterReset] = useState(false);

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
    "호텔",
    "수영장",
    "조식",
    "게스트하우스",
    "주차 가능",
    "바다 전망",
    "해변",
  ];

  const [checkedItems, setCheckedItems] = useState({
    전체: filterApply.accommodationCategory.includes("전체"),
    호텔: filterApply.accommodationCategory.includes("호텔"),
    펜션: filterApply.accommodationCategory.includes("펜션"),
    풀빌라: filterApply.accommodationCategory.includes("풀빌라"),
    캠핑: filterApply.accommodationCategory.includes("캠핑"),
    게스트하우스: filterApply.accommodationCategory.includes("게스트하우스"),
    리조트: filterApply.accommodationCategory.includes("리조트"),
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
      console.log(newState);
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

  // 필터 적용 시 체크된 항목들만 부모에게 전달
  const handleApplyFilter = async () => {
    const selectedCategories = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    // const selectedCategories = Object.keys(checkedItems).filter(
    //   (key) => checkedItems[key] && key !== "전체"
    // );
    setFilterApply({
      accommodationCategory: selectedCategories,
      priceRange: slideRange,
      keyword: checkedKeywords,
    });

    setOnFilter(false);
  };

  const checkKeyword = (keyword) => {
    setCheckedKeywords(
      (prev) =>
        prev.includes(keyword)
          ? prev.filter((item) => item !== keyword) // 이미 선택된 키워드면 제거
          : [...prev, keyword] // 새로 선택된 키워드는 추가
    );
  };

  const handleReset = () => {
    setSlideRange([10000, 300000]);
    setCheckedKeywords([]);
    setCheckedItems({
      전체: true,
      호텔: false,
      펜션: false,
      풀빌라: false,
      캠핑: false,
      게스트하우스: false,
      리조트: false,
    });
  };

  const filterReset = () => {
    if (
      slideRange[0] === 10000 &&
      slideRange[1] === 300000 &&
      checkedItems["전체"] === true &&
      checkedKeywords.length === 0 &&
      onFilterReset === true
    ) {
      setOnFilterReset(false);
    } else if (onFilterReset === false) setOnFilterReset(true);
  };

  useEffect(() => {
    filterReset();
  }, [slideRange, checkedItems, checkedKeywords]);

  return (
    <>
      <div className="relative h-[82px] font-semibold">
        <div className="mt-[59px] flex h-[24px] items-center">
          <button className="ml-[8px] h-[19px]" onClick={handleXIcon}>
            <Image src={xIcon} alt="xIcon" width={9} height={19} />
          </button>
          <div className="ml-[22px] flex flex-1 justify-center">
            <span className="text-[16px] tracking-[-0.8px]">필터</span>
          </div>
          <div>
            <button
              className={`text-[14px] tracking-[-1px] ${onFilterReset ? "text-[#8728FF]" : "text-[#999999]"}`}
              onClick={handleReset}
              disabled={!onFilterReset}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
      <FilterTitle title={"숙소 유형"} />
      <div className="ml-px mt-[20px] grid w-[290px] grid-cols-2 gap-y-[25px] text-[14px] tracking-[-1px]">
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
              onChange={() => handleChecked(filter)}
            />
            <span className="ml-[6px]">{filter}</span>
          </button>
        ))}
      </div>
      <FilterTitle title={"키워드"} />
      <div className="mt-[19px] flex flex-wrap gap-[10px] text-[14px] tracking-[-0.4px]">
        {keyword.map((keyword) => (
          <KeywordButton
            key={keyword}
            text={keyword}
            isActive={checkedKeywords.includes(keyword)}
            checkKeyword={checkKeyword}
          />
        ))}
      </div>
      <FilterTitle title={"가격대"} />
      <div className="mt-[20px] flex justify-center">
        <FilterPriceSlide
          slideRange={slideRange}
          setSlideRange={setSlideRange}
        />
      </div>
      <div className="mt-[12px] flex justify-between px-[11px] text-[14px] tracking-[-0.4px]">
        <span>{slideRange[0] / 10000}만원</span>
        <span>{slideRange[1] / 10000}만원</span>
      </div>
      <button
        className="mb-[16px] mt-[70px] h-[48px] w-[320px] rounded-[7px] bg-[#8728FF] text-[16px] tracking-[-0.5px] text-white"
        onClick={handleApplyFilter}
      >
        필터 적용하기
      </button>
    </>
  );
}

// 키워드 버튼 컴포넌트
const KeywordButton = ({ text, isActive, checkKeyword }) => {
  return (
    <button
      className={`rounded-[21px] border ${isActive ? "border-[#8728FF]" : "border-[#CCCCCC]"} px-[10.5px] py-[9px]`}
      onClick={() => checkKeyword(text)}
    >
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
