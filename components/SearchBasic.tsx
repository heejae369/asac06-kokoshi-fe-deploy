import upIcon from "@/assets/popularUpIcon.png";
import downIcon from "@/assets/popularDownIcon.png";
import dashIcon from "@/assets/popularDashIcon.png";

import Image from "next/image";

export default function SearchBasic() {
  const recentSearches = [
    "양양 숙소ekkkkkkkkkkkkkk",
    "고성 숙소다다다다다다다다다다다다",
    "강원도",
    "속초",
    "양양 숙소",
    "고성 숙소",
    "강원도",
    "dddd",
    "dcdfsdfds",
    "dsfadsf",
    "sdsdwww",
  ];

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

  const popularSearches = [
    { rank: 1, text: "여름 특가", icon: upIcon },
    { rank: 2, text: "부산 호텔", icon: downIcon },
    { rank: 3, text: "호캉스", icon: dashIcon },
    { rank: 4, text: "풀빌라", icon: upIcon },
  ];

  return (
    <>
      <div className="mt-[19px] flex font-bold tracking-[-0.45px]">
        <span className="text-[16px] ml-[3px]">최근 검색어</span>
        <button className="ml-auto text-[12px] text-[#8728FF] cursor-pointer">
          전체 삭제
        </button>
      </div>
      <SearchText searchMap={recentSearches} />
      <SearchTitle searchTitle={"추천 검색어"} />
      <SearchText searchMap={recommendedSearches} />
      <SearchTitle searchTitle={"인기 검색어"} />
      {popularSearches.map((item) => (
        <div
          key={item.rank}
          className="ml-[10px] mt-[15px] flex flex-wrap items-center"
        >
          <div className="flex items-center flex-grow">
            <span className="text-[14px] text-[#8728FF]">{item.rank}</span>
            <span className="ml-[14px] text-[14px] tracking-[-0.5px] font-medium">
              {item.text}
            </span>
            <div className="ml-auto w-[21px] h-[22px] flex items-center justify-center">
              <Image src={item.icon} width={10} alt="upIcon" />
            </div>
          </div>
          <div className="w-full">
            <hr className="mt-[14px] mx-[10px] block" />
          </div>
        </div>
      ))}
    </>
  );
}

const SearchText = ({ searchMap }) => (
  <div className="mt-[12px] text-[13px] font-medium tracking-[-0.45px] flex gap-x-[10px] gap-y-[7px] flex-wrap overflow-clip max-h-[81px]">
    {searchMap.map((search, index) => (
      <button
        key={index}
        className="h-[37px] rounded-[18px] bg-[#F6F6F6] px-[13px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[155px]"
      >
        {search}
      </button>
    ))}
  </div>
);

const SearchTitle = ({ searchTitle }) => (
  <div className="mt-[28px] font-bold tracking-[-0.45px]">
    <span className="text-[16px] ml-[3px]">{searchTitle}</span>
  </div>
);
