export function formatTimer(time) {
  const minutes = Math.floor(time / 60); // 분 계산
  const seconds = time % 60; // 초 계산
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; // 'mm:ss' 형태로 반환
}

export function formatHyphenToDot(text) {
  return text.replace(/-/g, ".");
}
