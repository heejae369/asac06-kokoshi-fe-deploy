"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import blackBackIcon from "@/assets/blckBackIcon.png";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import inputClearIcon from "@/assets/inputClearIcon.png";
import { useState } from "react";
import { useCalendar } from "@/feature/CalendarContext";

export default function SearchComponenet({
  calendar,
  adultNumber,
  setOnCalendar,
  text,
  setText,
}) {
  const [searchText, setSearchText] = useState(text || "");

  //   const router = useRouter();

  //   const handleSearch = () => {
  //     if (searchText) {
  //       router.push(
  //         `/seonghwan/search/searchResult/?searchText=${searchText}&calendar=${calendar}&adultNumber=${adultNumber}`
  //       );
  //     }
  //   };

  const handleSearch = () => {
    setText(searchText);
  };

  const handleClear = () => {
    setText("");
    setSearchText("");
  };

  const handleBackIcon = () => {
    router.back();
  };

  return (
    <>
      <div className="h-[82px] relative font-semibold">
        <div className="flex items-center h-[24px] mt-[59px]">
          <button className="ml-[8px] h-[19px]" onClick={handleBackIcon}>
            <Image
              src={blackBackIcon}
              alt="blackBackIcon"
              width={9}
              height={19}
            />
          </button>
          <div className="flex-1 flex justify-center mr-[17px]">
            <span className="text-[16px] tracking-[-0.8px]">검색</span>
          </div>
        </div>
      </div>
      <div className="mt-[12px]">
        <div className="w-[320px] h-[37px] bg-[#F6F6F6] rounded-[18px] flex items-center px-[15px]">
          <button className="w-[17px] h-[18px]" onClick={handleSearch}>
            <Image
              src={searchIcon}
              alt="search"
              className="ml-[1px] w-[18px] h-[18px]"
            />
          </button>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[250px] h-full bg-transparent border-none outline-none text-[13px] ml-[7px] tracking-[-0.8px] font-medium"
            placeholder="어떤 숙소를 찾으시나요?"
          />
          {searchText && (
            <button onClick={handleClear}>
              <Image
                src={inputClearIcon}
                alt="inputClear"
                className="w-[15px] h-[12px]"
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex pt-[6px] gap-[7px]">
        <button
          className="w-[200px] h-[37px] bg-[#F6F6F6] rounded-[18px] flex items-center"
          onClick={() => setOnCalendar(true)}
        >
          <Image src={calendarIcon} alt="calendar" className="ml-[17px]" />
          <span className="h-[20px] ml-[8px] text-[13px] tracking-[-0.45px] font-medium">
            {calendar}
          </span>
        </button>
        <button
          className="w-[114px] h-[37px] bg-[#F6F6F6] rounded-[18px] flex items-center"
          onClick={() => setOnCalendar(true)}
        >
          <Image src={personnelIcon} alt="personnel" className="ml-[15px]" />
          <span className="h-[20px] ml-[8px] text-[13px] tracking-[-0.45px] font-medium">
            {`성인 ${adultNumber}명`}
          </span>
        </button>
      </div>
    </>
  );
}
