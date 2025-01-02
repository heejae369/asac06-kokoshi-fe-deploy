"use client";

import Calendar from "react-calendar";
import "@/styles/CustomCalnder.css";
import React, { useState } from "react";

export default function CalendarPage({ onDateSelect }) {
  const [date, setDate] = useState();

  // 날짜에 "일" 삭제 포맷
  const formatCalendarDay = (locale, date) => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

  const handleDateChange = (selectedDates) => {
    setDate(selectedDates);

    if (Array.isArray(selectedDates) && selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      const formattedStart = formatDateWithDay(startDate);
      const formattedEnd = formatDateWithDay(endDate);
      onDateSelect(`${formattedStart} - ${formattedEnd}`);
    }
  };

  // 요일을 포함한 날짜 포맷 함수
  const formatDateWithDay = (date) => {
    const dayOfWeek = date.toLocaleString("ko-KR", { weekday: "short" });
    const day = date.getDate();
    return `${date.getMonth() + 1}.${day} ${dayOfWeek}`;
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="ko" // 한국어 설정
        calendarType="hebrew" // 일요일부터 시작
        formatDay={formatCalendarDay} // 일 삭제 포맷
        selectRange={true} // 기간 선택 가능
        minDate={new Date()} // 최소 선택 날짜
      />
    </div>
  );
}
