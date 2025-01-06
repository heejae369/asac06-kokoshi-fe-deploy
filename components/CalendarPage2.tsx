"use client";

import Image from "next/image";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import CalendarPage from "@/components/CalendarPage";
import subIcon from "@/assets/subIcon.png";
import addIcon from "@/assets/addIcon.png";
import xIcon from "@/assets/xIcon.png";

export default function CalendarPage2({
  setOnCalendar,
  calendar,
  setCalendar,
  adultNumber,
  setAdultNumber,
  kidNumber,
  setKidNumber,
}) {
  // 날짜 선택 콜백 함수
  const handleDateSelect = (selectedDate) => {
    setCalendar(selectedDate);
  };

  // Adult Number 변경 함수
  const handleAdultChange = (delta) => {
    setAdultNumber((prev) => (prev + delta > 1 ? prev + delta : 1)); // 1보다 작지 않도록 처리
  };

  // Kid Number 변경 함수
  const handleKidChange = (delta) => {
    setKidNumber((prev) => (prev + delta > 0 ? prev + delta : 0)); // 0보다 작지 않도록 처리
  };

  return (
    <>
      <div className="h-[82px] relative font-semibold">
        <div className="flex items-center h-[24px] mt-[59px]">
          <button
            className="ml-[8px] w-[12px] h-[12px]"
            onClick={() => setOnCalendar(false)}
          >
            <Image src={xIcon} alt="xIcon" width={12} height={12} />
          </button>
          <div className="flex-1 flex justify-center mr-[20px]">
            <span className="text-[16px] tracking-[-0.8px]">날짜 선택</span>
          </div>
        </div>
      </div>
      <div className="flex mt-[12px] gap-[7px]">
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
      <CalendarPage onDateSelect={handleDateSelect} />
      <hr className="mt-[20px] mx-[-20px] w-[360px] border-[3.5px] border-[#E5E5E5]" />
      <div className="mt-[20px]">
        <span className="text-[16px] font-bold">인원</span>
      </div>
      <div className="mt-[20px] flex items-center">
        <span className="text-[14px]">성인</span>
        <div className="flex ml-auto gap-[11px]">
          <button onClick={() => handleAdultChange(-1)}>
            <Image src={subIcon} alt="subIcon" className="w-[18px]" />
          </button>
          <span className="text-[14px]">{adultNumber}</span>
          <button onClick={() => handleAdultChange(1)}>
            <Image src={addIcon} alt="addIcon" className="w-[18px]" />
          </button>
        </div>
      </div>
      <div className="mt-[20px] flex items-center">
        <span className="text-[14px]">아동</span>
        <div className="flex ml-auto gap-[11px]">
          <button onClick={() => handleKidChange(-1)}>
            <Image src={subIcon} alt="subIcon" className="w-[18px]" />
          </button>
          <span className="text-[14px]">{kidNumber}</span>
          <button onClick={() => handleKidChange(1)}>
            <Image src={addIcon} alt="addIcon" className="w-[18px]" />
          </button>
        </div>
      </div>
    </>
  );
}
