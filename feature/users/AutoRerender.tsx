export default function AutoRerender({ timerRef, setRerender }) {
  const handleInputChange = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // 기존 타이머 클리어
    }
    setTimeout(() => {
      setRerender(true); // 리렌더링 상태를 변경
    }, 2000);
  };
  handleInputChange();
}
