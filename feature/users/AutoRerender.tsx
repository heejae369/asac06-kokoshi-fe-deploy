export default function AutoRerender({ setRerender }) {
  const timer = 0;
  const handleInputChange = () => {
    if (timer) {
      clearTimeout(timer); // 기존 타이머 클리어
    }
    setTimeout(() => {
      console.log("2초 동안 입력이 없었습니다");
      setRerender(true); // 리렌더링 상태를 변경
    }, 2000);
  };
  handleInputChange();
}
