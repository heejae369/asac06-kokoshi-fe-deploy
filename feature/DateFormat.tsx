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

// 시간 생성 함수
export const dayUseTimeFormat = (
  start: string,
  end: string,
  interval: number
) => {
  const startDate = new Date(`2025-01-10T${start}:00`); // 시작 시간
  const endDate = new Date(`2025-01-10T${end}:00`); // 종료 시간
  const times: string[] = [];

  let currentTime = startDate;
  while (currentTime <= endDate) {
    times.push(currentTime.toTimeString().slice(0, 5)); // "HH:mm" 추출
    currentTime = new Date(currentTime.getTime() + interval * 60000); // 간격 추가
  }

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
