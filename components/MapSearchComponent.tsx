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

export default function MapSearchComponent({
  setOnCalendar,
  searchText,
  setSearchText,
  // handleSearch,
}) {
  const [text, setText] = useState(searchText || "");

  const { checkInDate, checkOutDate, adultNumber } = useCalendar();

  const handleClear = () => {
    setSearchText("");
    setText("");
  };

  useEffect(() => {
    if (searchText) setText(searchText);
  }, [searchText]);

  return (
    <>
      <MainHeaders title={"지도"} backIcon={true} />
      <SearchInput
        // handleSearch={handleSearch}
        setText={setText}
        text={text}
        handleClear={handleClear}
      />
      <DateToCalendar setOnCalendar={setOnCalendar} />
    </>
  );
}

const SearchInput = ({ setText, text, handleClear }) => {
  return (
    <>
      <div className="mt-[12px] flex items-center justify-center">
        <div className="flex h-[37px] w-[320px] items-center rounded-[18px] bg-[#F6F6F6] px-[15px]">
          <button className="h-[18px] w-[17px]">
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
      <div className="flex gap-[7px] pt-[6px] mb-1 items-center justify-center">
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
