export default function NowTomorrowDate() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  // 오늘 날짜
  const now = new Date();

  // 내일 날짜 계산
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const calendar = {
    checkInDate: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      dayOfWeek: week[now.getDay()],
    },
    checkOutDate: {
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate(),
      dayOfWeek: week[tomorrow.getDay()],
    },
  };

  return calendar;
}

export const formattedYearToDay = (start, end) => {
  const formatWithLeadingZero = (value) => value.toString().padStart(2, "0");

  return `${start.year}.${formatWithLeadingZero(start.month)}.${formatWithLeadingZero(start.day)} (${start.dayOfWeek}) 
  ~ ${end.year}.${formatWithLeadingZero(end.month)}.${formatWithLeadingZero(end.day)} (${end.dayOfWeek})`;
};

export const formattedMonthToDay = (start, end) => {
  return `${start.month}.${start.day} ${start.dayOfWeek} - ${end.month}.${end.day} ${end.dayOfWeek}`;
};

// 요일을 포함한 날짜 포맷 함수
export const formattedDate = (date) => {
  const year = date.getFullYear(); // 년도 추출
  const month = date.getMonth() + 1; // 월 추출
  const dayOfWeek = date.toLocaleString("ko-KR", { weekday: "short" });
  const day = date.getDate();

  return { year, month, day, dayOfWeek };
};

export const formattedRequestDate = (date) => {
  const year = date.year;
  const month = String(date.month).padStart(2, "0"); // 월이 1자리일 경우 0을 추가
  const day = String(date.day).padStart(2, "0"); // 일이 1자리일 경우 0을 추가

  return `${year}-${month}-${day}`;
};
