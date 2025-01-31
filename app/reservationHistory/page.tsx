"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainHeaders from "@/components/MainHeaders";
import Footer from "@/components/Footer";
import { reservationApi } from "@/feature/reservation/api/api";
import {
  reservationByDate,
  reservationList,
} from "@/feature/reservation/type/reservation.type";
import Image from "next/image";
import { getDayOfWeekForString } from "@/feature/DateFormat";

const ReservationHistory = () => {
  // const cateGoryList = [
  //   "ALL",
  //   "HOTEL",
  //   "MOTEL",
  //   "PENSION",
  //   "POOL_VILLA",
  //   "CAMPING",
  //   "GUESTHOUSE",
  //   "RESORT",
  // ];
  const cateGoryList = [
    "전체",
    "호텔",
    "모텔",
    "펜션",
    "풀빌라",
    "캠핑",
    "게스트하우스",
    "리조트",
  ];
  const today = new Date().toISOString().split("T")[0];

  const dateRanges = ["최근 1개월", "최근 3개월", "최근 6개월"];
  const dateRangeValues = [1, 3, 6];

  const [category, setCategory] = useState("전체");
  const [startDate, setStartDate] = useState(today);
  const [reservationList, setReservationList] = useState<reservationByDate[]>(
    []
  );
  // const [endDate, setEndDate] = useState();

  // 카테고리 onchange
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  // 날짜 옵션 onchange
  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dateOption = Number(e.target.value);
    const date = carcDate(dateOption);
    const newDate = date.toISOString().split("T")[0];
    setStartDate(newDate);
  };

  const { isLoading, isSuccess, data } = reservationApi.useReservationListQuery(
    { requestReservationHistory: { startDate, category } }
  );

  // useState 로 category, startDate, endDate 세팅 시, 목록 조회
  useEffect(() => {
    if (isSuccess && data) {
      setReservationList(data.data);
    }
  }, [category, data, isSuccess, startDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const carcDate = (dateOption: number) => {
    const tempDate = new Date();
    tempDate.setMonth(tempDate.getMonth() - dateOption);

    return tempDate;
  };

  return (
    <div className=" flex h-full w-full justify-center bg-gray-100 ">
      <div className=" w-[360px] bg-white px-5 font-sans ">
        {/* Header */}
        <div className="sticky top-0 z-10 -mx-5 h-24 w-[360px] bg-white">
          <div className="absolute w-full px-5">
            <MainHeaders title={"예약내역"} backIcon={true} />
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex gap-2 p-4">
          <select
            className="flex-1 p-2 border rounded-md text-gray-600"
            onChange={handleChangeCategory}
          >
            {cateGoryList.map((category, index) => (
              // eslint-disable-next-line react/jsx-key
              <option key={index} value={category}>
                {cateGoryList[index]}
              </option>
            ))}
          </select>
          <select
            className="flex-1 p-2 border rounded-md text-gray-600"
            onChange={handleChangeDate}
          >
            {dateRangeValues.map((dateRange, index) => (
              // eslint-disable-next-line react/jsx-key
              <option key={index} value={dateRange}>
                {dateRanges[index]}
              </option>
            ))}
          </select>
        </div>

        {/* Reservations List */}
        <div className="pd-[160px] space-y-4">
          {reservationList.length === 0 ? (
            <div>조회된 예약 내역이 없습니다.</div>
          ) : (
            reservationList.map((reservationDateGroup, index) => (
              <div key={index}>
                <div className="mb-[16px] mt-[26px]">
                  <span className="text-base font-bold">
                    {reservationDateGroup.reservatedDate} (
                    {getDayOfWeekForString(reservationDateGroup.reservatedDate)}
                    )
                  </span>
                </div>
                {reservationDateGroup.reservationList.map(
                  (reservationGroupList, index) => (
                    <ReservationRoomList
                      reservationGroupList={reservationGroupList}
                      key={index}
                    />
                  )
                )}
              </div>
            ))
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ReservationHistory;

const ReservationRoomList = ({
  reservationGroupList,
}: {
  reservationGroupList: reservationList;
}) => {
  const router = useRouter();

  const handleReviewWrite = (reservationRoomId) => {
    const params = encodeURIComponent(JSON.stringify(reservationRoomId));
    router.push(`/reviewWrite?data=${params}`);
  };

  return (
    <>
      <div className="flex flex-col pb-4">
        <div className="flex">
          <div>
            <Image
              src={"/hotel1.png"}
              width={100}
              height={100}
              alt="productImage"
            ></Image>
          </div>
          <div className="ml-[9px]">
            <div className="tracking-[-0.5px]">
              <div className="flex items-center">
                <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
                  {reservationGroupList.category}
                </div>
              </div>
              <div className="mb-[3px] mt-[2px] flex items-center">
                <span className="text-[14px] font-bold">
                  {reservationGroupList.accommodationName}
                </span>
              </div>
              <div className="mb-px flex h-[19px] items-center">
                <span className="text-[12px] font-bold">
                  {`${reservationGroupList.startDate} (${getDayOfWeekForString(reservationGroupList.startDate)})
                  ~ ${reservationGroupList.endDate} (${getDayOfWeekForString(reservationGroupList.endDate)})`}
                </span>
              </div>
              <div className="flex h-[19px] items-center">
                <span className="text-[12px] font-bold text-[#7F7F7F]">{`${reservationGroupList.roomName} (기준 ${reservationGroupList.capacity}명/최대 ${reservationGroupList.maxCapacity}명)`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[17px] flex h-[45px] items-center justify-between rounded-[7px] bg-[#E5E5E5]/40 px-[16px] text-[12px] font-bold">
          <span className="text-[#333333]">이용시간</span>
          <div className="mr-[16px] flex gap-[20px]">
            <div className="flex gap-[5px]">
              <span className="text-[#7F7F7F]">체크인</span>
              <span className="text-[#4C4C4C]">
                {reservationGroupList.startTime}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span className="text-[#7F7F7F]">체크아웃</span>
              <span className="text-[#4C4C4C]">
                {reservationGroupList.endTime}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[13px] flex items-center justify-between">
          <span className="pl-4 text-[12px] font-bold">결제 금액</span>
          <span className="mr-[3px] font-bold">{`${reservationGroupList.price}원`}</span>
        </div>
        {new Date(reservationGroupList.endDate) < new Date() && (
          <button
            onClick={() =>
              handleReviewWrite(reservationGroupList.reservationRoomId)
            }
            className="w-full py-2 text-center border rounded-md text-gray-600"
          >
            후기 작성하기 가기
          </button>
        )}
      </div>
    </>
  );
};
