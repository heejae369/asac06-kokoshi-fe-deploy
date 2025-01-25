import { start } from "repl";

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

// year, month, dat, datofweek
export const formattedYearToDay = (start, end) => {
  const formatWithLeadingZero = (value) => value.toString().padStart(2, "0");

  // 년.월.일 (요일) ~ 년.월.일 (요일)
  return `${start.year}.${formatWithLeadingZero(start.month)}.${formatWithLeadingZero(start.day)} (${start.dayOfWeek}) 
  ~ ${end.year}.${formatWithLeadingZero(end.month)}.${formatWithLeadingZero(end.day)} (${end.dayOfWeek})`;
};

export const formattedYearToDayNotDayOfWeek = (start, end) => {
  const formatWithLeadingZero = (value) => value.toString().padStart(2, "0");

  // 요일이 없으면 자동으로 채우기
  start.dayOfWeek =
    start.dayOfWeek || getDayOfWeek(start.year, start.month, start.day);
  end.dayOfWeek = end.dayOfWeek || getDayOfWeek(end.year, end.month, end.day);

  // 년.월.일 (요일) ~ 년.월.일 (요일)
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

  // 년-월-일
  return `${year}-${month}-${day}`;
};

// 시간 생성 함수
export const dayUseTimeFormat = (
  start: string,
  end: string,
  interval: number
) => {
  console.log("start : ", start);
  console.log("end : ", end);
  const startDate = new Date(`2025-01-10T${start}:00`); // 시작 시간
  const endDate = new Date(`2025-01-10T${end}:00`); // 종료 시간
  const times: string[] = [];

  let currentTime = startDate;
  while (currentTime <= endDate) {
    times.push(currentTime.toTimeString().slice(0, 5)); // "HH:mm" 추출
    currentTime = new Date(currentTime.getTime() + interval * 60000); // 간격 추가
  }

  console.log("times : ", times);
  return times;
};

export const calculateTimeDifference = (start: string, end: string) => {
  const startDate = new Date(`2025-01-10T${start}:00`); // 시작 시간
  const endDate = new Date(`2025-01-10T${end}:00`); // 종료 시간

  const difSeconds = endDate.getTime() - startDate.getTime(); // 시간 차이 (밀리초 단위)

  // 밀리초 차이를 시간과 분으로 변환
  const hours = Math.floor(difSeconds / (1000 * 60 * 60)); // 시간
  const minutes = Math.floor((difSeconds % (1000 * 60 * 60)) / (1000 * 60)); // 분

  // 사용 예시
  // const { hours, minutes } = calculateTimeDifference("14:30", "19:00");
  // console.log(`차이: ${hours}시간 ${minutes}분`);

  return { hours, minutes };
};

export const calculateDaysDifference = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate); // 첫 번째 날짜
  const end = new Date(endDate); // 두 번째 날짜

  const timeDiff = end.getTime() - start.getTime(); // 두 날짜의 차이 (밀리초)
  const dayDiff = timeDiff / (1000 * 3600 * 24); // 밀리초를 일(day) 단위로 변환

  return Math.abs(dayDiff); // 절댓값을 반환 (차이가 음수일 경우 대비)
};

export const formmattedYearToDayOfWeek = (date) => {
  const year = date.year;
  const month = String(date.month).padStart(2, "0"); // 월이 1자리일 경우 0을 추가
  const day = String(date.day).padStart(2, "0"); // 일이 1자리일 경우 0을 추가
  const dayOfWeek = date.dayOfWeek;

  // 년.월.일(요일)
  return `${year}.${month}.${day}(${dayOfWeek})`;
};

// 요일 계산 함수
const getDayOfWeek = (year, month, day) => {
  const date = new Date(year, month - 1, day); // month는 0부터 시작
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return dayNames[date.getDay()];
};

export const formattedGetDate = (date) => {
  return `${date.year}.${date.month}.${date.day}(${date.dayOfWeek})`;
};

export const getDiffDays = (startDate, endDate) => {
  const start = new Date(formattedRequestDate(startDate));
  const end = new Date(formattedRequestDate(endDate));
  const diffTime = end.getTime() - start.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
};

export const getDayOfWeekForString = (dateString: string): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  return days[date.getDay()];
};
