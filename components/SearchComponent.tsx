"use client";
import Image from "next/image";
import blackBackIcon from "@/assets/blckBackIcon.png";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import inputClearIcon from "@/assets/inputClearIcon.png";
import { formattedMonthToDay } from "@/feature/DateFormat";
import { useState } from "react";
import { useCalendar } from "@/feature/CalendarContext";

export default function SearchComponenet({
  setOnCalendar,
  searchText,
  setSearchText,
  fetchData,
}) {
  const [text, setText] = useState(searchText || "");

  const { checkInDate, checkOutDate, adultNumber } = useCalendar();

  const handleClear = () => {
    setSearchText("");
    setText("");
  };

  const handleBackIcon = () => {
    router.back();
  };

  return (
    <>
      <div className="relative h-[82px] font-semibold">
        <div className="mt-[59px] flex h-[24px] items-center">
          <button className="ml-[8px] h-[19px]" onClick={handleBackIcon}>
            <Image
              src={blackBackIcon}
              alt="blackBackIcon"
              width={9}
              height={19}
            />
          </button>
          <div className="mr-[17px] flex flex-1 justify-center">
            <span className="text-[16px] tracking-[-0.8px]">검색</span>
          </div>
        </div>
      </div>
      <div className="mt-[12px]">
        <div className="flex h-[37px] w-[320px] items-center rounded-[18px] bg-[#F6F6F6] px-[15px]">
          <button className="h-[18px] w-[17px]" onClick={() => fetchData(text)}>
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
      <div className="flex gap-[7px] pt-[6px]">
        <button
          className="flex h-[37px] w-[200px] items-center rounded-[18px] bg-[#F6F6F6]"
          onClick={() => setOnCalendar(true)}
        >
          <Image src={calendarIcon} alt="calendar" className="ml-[17px]" />
          <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
            {formattedMonthToDay(checkInDate, checkOutDate)}
            {/* {`${calendar.reservationStart} - ${calendar.reservationEnd}`} */}
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
}
