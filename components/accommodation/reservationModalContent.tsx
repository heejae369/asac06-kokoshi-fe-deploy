import { DragSlideTimeButton } from "@/components/DragSlideButton";
import { Button } from "@/components/ui/button";
import { Room } from "@/feature/accommodation/type/accommodation.type";
import { useCalendar } from "@/feature/CalendarContext";
import {
  formattedGetDate,
  formattedRequestDate,
  getDiffDays,
} from "@/feature/DateFormat";
import { requestReservation } from "@/feature/reservation/type/reservation.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ReservationType = ({
  roomDetail,
  reservationType,
}: {
  roomDetail: Room;
  reservationType: string;
}) => {
  const router = useRouter();
  const { adultNumber, checkInDate, checkOutDate, dayOfWeek } = useCalendar();

  const [reservationParam, setReservationParam] = useState<requestReservation>({
    roomId: roomDetail.roomId,
    startDate: formattedRequestDate(checkInDate),
    endDate: formattedRequestDate(checkOutDate),
    capacity: adultNumber,
    startTime: roomDetail.checkIn,
    endTime: roomDetail.checkOut,
    reservationType: reservationType,
  });

  const [selectTime, setSelectCheckTiem] = useState({
    selectCheckInTime: "",
    selectCheckOutTime: "",
  });
  const handleDayUseTime = (selectCheckTime) => {
    setSelectCheckTiem(selectCheckTime);
    console.log(selectCheckTime);
  };

  console.log(selectTime);
  useEffect(() => {
    let endDate = "";
    if (reservationType === "DAY_USE") {
      endDate = formattedRequestDate(checkInDate);
    } else {
      endDate = formattedRequestDate(checkOutDate);
    }

    setReservationParam((prevState) => ({
      ...prevState,
      startTime: selectTime.selectCheckInTime,
      endTime: selectTime.selectCheckOutTime,
      endDate: endDate,
    }));
  }, [selectTime]);

  const params = encodeURIComponent(JSON.stringify([reservationParam]));
  const onClickCart = () => {
    console.log("장바구니");
    router.push(`/yanolza/cart?data=${params}`);
  };

  const onClickReservation = () => {
    console.log("예약하기");
    router.push(`/reservation?data=${params}`);
  };

  return (
    <>
      <div className="mb-[16px] mt-[25px] text-[16px] font-bold">{`${reservationType == "DAY_USE" ? "대실 예약" : "숙박 예약"}`}</div>
      <div className="flex justify-between">
        <Image src={roomDetail.thumbnail} alt="" width={95} height={95} />
        <div className="flex flex-col gap-1">
          <span>{roomDetail.name}</span>
          <div className="flex w-[218px] items-center justify-center gap-[7px] rounded-md bg-gray-100 p-[10px] text-xs">
            <div className="text-center">
              <span className="text-[#999999]">체크인</span>
              <br />
              <span>{formattedGetDate(checkInDate)}</span>
              <br />
              {reservationType === "STAY" ? (
                <span>{roomDetail.checkIn}</span>
              ) : !selectTime ? (
                <span>선택 전</span>
              ) : (
                <span>{selectTime.selectCheckInTime}</span>
              )}
            </div>
            <div className="rounded-2xl bg-[#CCCCCC] px-[6px] py-[2px] text-[10px] text-[#666666]">
              {`${reservationType == "DAY_USE" ? `${roomDetail.dayUseInfo?.dayUseTime}시간` : `${getDiffDays(checkInDate, checkOutDate)}박`}`}
            </div>
            <div className="text-center">
              <span className="text-[#999999]">체크아웃</span>
              <br />
              <span>{formattedGetDate(checkOutDate)}</span>
              <br />
              {reservationType === "STAY" ? (
                <span>{roomDetail.checkOut}</span>
              ) : !selectTime ? (
                <span>선택 전</span>
              ) : (
                <span>{selectTime.selectCheckOutTime}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {reservationType === "DAY_USE" && (
        <DragSlideTimeButton
          roomDetail={roomDetail}
          onCheckTimeChange={handleDayUseTime}
        />
      )}
      <div
        className={`${reservationType == "DAY_USE" ? "mt-[9px]" : "mt-[14px]"} text-[12px] text-[#B2B2B2]`}
      >
        ⦁ &nbsp;&nbsp;현장상황에 따라 객실 랜덤배정 (객실지정불가) <br />
        ⦁ &nbsp;&nbsp;예약 후 10분 내 취소될 경우 취소 수수료가 발생하지
        않습니다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(*체크인 시간 경과 후 제외)
      </div>
      <div className="mb-[15px] mt-[20px] flex justify-between">
        {/* 숙박 몇박인지, 대실 몇시간인지 계산하는 로직 추가해야 함. */}
        <div>
          <span className="font-bold">{`${reservationType == "DAY_USE" ? `대실 ` : "숙박 "}`}</span>
          <span className="font-normal">{`${reservationType == "DAY_USE" ? `(최대 ${roomDetail.dayUseInfo?.dayUseTime}시간)` : `${getDiffDays(checkInDate, checkOutDate)}박`}`}</span>
        </div>
        <span className="font-bold">{`${reservationType == "DAY_USE" ? roomDetail.dayUseInfo?.dayUseMinPrice : roomDetail.minPrice}`}</span>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={onClickCart}
          className="w-[155px] rounded-lg border border-[#8728FF] bg-white px-8 text-[#8728FF] hover:bg-purple-50"
        >
          장바구니 담기
        </Button>
        <Button
          onClick={onClickReservation}
          className="w-[155px] px-8"
          variant={"point"}
        >
          예약하기
        </Button>
      </div>
    </>
  );
};
