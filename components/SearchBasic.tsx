// import upIcon from "@/assets/popularUpIcon.png";
// import downIcon from "@/assets/popularDownIcon.png";
// import dashIcon from "@/assets/popularDashIcon.png";

import Image from "next/image";
import {
  clearRecentSearches,
  getRecentSearches,
} from "@/feature/RecentSearchLocalStorage";
import { useEffect, useState } from "react";
import { getTopKeywords } from "@/feature/fetch/Search";

export default function SearchBasic({ setSearchText, handleSearch }) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);

  useEffect(() => {
    const searches = getRecentSearches();
    setRecentSearches(searches);
  }, []);

  useEffect(() => {
    const fetchTopKeywords = async () => {
      setTopKeywords(await getTopKeywords());
    };

    fetchTopKeywords();
  }, []);

  const recommendedSearches = [
    "양양 숙소",
    "고성 숙소",
    "강원도",
    "속초",
    "양양 숙소",
    "고성 숙소",
    "강원도",
    "서울",
    "인천",
  ];

  const handleDeleteAll = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleSearchText = (text) => {
    setSearchText(text);
    handleSearch(text);
  };

  return (
    <>
      <div className="mt-[19px] flex font-bold tracking-[-0.45px]">
        <span className="ml-[3px] text-[16px]">최근 검색어</span>
        <button
          className="ml-auto cursor-pointer text-[12px] text-[#8728FF]"
          onClick={handleDeleteAll}
        >
          전체 삭제
        </button>
      </div>
      <SearchText
        searchMap={recentSearches}
        handleSearchText={handleSearchText}
      />
      <SearchTitle searchTitle={"추천 검색어"} />
      <SearchText
        searchMap={recommendedSearches}
        handleSearchText={handleSearchText}
      />
      <SearchTitle searchTitle={"인기 검색어"} />
      <TopKeyword
        topKeywords={topKeywords}
        handleSearchText={handleSearchText}
      />
    </>
  );
}

const SearchText = ({ searchMap, handleSearchText }) => (
  <div className="mt-[12px] flex max-h-[81px] flex-wrap gap-x-[10px] gap-y-[7px] overflow-clip text-[13px] font-medium tracking-[-0.45px]">
    {searchMap.map((search, index) => (
      <button
        key={index}
        className="h-[37px] max-w-[155px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[18px] bg-[#F6F6F6] px-[13px]"
        onClick={() => handleSearchText(search)}
      >
        {search}
      </button>
    ))}
  </div>
);

const SearchTitle = ({ searchTitle }) => (
  <div className="mt-[28px] font-bold tracking-[-0.45px]">
    <span className="ml-[3px] text-[16px]">{searchTitle}</span>
  </div>
);

const TopKeyword = ({ topKeywords, handleSearchText }) => (
  <>
    {topKeywords.map((item, index) => (
      <div
        key={item.keyword}
        className="ml-[10px] mt-[15px] flex flex-wrap items-center"
      >
        <div className="flex grow items-center">
          <button onClick={() => handleSearchText(item.keyword)}>
            <span className="text-[14px] text-[#8728FF]">{index + 1}</span>
            <span className="ml-[14px] text-[14px] font-medium tracking-[-0.5px]">
              {item.keyword}
            </span>
          </button>
          <div className="ml-auto flex h-[22px] w-[21px] items-center justify-center">
            <Image src={item.trend} width={10} height={10} alt="upIcon" />
          </div>
        </div>
        <div className="w-full">
          <hr className="mx-[10px] mt-[14px] block" />
        </div>
      </div>
    ))}
  </>
);
