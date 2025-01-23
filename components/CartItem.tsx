import React from "react";

interface CartItemProps {
  id: number;
  type: string;
  name: string;
  reservationStart: string;
  reservationEnd: string;
  capacity: number;
  maxCapacity: number;
  checkIn: string;
  checkOut: string;
  specialPrice?: number;
  stock: number;
  price: number;
  isChecked: boolean;
  onCheck: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  type,
  name,
  reservationStart,
  reservationEnd,
  capacity,
  maxCapacity,
  checkIn,
  checkOut,
  specialPrice,
  stock,
  price,
  isChecked,
  onCheck,
}) => {
  const period = `${reservationStart} ~ ${reservationEnd}`; // 날짜 계산
  const nights =
    (new Date(reservationEnd).getTime() -
      new Date(reservationStart).getTime()) /
    (1000 * 60 * 60 * 24); // 날짜 차이를 일 단위로 계산

  const getDayOfWeek = (dateString: string): string => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const startDay = getDayOfWeek(reservationStart); // 시작 날짜의 요일
  const endDay = getDayOfWeek(reservationEnd);

  return (
    <div className="py-4">
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(id)}
          className="mt-2 h-5 w-5"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex gap-2 tracking-[-0.6px]">
            <img
              src="/hotel1.png"
              alt={name}
              className="h-20 w-20 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
                  {type}
                </div>
              </div>
              <div className="flex h-[21px] items-center">
                <span className="text-sm font-semibold text-gray-900">
                  {name}
                </span>
              </div>
              <div className="flex h-[18px] items-center">
                <span className="text-xs text-gray-900">
                  {reservationStart}({startDay}) ~ {reservationEnd}({endDay}),{" "}
                  {nights}박
                </span>
              </div>
              <span className="text-xs text-gray-600">
                디럭스 트윈 기준 {capacity}명 / 최대 {maxCapacity}명
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between rounded-md bg-gray-100 px-[15px] py-3 text-xs">
              <span className="text-xs font-medium text-gray-600">
                이용시간
              </span>
              <div className="flex gap-4">
                <div className="flex gap-[5px]">
                  <span className="text-gray-600">체크인</span>
                  <span className="">{checkIn.substring(0, 5)}</span>
                </div>
                <div>
                  <span className="text-gray-600">체크아웃</span>
                  <span className="">{checkOut.substring(0, 5)}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-col items-end">
              {specialPrice && (
                // <span className="mb-1 bg-purple-300 text-xs text-purple-600 px-[5px]">
                //   선착순 {specialPrice.toLocaleString()}원 특가
                // </span>
                <div className="flex h-[16px] items-center bg-[#8728FF] bg-opacity-20 px-[5px]">
                  <span className="text-[10px] font-bold text-[#8728FF]">
                    선착순 {specialPrice.toLocaleString()}원 특가
                  </span>
                </div>
              )}
              <div className="flex items-end gap-[10px]">
                <span className="pb-[3px] text-xs text-[#8728FF]">
                  {stock}개 남음
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
