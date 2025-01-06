"use client";

import Calendar from "react-calendar";
import "@/styles/CustomCalnder.css";
import React, { useState } from "react";

export default function CalendarPage({ onDateSelect }) {
  // 날짜에 "일" 삭제 포맷
  const formatCalendarDay = (locale, date) => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

  return (
    <div>
      <Calendar
        onChange={onDateSelect}
        // value={date}
        locale="ko" // 한국어 설정
        calendarType="hebrew" // 일요일부터 시작
        formatDay={formatCalendarDay} // 일 삭제 포맷
        selectRange={true} // 기간 선택 가능
        minDate={new Date()} // 최소 선택 날짜
      />
    </div>
  );
}
