"use client";

import MainHeaders from "@/components/MainHeaders";
import { KakaoPayReady } from "@/feature/fetch/KakaoPayFetch";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import blackBackIcon from "@/assets/blckBackIcon.png";
import { reservationApi } from "@/feature/reservation/api/api";
import {
  requestReservation,
  roomInfoForReserve,
} from "@/feature/reservation/type/reservation.type";
import { userApi } from "@/feature/users/api/api";
import {
  calculateDaysDifference,
  calculateTimeDifference,
  getDayOfWeekForString,
} from "@/feature/DateFormat";

export default function Reservation() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [onReservationPerson, setOnReservationPerson] = useState(false);

  const [paymentType, setPaymentType] = useState("");
  const [totaltTerms, setTotalTerms] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPayment, setIsPayment] = useState(false);

  const [productRadio, setProductRadio] = useState({});

  const [requestReservation, setRequestReservation] = useState<
    requestReservation[]
  >([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString: string = searchParams.get("data");
  const params = decodeURIComponent(queryString);
  const userEmail: string = localStorage.getItem("userEmail");

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = userApi.useUserInfoQuery({
    requestUserEmail: { userEmail: userEmail },
  });

  const [reservation, { isLoading, isSuccess, data }] =
    reservationApi.useReservationMutation();
  const handleReserve = async () => {
    await reservation({
      requestReservations: {
        reservationRequestList: requestReservation,
        reserveUser: name,
        reserveUserPhone: phoneNumber,
      },
    });
  };

  const handleRadioChange = (id, type) => {
    setProductRadio((prev) => {
      const updatedProductRadio = { ...prev };
      if (type === "walkRadio") {
        updatedProductRadio[id] = { walkRadio: true, vehicleRadio: false };
      } else {
        updatedProductRadio[id] = { walkRadio: false, vehicleRadio: true };
      }
      return updatedProductRadio;
    });
  };

  const handleReservationPerson = () => {
    setOnReservationPerson((prev) => !prev);
  };

  useEffect(() => {
    if (userData) {
      setName(userData.data.name);
      setPhoneNumber(userData.data.phone);
    }
  }, [userData]);

  useEffect(() => {
    try {
      const reservationData: requestReservation[] = JSON.parse(params);
      setRequestReservation(reservationData);
      setProductRadio(
        reservationData.reduce((acc, item) => {
          acc[item.roomId] = { walkRadio: false, vehicleRadio: false };
          return acc;
        }, {})
      );
    } catch {
      alert("잘못된 접근입니다.");
      router.push("/");
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      Object.values(productRadio).every(
        (radio) => radio.walkRadio || radio.vehicleRadio
      ) &&
      name &&
      phoneNumber &&
      paymentType &&
      totaltTerms
    ) {
      setIsPayment(true);
    } else {
      setIsPayment(false);
    }
  }, [name, phoneNumber, totaltTerms, paymentType, productRadio]);

  if (isLoading || isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError) {
    return <div>Error</div>;
  }

  if (isSuccess && data) {
    const kakaoReady = async () => {
      const requestBody = {
        reservationNumber: data.data,
      };
      console.log(paymentType);
      if (paymentType === "kakaoPay") {
        const response = await KakaoPayReady({ requestBody });

        if (response?.next_redirect_pc_url) {
          router.push(response.next_redirect_pc_url);
        } else {
          console.error("결제 요청 실패", response);
        }
      } else alert("준비중입니다.");
    };
    kakaoReady();
  }

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative flex h-full w-[360px] flex-col overflow-y-auto bg-white px-[20px]">
        {onReservationPerson ? (
          <>
            <OnReservationPersonTitle
              handleReservationPerson={handleReservationPerson}
            />
          </>
        ) : (
          <MainHeaders
            title={onReservationPerson ? "예약자 정보" : "예약"}
            backIcon={true}
          />
        )}
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
            <div className="mt-[15px] tracking-[-0.8px]">
              {requestReservation?.length > 0 &&
                requestReservation.map((item, index) => (
                  <div key={index}>
                    <ProductList
                      data={item}
                      walkRadio={productRadio[item.roomId]?.walkRadio}
                      setWalkRadio={() =>
                        handleRadioChange(item.roomId, "walkRadio")
                      }
                      vehicleRadio={productRadio[item.roomId]?.vehicleRadio}
                      setVehicleRadio={() =>
                        handleRadioChange(item.roomId, "vehicleRadio")
                      }
                      setTotalPrice={setTotalPrice}
                    />
                    {index < requestReservation.length - 1 && (
                      <hr className="my-[20px] w-[320px]" />
                    )}
                  </div>
                ))}
            </div>
            <hr className="m-[-20px] my-[20px] w-[360px] border-t-[6px]"></hr>
            <ReservationPerson
              name={name}
              phoneNumber={phoneNumber}
              handleReservationPerson={handleReservationPerson}
            />
            <hr className="m-[-20px] my-[20px] w-[360px] border-t-[6px]"></hr>
            <CouponAndPoint />
            <hr className="m-[-20px] my-[20px] w-[360px] border-t-[6px]"></hr>
            <DiscountAndPaymentInfo totalPrice={totalPrice} />
            <hr className="m-[-20px] my-[20px] w-[360px] border-t-[6px]"></hr>
            <PaymentSelect setPaymentType={setPaymentType} />
            <RequiredTerms
              totaltTerms={totaltTerms}
              setTotalTerms={setTotalTerms}
            />
            <Notification />
            <PaymentButton
              handlePayment={handleReserve}
              isPayment={isPayment}
            />
          </>
        )}
      </div>
    </div>
  );
}

const ProductList = ({
  data,
  walkRadio,
  setWalkRadio,
  vehicleRadio,
  setVehicleRadio,
  setTotalPrice,
}) => {
  const [roomInfo, setRoomInfo] = useState<roomInfoForReserve>();

  const handleWalkRadio = () => {
    setWalkRadio((prev) => !prev);
  };

  const handleVehicleRadio = () => {
    setVehicleRadio((prev) => !prev);
  };

  const {
    data: roomData,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = reservationApi.useRoomInfoForReserveQuery({
    requestRoomInfoForReserve: {
      roomId: data.roomId,
      startDate: data.startDate,
      endDate: data.endDate,
      reservationType: data.reservationType,
    },
  });

  useEffect(() => {
    if (roomData) {
      setRoomInfo(roomData.data);
      setTotalPrice((prev) => prev + roomData.data.price);
    }
  }, [roomData, setTotalPrice]);

  const { hours } = calculateTimeDifference(data.startTime, data.endTime);

  if (isRoomLoading) {
    return <div>Loading...</div>;
  }

  if (isRoomError) {
    return <div>Error</div>;
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center">
        <div className="h-[18px] rounded-[9px] border border-[#8728FF] px-[9px] py-[2px] text-[10px] text-[#8728FF]">
          {roomInfo?.category}
        </div>
      </div>
      <div className="mt-[3px] flex font-bold">
        <span className="text-[14px]">{roomInfo?.accommodationName}</span>
      </div>
      <div className="mb-[30px] mt-[2px] flex items-center">
        <span className="text-[12px] font-[600] text-[#4C4C4C]">
          {roomInfo?.roomName}{" "}
          {`( 기준 ${roomInfo?.capacity} / 최대 ${roomInfo?.maxCapacity} )`}
        </span>
      </div>
      <div className="flex flex-col gap-[30px] px-[20px] tracking-[-0.4px]">
        <div className="flex justify-between font-bold">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#999999]">체크인</span>
            <span className="text-[14px]">
              {data.startDate} ({getDayOfWeekForString(data.startDate)})
            </span>
            <span className="text-[14px]">{data.startTime}</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center rounded-[12px] bg-[#E5E5E5] px-[12px] py-[4px]">
              <span className="text-[12px] text-[#333333]">
                {`${data.reservationType == "DAY_USE" ? `${hours}시간` : `${calculateDaysDifference(data.startDate, data.endDate)}박`}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#999999]">체크아웃</span>
            <span className="text-[14px]">
              {data.endDate} ({getDayOfWeekForString(data.endDate)})
            </span>
            <span className="text-[14px]">{data.endTime}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px]">
            방문수단<span className="text-[#D53560] font-bold">*</span>
          </span>
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
          <span className="mr-[-20px] font-bold">{roomInfo?.price}원</span>
        </div>
      </div>
    </div>
  );
};

const ReservationPerson = ({ name, phoneNumber, handleReservationPerson }) => {
  return (
    <div className="tracking-[-0.5px]">
      <EssentialText title={"예약자 정보"} />
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
        <button className="flex items-center gap-[7px] text-[14px]">
          <span className="font-bold text-[#999999]">{`사용 가능 쿠폰 ${couponCount}장`}</span>
          <Image
            src={"/assets/icon/ic_r_arrow_gray_12px.png"}
            alt="r_arrow"
            width={6}
            height={6}
          ></Image>
        </button>
      </div>
      <div className="mt-[15px] flex justify-between">
        <div className="flex items-center gap-[7px]">
          <span className="text-[14px]">포인트</span>
          <span className="text-[10px] font-bold text-[#999999]">
            0P 사용가능
          </span>
        </div>
        <div className="flex items-center gap-[7px]">
          <span className="text-[14px] font-bold text-[#999999]">-0P</span>
          <button className="flex items-center rounded-[6px] bg-[#E5E5E5] px-[5px] py-[4px]">
            <span className="text-[10px] font-bold text-[#999999]">
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

const DiscountAndPaymentInfo = ({ totalPrice }) => {
  return (
    <div>
      <TitleText title={"할인 및 결제 정보"} />
      <div className="mt-[15px] flex flex-col">
        <div className="mb-[20px] flex justify-between tracking-[-0.8px]">
          <span className="text-[14px]">결제 금액</span>
          <span className="text-[14px] font-bold">{totalPrice}원</span>
        </div>
      </div>
      <div className="flex justify-between tracking-[-0.8px]">
        <span className="text-[14px]">할인 금액</span>
        <span className="text-[14px] font-bold">0원</span>
      </div>
      <div>
        <hr className="my-[15px]"></hr>
      </div>
      <div className="flex justify-between tracking-[-0.8px]">
        <span className="text-[14px]">총 결제금액</span>
        <span className="text-[14px] font-bold">{totalPrice}원</span>
      </div>
    </div>
  );
};

const PaymentSelect = ({ setPaymentType }) => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const paymentTypes = [
    {
      id: "creditCard",
      imageUrl: "/assets/icon/ic_pay_card_tablet.png",
      imageWidth: 45,
      imageHeight: 30,
      text: "신용카드",
    },
    {
      id: "accountTransfer",
      imageUrl: "/assets/icon/ic_pay_account_tablet.png",
      imageWidth: 39,
      imageHeight: 28,
      text: "실시간 계좌이체",
    },
    {
      id: "kakaoPay",
      imageUrl: "/assets/icon/ic_pay_kakaopay_tablet.png",
      imageWidth: 45,
      imageHeight: 30,
      text: "카카오페이",
    },
  ];

  const handlePaymentSelect = (id) => {
    if (selectedPayment === id) {
      setSelectedPayment("");
      setPaymentType("");
    } else {
      setSelectedPayment(id);
      setPaymentType(id);
    }
  };

  return (
    <div>
      <TitleText title={"결제 수단 선택"} />
      <div className="mt-[12px] flex gap-[4px]">
        {paymentTypes.map((type) => (
          <PaymentType
            key={type.id}
            imageUrl={type.imageUrl}
            imageWidth={type.imageWidth}
            imageHeight={type.imageHeight}
            text={type.text}
            handleOnClick={() => handlePaymentSelect(type.id)}
            isSelected={selectedPayment === type.id}
          />
        ))}
      </div>
    </div>
  );
};

const PaymentType = ({
  imageUrl,
  imageWidth,
  imageHeight,
  text,
  handleOnClick,
  isSelected,
}) => {
  return (
    <button className="relative tracking-[-0.8px]" onClick={handleOnClick}>
      <Image
        src={
          isSelected
            ? "/assets/icon/Rectangle 25.png"
            : "/assets/icon/Rectangle_400.png"
        }
        alt="Rectangle"
        width={110}
        height={110}
      />
      <Image
        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-75%]"
        src={imageUrl}
        alt={text}
        width={imageWidth}
        height={imageHeight}
      />
      <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[60%] whitespace-nowrap text-[12px] font-bold text-[#8728FF]">
        {text}
      </span>
    </button>
  );
};

const RequiredTerms = ({ totaltTerms, setTotalTerms }) => {
  const [firstTerms, setFirstTerms] = useState(false);
  const [secondTerms, setSecondTerms] = useState(false);

  const handleTotallyAgree = () => {
    if (!totaltTerms) {
      setFirstTerms(true);
      setSecondTerms(true);
    } else {
      setFirstTerms(false);
      setSecondTerms(false);
    }
    setTotalTerms((prev) => !prev);
  };

  const handleUseOfInfomation = () => {
    if (firstTerms) setTotalTerms(false);
    setFirstTerms((prev) => !prev);
  };

  const handleThirdParty = () => {
    if (secondTerms) setTotalTerms(false);
    setSecondTerms((prev) => !prev);
  };

  useEffect(() => {
    if (firstTerms && secondTerms) setTotalTerms(true);
  }, [firstTerms, secondTerms]);

  return (
    <div className="mt-[30px] flex flex-col gap-[10px]">
      <div className="mb-[5px] flex items-center gap-[11px]">
        <button onClick={handleTotallyAgree}>
          <Image
            src={
              totaltTerms
                ? "/assets/icon/ic_squarecheck_p.png"
                : "/assets/icon/ic_squarecheck_g.png"
            }
            alt="ic_squarecheck_g"
            width={20}
            height={20}
          ></Image>
        </button>
        <span className="text-[14px] font-bold tracking-[-0.5px]">
          필수 약관 전체 동의
        </span>
      </div>
      <div className="ml-[3px] flex items-center gap-[14px]">
        <button onClick={handleUseOfInfomation}>
          <Image
            src={
              firstTerms
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
      <div className="ml-[3px] flex items-center gap-[14px]">
        <button onClick={handleThirdParty}>
          <Image
            src={
              secondTerms
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
    <div className="mt-[10px] rounded-[7px] bg-[#F6F6F6] px-[13px] py-[16px]">
      <span className="text-[12px] leading-[1] tracking-[-0.8px] text-[#666666]">
        {notificationText}
      </span>
    </div>
  );
};

const PaymentButton = ({ handlePayment, isPayment }) => {
  return (
    <div>
      <button
        className={`mb-[20px] mt-[50px] h-[50px] w-full rounded-[5px] ${isPayment ? "bg-[#8782FF]" : "bg-[#B2B2B2]"}`}
        onClick={handlePayment}
        disabled={!isPayment}
      >
        <span className="font-bold tracking-[-0.5px] text-white">
          225,000원 결제하기
        </span>
      </button>
    </div>
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
  const [reservationName, setReservationName] = useState(name);
  const [reservationPhoneNumber, setReservationPhoneNumber] =
    useState(phoneNumber);

  const handleFirstFocus = () => setIsFirstFocused(true);
  const handleFirstBlur = () => setIsFirstFocused(false);

  const handleSecondFocus = () => setIsSecondFocused(true);
  const handleSecondBlur = () => setIsSecondFocused(false);

  const handleClearName = () => {
    setReservationName("");
  };

  const handleClearPhoneNumber = () => {
    setReservationPhoneNumber("");
  };

  // 초성만 체크하는 함수
  const isHangulInitial = (str) => {
    const regex = /^[ㄱ-ㅎ]+$/;
    return regex.test(str);
  };

  const handleComplete = () => {
    // 이름 검사 (한 글자 이하 또는 초성인 경우)
    if (reservationName.length < 2 || isHangulInitial(reservationName)) {
      alert("이름을 올바르게 입력해주세요.");
      return;
    }

    // 전화번호 검사
    if (reservationPhoneNumber.length < 12) {
      alert("전화번호를 올바르게 입력해주세요.");
      return;
    }

    setName(reservationName);
    setPhoneNumber(reservationPhoneNumber);
    handleReservationPerson();
  };

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

    setReservationPhoneNumber(formattedText);
  };

  return (
    <div className="mt-[20px] tracking-[-0.5px]">
      <div>
        <span className="text-[14px]">예약자 이름</span>
      </div>
      <div className="relative mt-[10px]">
        <input
          value={reservationName}
          onChange={(e) => setReservationName(e.currentTarget.value)}
          onFocus={handleFirstFocus}
          onBlur={handleFirstBlur}
          className={`h-[45px] w-[320px] rounded-[7px] border-[2px] text-[14px] ${isFirstFocused ? "border-[#8728FF] focus:outline-none" : "border-[#E5E5E5]"} px-[15px]`}
        />
        <button onClick={handleClearName}>
          <Image
            src={
              isFirstFocused
                ? "/assets/icon/ic_search_delete_p.png"
                : "/assets/icon/ic_search_delete.png"
            }
            alt="ic_search_delete"
            width={15}
            height={12}
            className="absolute right-0 top-1/2 mr-[18px] -translate-y-1/2 transform"
          ></Image>
        </button>
      </div>
      <div className="mt-[14px]">
        <span className="text-[14px]">휴대폰 번호</span>
      </div>
      <div className="relative mt-[10px]">
        <input
          value={reservationPhoneNumber}
          onChange={(e) => handlePhoneChange(e)}
          onFocus={handleSecondFocus}
          onBlur={handleSecondBlur}
          className={`h-[45px] w-[320px] rounded-[7px] border-[2px] text-[14px] ${isSecondFocused ? "border-[#8728FF] focus:outline-none" : "border-[#E5E5E5]"} px-[15px]`}
        />
        <button onClick={handleClearPhoneNumber}>
          <Image
            src={
              isSecondFocused
                ? "/assets/icon/ic_search_delete_p.png"
                : "/assets/icon/ic_search_delete.png"
            }
            alt="ic_search_delete"
            width={15}
            height={12}
            className="absolute right-0 top-1/2 mr-[18px] -translate-y-1/2 transform"
          ></Image>
        </button>
      </div>
      <div>
        <button
          className="fixed bottom-0 left-1/2 my-4 h-[50px] w-[320px] -translate-x-1/2 transform rounded-[5px] bg-[#8728FF]"
          onClick={handleComplete}
        >
          <span className="text-white">설정완료</span>
        </button>
      </div>
    </div>
  );
};

const OnReservationPersonTitle = ({ handleReservationPerson }) => {
  const handleBackIcon = () => {
    handleReservationPerson();
  };

  return (
    <div className="relative mt-[58px] flex justify-between">
      <div className="flex w-1/5 items-center">
        <button className="ml-[8px] h-[19px]" onClick={handleBackIcon}>
          <Image
            src={blackBackIcon}
            alt="blackBackIcon"
            width={9}
            height={19}
          />
        </button>
      </div>
      <div className="font-semibold">
        <span className="text-[16px] tracking-[-0.8px]">예약자 정보</span>
      </div>
      <div className="flex w-1/5 items-center justify-end"></div>
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

const EssentialText = ({ title }) => {
  return (
    <>
      <div className="tracking-[-0.8px]">
        <span className="text-[14px] font-bold">{title}</span>
        <span className="text-[14px] font-bold text-[#D53560]">*</span>
      </div>
    </>
  );
};
