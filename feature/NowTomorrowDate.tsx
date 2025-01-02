export default function NowTomorrowDate() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  // 오늘 날짜
  const now = new Date();
  const todayMonth = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const todayDate = now.getDate();
  const dayOfWeek = week[now.getDay()]; // 요일은 `getDay()`로 가져옵니다

  // 내일 날짜 계산
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1); // 내일 날짜로 설정
  const tomorrowMonth = tomorrow.getMonth() + 1;
  const tomorrowDate = tomorrow.getDate();
  const tomorrowDayOfWeek = week[tomorrow.getDay()];

  // 오늘과 내일의 날짜 및 요일을 포맷하여 반환
  const todayFormatted = `${todayMonth}.${todayDate} ${dayOfWeek}`;
  const tomorrowFormatted = `${tomorrowMonth}.${tomorrowDate} ${tomorrowDayOfWeek}`;

  return `${todayFormatted} - ${tomorrowFormatted}`;
}
