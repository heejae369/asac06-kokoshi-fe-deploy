import { useCalendar } from "@/feature/CalendarContext";
import {
  calculateTimeDifference,
  dayUseTimeFormat,
  formattedRequestDate,
  isToday,
} from "@/feature/DateFormat";
import { useRef, useState, useEffect } from "react";

export const DragSlideTimeButton = ({ roomDetail, onCheckTimeChange }) => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [noticeText, setNoticeText] = useState("");
  const { checkInDate } = useCalendar();

  const maxDuration = roomDetail.dayUseInfo.dayUseTime * 2;

  useEffect(() => {
    if (selectedTimes.length > 0 && selectedTimes.length < 9) {
      const { hours, minutes } = calculateTimeDifference(
        selectedTimes[0],
        selectedTimes[selectedTimes.length - 1]
      );
      setNoticeText(
        `⚠️ ${selectedTimes[0]} 체크인 시 ${hours ? `${hours}시간` : null} ${minutes ? `${minutes}분 이용가능` : "이용가능"}`
      );
    } else if (noticeText) {
      setNoticeText("");
    }
  }, [selectedTimes]);

  const sendCheckTime = (selectedTimes: string[]) => {
    console.log(selectedTimes);
    const selectCheckTime = {
      selectCheckInTime: selectedTimes[0],
      selectCheckOutTime: selectedTimes[selectedTimes.length - 1],
    };
    onCheckTimeChange(selectCheckTime);
  };

  const handleButtonClick = (time: string) => {
    // 선택된 시간 계산
    const clickedTimeIndex = dayUseTimeFormat(
      roomDetail.dayUseInfo.dayUseStartTime,
      roomDetail.dayUseInfo.dayUseEndTime,
      60
    ).indexOf(time);

    // 대실 최대 시간을 기준으로 뒤의 시간을 모두 선택
    const selectedTimesRange = dayUseTimeFormat(
      roomDetail.dayUseInfo.dayUseStartTime,
      roomDetail.dayUseInfo.dayUseEndTime,
      60
    ).slice(clickedTimeIndex, clickedTimeIndex + maxDuration + 1);

    if (selectedTimes[0] == time) {
      setSelectedTimes([]);
    } else {
      setSelectedTimes(selectedTimesRange);
    }
  };

  useEffect(() => {
    if (selectedTimes.length > 0) {
      sendCheckTime(selectedTimes);
    }
  }, [selectedTimes]);

  // 드래그 시작
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft); // 시작 위치
  };

  // 드래그 끝
  const onDragEnd = () => {
    setIsDrag(false);
  };

  // 스크롤 이동 함수 (throttle 적용)
  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX; // 스크롤 위치 변경

      if (scrollLeft === 0) {
        setStartX(e.pageX); // 처음으로 돌아가면 다시 시작 위치 설정
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft); // 끝에 다르면 시작 위치를 마지막으로 설정
      }
    }
  };

  const delay = 10; // 스크롤 이동을 제어하는 지연 시간
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <div>
      <div
        className="DragSlide mt-[5px] flex h-[50px] items-center gap-[7px] overflow-x-auto"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={isDrag ? onThrottleDragMove : null}
      >
        {dayUseTimeFormat(
          roomDetail.dayUseInfo.dayUseStartTime,
          roomDetail.dayUseInfo.dayUseEndTime,
          60
        )
          .filter(
            (_, index, array) => index !== 0 && index !== array.length - 1
          )
          .filter((item) => {
            const currentTime = new Date();
            const targetTime = new Date(
              `${formattedRequestDate(checkInDate)}T${item}`
            );
            return currentTime <= targetTime; // 현재 시간보다 이후의 시간만 통과
          })
          .map((item, index) => (
            // 현재 시간 보다 작은 checkindate + time 은 버튼 생성 스킵
            <TimeButton
              key={index}
              time={item}
              isSelected={selectedTimes.includes(item)}
              handleButtonClick={() => handleButtonClick(item)} // 클릭 시에만 활성화
            />
          ))}
      </div>
      {noticeText && (
        <div>
          <span className="text-[10px] text-red-500">{noticeText}</span>
        </div>
      )}
    </div>
  );
};

const TimeButton = ({ time, isSelected, handleButtonClick }) => {
  return (
    <div>
      <button
        className={`border-[0.7px] px-[12px] py-[5px] ${isSelected ? "border-[#8728FF] bg-[#E9D8FF] text-[#8728FF]" : "border-[#999999] text-[#999999]"}  rounded-[13.5px] text-[12px]`}
        onClick={handleButtonClick} // 클릭 시 상태 변경
      >
        {time}
      </button>
    </div>
  );
};
