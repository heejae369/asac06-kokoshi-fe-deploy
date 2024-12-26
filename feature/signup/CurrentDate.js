export default function CurrentDate() {
  // 현재 날짜와 시간을 Date 객체로 생성
  const currentDate = new Date();

  // 연도, 월, 일, 시간, 분, 초 등을 추출
  const year = currentDate.getFullYear(); // 연도 (4자리)
  const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = currentDate.getDate(); // 일
  const hours = currentDate.getHours(); // 시간 (24시간제)
  const minutes = currentDate.getMinutes(); // 분
  const seconds = currentDate.getSeconds(); // 초

  // 출력 포맷: "YYYY-MM-DD HH:mm:ss"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedDate;
}
