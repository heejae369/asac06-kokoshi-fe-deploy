"use client";

import { Headers } from "@/components/SearchComponent";
import Image from "next/image";
import { useState } from "react";

export default function Reservation() {
  const data = [
    {
      id: 1,
      image: "/hotel1.png",
      accommodationCategory: "호텔",
      name: "서울 호텔",
      roomName: "디럭스 트윈",
      roomMin: "기준 2명",
      roomMax: "최대 2명",
      checkInDate: "2023.06.14(화)",
      checkOutDate: "2023.06.14(수)",
      checkInTIme: "16:00",
      checkOutTime: "12:00",
      price: "50,000원",
    },
    {
      id: 2,
      image: "/hotel1.png",
      accommodationCategory: "호텔",
      name: "서울 호텔",
      roomName: "디럭스 트윈",
      roomMin: "기준 2명",
      roomMax: "최대 2명",
      checkInDate: "2023.06.14(화)",
      checkOutDate: "2023.06.14(수)",
      checkInTIme: "16:00",
      checkOutTime: "12:00",
      price: "50,000원",
    },
  ];
  const user = { userName: "유성환", userPhoneNumber: "010-2295-2483" };
  const [onReservationPerson, setOnReservationPerson] = useState(false);
  const [name, setName] = useState(user.userName);
  const [phoneNumber, setPhoneNumber] = useState(user.userPhoneNumber);

  const handleReservationPerson = () => {
    setOnReservationPerson((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="w-[360px] bg-white relative flex flex-col h-full px-[20px]">
        <Headers
          title={onReservationPerson ? "예약자 정보" : "예약"}
          backIcon={true}
        />
        {onReservationPerson ? (
          <>
            <OnReservationPerson
              name={name}
              setName={setName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              handleReservationPerson={handleReservationPerson}
            />
          </>
        ) : (
          <>
            <div className="tracking-[-0.8px] mt-[15px]">
              {data?.length > 0 &&
                data.map((item, index) => (
                  <div key={item.id}>
                    <ProductList data={item} />
                    {index < data.length - 1 && (
                      <hr className="w-[320px] my-[20px]" />
                    )}
                  </div>
                ))}
            </div>
            <hr className="w-[360px] my-[20px] m-[-20px] border-t-[6px]"></hr>
            <ReservationPerson
              name={name}
              phoneNumber={phoneNumber}
              handleReservationPerson={handleReservationPerson}
            />
            <hr className="w-[360px] my-[20px] m-[-20px] border-t-[6px]"></hr>
            <CouponAndPoint />
            <hr className="w-[360px] my-[20px] m-[-20px] border-t-[6px]"></hr>
            <DiscountAndPaymentInfo />
            <hr className="w-[360px] my-[20px] m-[-20px] border-t-[6px]"></hr>
            <PaymentSelcet />
            <RequiredTerms />
            <Notification />
            <PaymentButton />
          </>
        )}
      </div>
    </div>
  );
}

const ProductList = ({ data }) => {
  const [walkRadio, setWalkRadio] = useState(false);
  const [vehicleRadio, setVehiccleRadio] = useState(false);

  const handleWalkRadio = () => {
    setWalkRadio((prev) => !prev);
  };

  const handleVehicleRadio = () => {
    setVehiccleRadio((prev) => !prev);
  };

  // 몇박인지 계산해야함.
  const howManyNights = "1박";

  return (
    <div className="mt-[10px]">
      <div className="flex items-center">
        <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
          {data.accommodationCategory}
        </div>
      </div>
      <div className="mt-[3px] flex font-bold">
        <span className="text-[14px]">{data.name}</span>
      </div>
      <div className="mt-[2px] flex items-center mb-[30px]">
        <span className="text-[12px] font-[600] text-[#4C4C4C]">
          {data.roomName} {`(${data.roomMin}/${data.roomMax})`}
        </span>
      </div>
      <div className="flex flex-col gap-[30px] px-[20px] tracking-[-0.4px]">
        <div className="flex justify-between font-bold">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#999999]">체크인</span>
            <span className="text-[14px]">{data.checkInDate}</span>
            <span className="text-[14px]">{data.checkInTIme}</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center rounded-[12px] bg-[#E5E5E5] px-[12px] py-[4px]">
              <span className="text-[12px] text-[#333333]">
                {howManyNights}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#999999]">체크아웃</span>
            <span className="text-[14px]">{data.checkOutDate}</span>
            <span className="text-[14px]">{data.checkOutTime}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px]">방문수단</span>
          <div className="flex gap-[15px] font-bold">
            <button
              className="flex items-center gap-[5px]"
              onClick={handleWalkRadio}
            >
              <Image
                src={
                  walkRadio
                    ? "/assets/icon/ic_radio_p.png"
                    : "/assets/icon/ic_radio_g.png"
                }
                alt="ic_radio_g"
                width={16}
                height={16}
              ></Image>
              <span
                className={`text-[12px] ${walkRadio ? "text-[#8728FF]" : "text-[#999999]"}`}
              >
                도보
              </span>
            </button>
            <button
              className="flex items-center gap-[5px] text-[#999999]"
              onClick={handleVehicleRadio}
            >
              <Image
                src={
                  vehicleRadio
                    ? "/assets/icon/ic_radio_p.png"
                    : "/assets/icon/ic_radio_g.png"
                }
                alt="ic_radio_p"
                width={16}
                height={16}
              ></Image>
              <span
                className={`text-[12px] ${vehicleRadio ? "text-[#8728FF]" : "text-[#999999]"}`}
              >
                차량
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[12px]">결제금액</span>
          <span className="font-bold mr-[-20px]">{data.price}</span>
        </div>
      </div>
    </div>
  );
};

const ReservationPerson = ({ name, phoneNumber, handleReservationPerson }) => {
  return (
    <div className="tracking-[-0.5px]">
      <TitleText title={"예약자 정보"} />
      <div className="mt-[15px] flex justify-between text-[14px]">
        <div className="flex gap-[20px]">
          <span>{name}</span>
          <span>{phoneNumber}</span>
        </div>
        <button onClick={handleReservationPerson}>
          <Image
            src={"/assets/icon/ic_r_arrow_gray_12px.png"}
            alt="r_arrow"
            width={6}
            height={6}
          ></Image>
        </button>
      </div>
    </div>
  );
};

const CouponAndPoint = ({}) => {
  // 쿠폰 장수
  const couponCount = 1;

  return (
    <div>
      <TitleText title={"쿠폰 및 포인트 사용"} />
      <div className="mt-[15px] flex justify-between">
        <span className="text-[14px]">쿠폰</span>
        <button className="flex items-center text-[14px] gap-[7px]">
          <span className="text-[#999999] font-bold">{`사용 가능 쿠폰 ${couponCount}장`}</span>
          <Image
            src={"/assets/icon/ic_r_arrow_gray_12px.png"}
            alt="r_arrow"
            width={6}
            height={6}
          ></Image>
        </button>
      </div>
      <div className="flex justify-between mt-[15px]">
        <div className="flex gap-[7px] items-center">
          <span className="text-[14px]">포인트</span>
          <span className="text-[10px] text-[#999999] font-bold">
            1,200P 사용가능
          </span>
        </div>
        <div className="flex gap-[7px] items-center">
          <span className="text-[14px] text-[#999999] font-bold">-0P</span>
          <button className="bg-[#E5E5E5] flex items-center px-[5px] py-[4px] rounded-[6px]">
            <span className="text-[10px] text-[#999999] font-bold">
              전액 사용
            </span>
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <hr className="mt-[8px] w-[160px]"></hr>
      </div>
    </div>
  );
};

const DiscountAndPaymentInfo = () => {
  return (
    <div>
      <TitleText title={"할인 및 결제 정보"} />
      <div className="mt-[15px] flex flex-col">
        <div className="flex justify-between tracking-[-0.8px] mb-[20px]">
          <span className="text-[14px]">결제 금액</span>
          <span className="text-[14px] font-bold">234,000원</span>
        </div>
      </div>
      <div className="flex justify-between tracking-[-0.8px]">
        <span className="text-[14px]">할인 금액</span>
        <span className="text-[14px] font-bold">-9,000원</span>
      </div>
      <div>
        <hr className="my-[15px]"></hr>
      </div>
      <div className="flex justify-between tracking-[-0.8px]">
        <span className="text-[14px]">총 결제금액</span>
        <span className="text-[14px] font-bold">225,000원</span>
      </div>
    </div>
  );
};

const PaymentSelcet = () => {
  const [creditCard, setCreditCard] = useState(false);
  const [accountTransfer, setAccountTransfer] = useState(false);
  const [kakaoPay, setKakaoPay] = useState(false);

  const handleCreditCard = () => {
    setCreditCard((prev) => !prev);
    setAccountTransfer(false);
    setKakaoPay(false);
  };

  const handleAccountTransfer = () => {
    setAccountTransfer((prev) => !prev);
    setCreditCard(false);
    setKakaoPay(false);
  };

  const handleKakaoPay = () => {
    setKakaoPay((prev) => !prev);
    setAccountTransfer(false);
    setCreditCard(false);
  };

  return (
    <div>
      <TitleText title={"결제 수단 선택"} />
      <div className="flex gap-[4px] mt-[12px]">
        <PaymentType
          imageUrl={"/assets/icon/ic_pay_card_tablet.png"}
          imageWidth={45}
          imageHeight={30}
          text={"신용카드"}
          handleOnClick={handleCreditCard}
          bool={creditCard}
        />
        <PaymentType
          imageUrl={"/assets/icon/ic_pay_account_tablet.png"}
          imageWidth={39}
          imageHeight={28}
          text={"실시간 계좌이체"}
          handleOnClick={handleAccountTransfer}
          bool={accountTransfer}
        />
        <PaymentType
          imageUrl={"/assets/icon/ic_pay_kakaopay_tablet.png"}
          imageWidth={45}
          imageHeight={30}
          text={"카카오페이"}
          handleOnClick={handleKakaoPay}
          bool={kakaoPay}
        />
      </div>
    </div>
  );
};

const RequiredTerms = () => {
  const [totallyAgree, setTotallyAgree] = useState(false);
  const [useOfInfomation, setUseOfInfomation] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);

  const handleTotallyAgree = () => {
    if (!totallyAgree) {
      setUseOfInfomation(true);
      setThirdParty(true);
    } else {
      setUseOfInfomation(false);
      setThirdParty(false);
    }
    setTotallyAgree((prev) => !prev);
  };

  const handleUseOfInfomation = () => {
    if (useOfInfomation) setTotallyAgree(false);
    setUseOfInfomation((prev) => !prev);
  };

  const handleThirdParty = () => {
    if (thirdParty) setTotallyAgree(false);
    setThirdParty((prev) => !prev);
  };
  return (
    <div className="flex flex-col mt-[30px] gap-[10px]">
      <div className="flex items-center gap-[11px] mb-[5px]">
        <button onClick={handleTotallyAgree}>
          <Image
            src={
              totallyAgree
                ? "/assets/icon/ic_squarecheck_p.png"
                : "/assets/icon/ic_squarecheck_g.png"
            }
            alt="ic_squarecheck_g"
            width={20}
            height={20}
          ></Image>
        </button>
        <span className="text-[14px] tracking-[-0.5px] font-bold">
          필수 약관 전체 동의
        </span>
      </div>
      <div className="flex items-center gap-[14px] ml-[3px]">
        <button onClick={handleUseOfInfomation}>
          <Image
            src={
              useOfInfomation
                ? "/assets/icon/ic_check_p.png"
                : "/assets/icon/ic_check_g.png"
            }
            alt="ic_check_g"
            width={15}
            height={9}
          ></Image>
        </button>
        <span className="text-[12px] text-[#7F7F7F]">
          {"[필수] 개인정보 수집 및 이용"}
        </span>
      </div>
      <div className="flex items-center gap-[14px] ml-[3px]">
        <button onClick={handleThirdParty}>
          <Image
            src={
              thirdParty
                ? "/assets/icon/ic_check_p.png"
                : "/assets/icon/ic_check_g.png"
            }
            alt="ic_check_g"
            width={15}
            height={9}
          ></Image>
        </button>
        <span className="text-[12px] text-[#7F7F7F]">
          {"[필수] 개인정보 제 3자 제공"}
        </span>
      </div>
    </div>
  );
};

const Notification = () => {
  const notificationText =
    "코코시는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.";
  return (
    <div className="bg-[#F6F6F6] py-[16px] px-[13px] mt-[10px] rounded-[7px]">
      <span className="text-[12px] text-[#666666] tracking-[-0.8px] leading-[1]">
        {notificationText}
      </span>
    </div>
  );
};

const PaymentButton = () => {
  return (
    <div>
      <button className="w-full h-[50px] bg-[#B2B2B2] rounded-[5px] mt-[50px] mb-[20px]">
        <span className="text-white font-bold tracking-[-0.5px]">
          225,000원 결제하기
        </span>
      </button>
    </div>
  );
};

const PaymentType = ({
  imageUrl,
  imageWidth,
  imageHeight,
  text,
  handleOnClick,
  bool,
}) => {
  return (
    <>
      <button className="relative tracking-[-0.8px]" onClick={handleOnClick}>
        <Image
          src={
            bool
              ? "/assets/icon/Rectangle 25.png"
              : "/assets/icon/Rectangle_400.png"
          }
          alt="Rectangle_400"
          width={110}
          height={110}
        ></Image>
        <Image
          className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-75%]"
          src={
            bool && text == "실시간 계좌이체"
              ? "/assets/icon/ic_pay_account.png"
              : imageUrl
          }
          alt={imageUrl}
          width={imageWidth}
          height={imageHeight}
        ></Image>
        <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[60%] whitespace-nowrap text-[12px] font-bold text-[#8728FF]">
          {text}
        </span>
      </button>
    </>
  );
};

const OnReservationPerson = ({
  setName,
  name,
  setPhoneNumber,
  phoneNumber,
  handleReservationPerson,
}) => {
  const [isFirstFocused, setIsFirstFocused] = useState(false);
  const [isSecondFocused, setIsSecondFocused] = useState(false);

  const handleFirstFocus = () => setIsFirstFocused(true);
  const handleFirstBlur = () => setIsFirstFocused(false);

  const handleSecondFocus = () => setIsSecondFocused(true);
  const handleSecondBlur = () => setIsSecondFocused(false);

  const handlePhoneChange = (e) => {
    const inputText = e.currentTarget.value.replace(/[^0-9]/g, "");
    let formattedText = "";

    if (inputText.length <= 3) {
      formattedText = inputText;
    } else if (inputText.length <= 7) {
      formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3)}`;
    } else {
      formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3, 7)}-${inputText.slice(7, 11)}`;
    }

    setPhoneNumber(formattedText);
  };

  return (
    <div className="mt-[20px] tracking-[-0.5px]">
      <div>
        <span className="text-[14px]">예약자 이름</span>
      </div>
      <div className="relative mt-[10px]">
        <input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onFocus={handleFirstFocus}
          onBlur={handleFirstBlur}
          className={`w-[320px] h-[45px] text-[14px] border-[2px] rounded-[7px] ${isFirstFocused ? "border-[#8728FF] focus:outline-none" : "border-[#E5E5E5]"} px-[15px]`}
        />
        <Image
          src={
            isFirstFocused
              ? "/assets/icon/ic_search_delete_p.png"
              : "/assets/icon/ic_search_delete.png"
          }
          alt="ic_search_delete"
          width={15}
          height={12}
          className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[18px]"
        ></Image>
      </div>
      <div className="mt-[14px]">
        <span className="text-[14px]">휴대폰 번호</span>
      </div>
      <div className="relative mt-[10px]">
        <input
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e)}
          onFocus={handleSecondFocus}
          onBlur={handleSecondBlur}
          className={`w-[320px] h-[45px] text-[14px] border-[2px] rounded-[7px] ${isSecondFocused ? "border-[#8728FF] focus:outline-none" : "border-[#E5E5E5]"} px-[15px]`}
        />
        <Image
          src={
            isSecondFocused
              ? "/assets/icon/ic_search_delete_p.png"
              : "/assets/icon/ic_search_delete.png"
          }
          alt="ic_search_delete"
          width={15}
          height={12}
          className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[18px]"
        ></Image>
      </div>
      <div>
        <button
          className="w-[320px] h-[50px] bg-[#8728FF] fixed bottom-0 left-1/2 transform -translate-x-1/2 my-4 rounded-[5px]"
          onClick={handleReservationPerson}
        >
          <span className="text-white">설정완료</span>
        </button>
      </div>
    </div>
  );
};

const TitleText = ({ title }) => {
  return (
    <>
      <div className="tracking-[-0.8px]">
        <span className="text-[14px] font-bold">{title}</span>
      </div>
    </>
  );
};
