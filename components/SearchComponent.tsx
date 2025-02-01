"use client";
import Image from "next/image";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import inputClearIcon from "@/assets/inputClearIcon.png";
import { formattedMonthToDay } from "@/feature/DateFormat";
import { useEffect, useState } from "react";
import { useCalendar } from "@/feature/CalendarContext";
import MainHeaders from "./MainHeaders";
import { useRouter } from "next/navigation";

export default function SearchComponenet({
  setOnCalendar,
  searchText,
  setSearchText,
  handleSearch,
}) {
  const [text, setText] = useState(searchText || "");

  const router = useRouter();

  const handleClear = () => {
    setSearchText("");
    setText("");
    const url = window.location.pathname; // 현재 경로를 가져옵니다
    router.replace(url);
  };

  useEffect(() => {
    if (searchText) setText(searchText);
  }, [searchText]);

  return (
    <>
      <MainHeaders title={"내 위치"} backIcon={true} />
      <SearchInput
        handleSearch={handleSearch}
        setText={setText}
        text={text}
        handleClear={handleClear}
      />
      <DateToCalendar setOnCalendar={setOnCalendar} />
    </>
  );
}

const SearchInput = ({ handleSearch, setText, text, handleClear }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(text); // Enter 키가 눌리면 검색 실행
    }
  };

  return (
    <>
      <div className="mt-[12px]">
        <div className="flex h-[37px] w-[320px] items-center rounded-[18px] bg-[#F6F6F6] px-[15px]">
          <button
            className="h-[18px] w-[17px]"
            onClick={() => handleSearch(text)}
          >
            <Image
              src={searchIcon}
              alt="search"
              className="ml-px size-[18px]"
            />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-[7px] h-full w-[250px] border-none bg-transparent text-[13px] font-medium tracking-[-0.8px] outline-none"
            placeholder="어떤 숙소를 찾으시나요?"
          />
          {text && (
            <button onClick={handleClear}>
              <Image
                src={inputClearIcon}
                alt="inputClear"
                className="h-[12px] w-[15px]"
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const DateToCalendar = ({ setOnCalendar }) => {
  const { checkInDate, checkOutDate, adultNumber } = useCalendar();

  return (
    <>
      <div className="flex gap-[7px] pt-[6px]">
        <button
          className="flex h-[37px] w-[200px] items-center rounded-[18px] bg-[#F6F6F6]"
          onClick={() => setOnCalendar(true)}
        >
          <Image src={calendarIcon} alt="calendar" className="ml-[17px]" />
          <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
            {formattedMonthToDay(checkInDate, checkOutDate)}
          </span>
        </button>
        <button
          className="flex h-[37px] w-[114px] items-center rounded-[18px] bg-[#F6F6F6]"
          onClick={() => setOnCalendar(true)}
        >
          <Image src={personnelIcon} alt="personnel" className="ml-[15px]" />
          <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
            {`성인 ${adultNumber}명`}
          </span>
        </button>
      </div>
    </>
  );
};
