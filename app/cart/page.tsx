"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "@/components/CartItem";
import TopBar from "@/components/TopBar";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/BackAndTitleAndButton";
import Modal from "@/components/ui/public/modal";
import { useRouter } from "next/navigation";
import MainHeaders from "@/components/MainHeaders";
import { authFetch } from "@/lib/utils";

interface CartItemData {
  roomId: number;
  id: number; // cartItemId
  capacity: number; // 기준 인원
  reservationStart: string; // 예약 시작 날짜 (백엔드 Date 형식)
  reservationEnd: string; // 예약 종료 날짜 (백엔드 Date 형식)
  checkIn: string; // 체크인 시간
  checkOut: string; // 체크아웃 시간
  reservationType: string;

  cartId: number;
  thumbnail: string;
  type: string;
  roomName: string;
  maxCapacity: number; // 최대 인원
  specialPrice?: number; // 숫자 형식의 특가 금액
  stock: number; // 재고 수량
  price: number; // 가격
  isChecked: boolean; // 체크 여부
}

export default function CartPage() {
  console.log("CartPage 렌더링 시작"); // 페이지 렌더링 여부 확인

  const [cartId, setCartId] = useState<number | null>(null); // 카트 ID 저장
  const [cartItems, setCartItems] = useState<CartItemData[]>([]); // 초기 데이터 비움
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 상태
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]); // 선택된 아이템 ID
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // const userId = 1; // 세션이나 로컬스토리에 저장된 유저의 구분값

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Spring에서 데이터 가져오기
  useEffect(() => {
    let isFlag = true;
    const fetchCartItems = async () => {
      try {
        const option = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        };
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/cart/getCart`,
          option
        );

        if (isFlag) {
          const cartData = await response.json();
          console.log("[getCart API]reponse.data is : ", cartData);
          console.log(
            "[getCart API]cartItemList.data is : ",
            cartData.cartItemList
          );

          const cartId = cartData.cartId;
          setCartId(cartId);
          const transformedCartItems = cartData.cartItemList.map(
            (item: any) => ({
              id: item.id,
              type: item.type,
              name: item.name,
              // 백엔드에서 확인
              roomId: item.roomId,
              roomName: item.roomName,
              reservationStart: item.reservationStart,
              reservationEnd: item.reservationEnd,
              capacity: item.capacity,
              maxCapacity: item.maxCapacity,
              checkIn: item.checkIn,
              checkOut: item.checkOut,
              // specialPrice: item.specialPrice,
              stock: item.stock,
              price: item.price,
              reservationType: item.reservationType,
              isChecked: item.checked,
            })
          );

          // 백엔드에서 보내는 데이터 및 받는 데이터 형식 맞춰야함
          setCartItems(transformedCartItems);
          setLoading(false);
        }
      } catch (error: any) {
        // setError("데이터를 불러오는 중 오류가 발생했습니다.", error);
        setLoading(false);
      }
    };

    fetchCartItems();
    return () => {
      isFlag = false; // 컴포넌트가 언마운트된 경우 API 호출 차단
    };
  }, []);

  const toggleItemCheck = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
    console.log("선택된 아이템 IDs:", selectedItemIds);
  };

  const isAllChecked = cartItems.every((item) => item.isChecked);
  const toggleAllCheck = () => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isChecked: !isAllChecked }))
    );
  };

  const handleDeleteConfirmation = () => {
    // 체크된 아이템 ID 배열 생성
    const idsToDelete = cartItems
      .filter((item) => item.isChecked)
      .map((item) => item.id);

    console.log(idsToDelete.toString);
    setSelectedItemIds(idsToDelete);
    setIsModalOpen(true); // 모달 열기
  };

  const confirmDelete = async () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ cartId: cartId, cartItems: selectedItemIds }), //cartId: cartId, cartItemId: id /*userId 삭제*/ },
    };
    // 카트아이디 없으면 패스
    if (!cartId) {
      console.error("Cart ID is not available");
      return;
    }
    try {
      authFetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/cart/deleteCartItem`,
        option
      );
      // 삭제 후 로컬 상태 업데이트
      setCartItems((prev) =>
        prev.filter((item) => !selectedItemIds.includes(item.id))
      );
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // YYYY-MM-DD 형식의 문자열을 로컬 Date 객체로 변환하는 함수
  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month는 0부터 시작하므로 month - 1
  };
  const handleNavigateToReservation = () => {
    console.log("[예약하기 버튼 클릭] - handleNavigateToReservation 실행");

    // 선택된 아이템 필터링
    const selectedItems = cartItems.filter((item) => item.isChecked);

    if (selectedItems.length === 0) {
      alert("선택된 아이템이 없습니다.");
      return;
    }

    // 오늘 날짜를 00:00:00으로 설정 (시간 무시)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 정보를 00:00:00으로 맞춤

    const invalidItems = selectedItems.filter((item) => {
      const startDate = parseDate(item.reservationStart);
      console.log("예약 시작일:", item.reservationStart, "->", startDate);
      return startDate < today;
    });

    if (invalidItems.length > 0) {
      alert("오늘 이전 날짜의 항목은 예약할 수 없습니다.");
      return;
    }

    // 선택된 아이템 데이터 가공 및 예약 페이지 이동
    const selectedIds = selectedItems.map((item) => item.id);
    setSelectedItemIds(selectedIds);
    console.log("선택된 아이템:", selectedItems);
    console.log("선택된 아이템 IDs:", selectedIds);

    const formattedData = selectedItems.map((item) => ({
      roomId: item.roomId,
      cartItems: item.id,
      startDate: item.reservationStart,
      endDate: item.reservationEnd,
      capacity: item.capacity,
      startTime: item.checkIn.substring(0, 5),
      endTime: item.checkOut.substring(0, 5),
      reservationType: item.reservationType,
    }));

    const params = encodeURIComponent(JSON.stringify(formattedData));
    router.push(`/reservation?data=${params}`);
  };

  const getDayOfWeek = (dateString: string): string => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const totalAmount = cartItems
    .filter((item) => item.isChecked)
    .reduce((sum, item) => sum + item.price, 0);

  const totalDiscount = cartItems
    .filter((item) => item.isChecked && item.specialPrice)
    .reduce((sum, item) => sum + (item.specialPrice || 0), 0);

  const expectedAmount = totalAmount - totalDiscount;

  const title = "장바구니";

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100">
      <div className="min-h-screen w-[360px] bg-white px-5">
        <MainHeaders title={title} backIcon={true} homeIcon={true} />
        <TopBar
          allChecked={isAllChecked}
          onToggleAll={toggleAllCheck}
          onDeleteSelected={handleDeleteConfirmation} // 선택삭제 버튼 클릭 시 event
        />
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <>
                <CartItem key={item.id} {...item} onCheck={toggleItemCheck} />
                {index < cartItems.length - 1 && <hr />}
              </>
            ))
          ) : (
            <p className="text-center text-gray-500">
              장바구니가 비어 있습니다.
            </p>
          )}
        </div>
        <hr className="w-[360px] ml-[-20px] border-[3.5px]"></hr>
        <div className="py-4 flex flex-col gap-[20px]">
          <h2 className="text-sm font-semibold text-gray-900 mb-[5px]">
            할인 및 결제 정보
          </h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>결제 금액</span>
            <span className="font-semibold text-gray-900">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>할인 금액</span>
            <span className="font-semibold text-red-500">
              {totalDiscount.toLocaleString()}원
            </span>
          </div>
          <div className=" h-px w-full bg-gray-200"></div>
          <div className=" flex justify-between text-sm text-gray-600">
            <span>결제 예상 금액</span>
            <span className="font-semibold text-gray-900">
              {expectedAmount.toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              총 {cartItems.length}건
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">결제 예상 금액</span>
              <span className="text-sm font-bold text-gray-900">
                {expectedAmount.toLocaleString()}원
              </span>
            </div>
          </div>
          <CustomButton
            isActive={totalAmount > 0}
            onClick={handleNavigateToReservation /*handleReserve*/}
          >
            예약하기
          </CustomButton>
        </div>
      </div>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        message="해당 장바구니 품목을 삭제하시겠습니까?"
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
