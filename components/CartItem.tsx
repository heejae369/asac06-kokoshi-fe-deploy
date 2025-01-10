// import React from "react";

// interface CartItemProps {
//   id: number;
//   type: string;
//   name: string;
//   period: string;
//   roomInfo: string;
//   checkIn: string;
//   checkOut: string;
//   specialPrice?: number; // 숫자 형식으로 처리
//   stock: number;
//   price: number;
//   isChecked: boolean;
//   onCheck: (id: number) => void;
// }

// const CartItem: React.FC<CartItemProps> = ({
//   id,
//   type,
//   name,
//   period,
//   roomInfo,
//   checkIn,
//   checkOut,
//   specialPrice,
//   stock,
//   price,
//   isChecked,
//   onCheck,
// }) => {
//   return (
//     <div className="p-4 border-b border-gray-200">
//       <div className="flex gap-4">
//         {/* 체크박스 */}
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={() => onCheck(id)}
//           className="w-5 h-5 mt-2"
//         />

//         {/* 사진 및 정보 */}
//         <div className="flex flex-col flex-1">
//           <div className="flex gap-4">
//             {/* 사진 */}
//             <img
//               src="/placeholder.jpg"
//               alt={name}
//               className="w-20 h-20 rounded-md object-cover"
//             />

//             {/* 숙소정보1 */}
//             <div className="flex flex-col flex-1">
//               <span className="text-xs font-bold text-purple-600">{type}</span>
//               <span className="text-sm font-semibold text-gray-900">{name}</span>
//               <span className="text-xs text-gray-900">{period}</span>
//               <span className="text-xs text-gray-600">{roomInfo}</span>
//             </div>
//           </div>

//           {/* 숙소정보2 */}
//           <div className="mt-4">
//             <div className="flex justify-between bg-gray-100 p-2 rounded-md">
//               <span className="text-xs font-medium text-gray-600">이용시간</span>
//               <div className="flex gap-2">
//                 <span className="text-xs text-gray-600">체크인 {checkIn}</span>
//                 <span className="text-xs text-gray-600">체크아웃 {checkOut}</span>
//               </div>
//             </div>

//             {/* 가격 및 특가 정보 */}
//             <div className="mt-2 flex flex-col items-end">
//               {specialPrice && (
//                 <span className="bg-purple-300 text-xs text-purple-600 mb-1">
//                   선착순 {specialPrice.toLocaleString()}원 특가
//                 </span>
//               )}
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-purple-600">{stock}개 남음</span>
//                 <span className="text-lg font-bold text-gray-900">
//                   {price.toLocaleString()}원
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItem;


import React from 'react';

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
      (new Date(reservationEnd).getTime() - new Date(reservationStart).getTime()) /
      (1000 * 60 * 60 * 24); // 날짜 차이를 일 단위로 계산



    const getDayOfWeek = (dateString: string): string => {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    const startDay = getDayOfWeek(reservationStart); // 시작 날짜의 요일
    const endDay = getDayOfWeek(reservationEnd);


  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(id)}
          className="w-5 h-5 mt-2"
        />
        <div className="flex flex-col flex-1">
          <div className="flex gap-4">
            <img
              src="/placeholder.jpg"
              alt={name}
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="text-xs font-bold text-purple-600">{type}</span>
              <span className="text-sm font-semibold text-gray-900">{name}</span>
              <span className="text-xs text-gray-900">{reservationStart}({startDay}) ~ {reservationEnd}({endDay}), {nights}박
              </span>
              <span className="text-xs text-gray-600">
                기준 {capacity}명 / 최대 {maxCapacity}명
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between bg-gray-100 p-2 rounded-md">
              <span className="text-xs font-medium text-gray-600">이용시간</span>
              <div className="flex gap-2">
                <span className="text-xs text-gray-600">체크인 {checkIn}</span>
                <span className="text-xs text-gray-600">체크아웃 {checkOut}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col items-end">
              {specialPrice && (
                <span className="bg-purple-300 text-xs text-purple-600 mb-1">
                  선착순 {specialPrice.toLocaleString()}원 특가
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-600">{stock}개 남음</span>
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
