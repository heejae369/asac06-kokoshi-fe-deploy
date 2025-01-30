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
import { useCart } from "@/feature/cart/CartCount";

interface CartItemData {
  id: number;
  type: string;
  name: string;
  reservationStart: string; // 예약 시작 날짜 (백엔드 Date 형식)
  reservationEnd: string; // 예약 종료 날짜 (백엔드 Date 형식)
  capacity: number; // 기준 인원
  maxCapacity: number; // 최대 인원
  checkIn: string; // 체크인 시간
  checkOut: string; // 체크아웃 시간
  specialPrice?: number; // 숫자 형식의 특가 금액
  stock: number; // 재고 수량
  price: number; // 가격
  isChecked: boolean; // 체크 여부
}

export default function CartPage() {
  const [cartId, setCartId] = useState<number | null>(null); // 카트 ID 저장
  const [cartItems, setCartItems] = useState<CartItemData[]>([]); // 초기 데이터 비움
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 상태
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]); // 선택된 아이템 ID

  const router = useRouter();
  const { decreaseCart } = useCart();

  const userId = 1; // 세션이나 로컬스토리에 저장된 유저의 구분값

  // Spring에서 데이터 가져오기
  useEffect(() => {
    let isFlag = true;
    const fetchCartItems = async () => {
      try {
        const requestData = {
          userId: userId, // 요청 바디의 userId (필요하다면 제거 가능)
        };

        const response = await axios.post(
          "http://localhost:8080/api/cart/getCart",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              userId: userId.toString(), // 헤더에 userId 추가, 추후 JWT 활용
            },
          }
        );

        if (isFlag) {
          const cartData = response.data;
          const cartId = cartData.cartId;
          setCartId(cartId);
          const transformedCartItems = cartData.cartItemList.map(
            (item: any) => ({
              id: item.id,
              type: item.type,
              name: item.name,
              roomName: item.roomName,
              reservationStart: item.reservationStart,
              reservationEnd: item.reservationEnd,
              capacity: item.capacity,
              maxCapacity: item.maxCapacity,
              checkIn: item.checkIn,
              checkOut: item.checkOut,
              specialPrice: item.specialPrice,
              stock: item.stock,
              price: item.price,
              isChecked: item.checked,
            })
          );

          setCartItems(transformedCartItems);
          setLoading(false);
        }
      } catch (error: any) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
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
    setSelectedItemIds(idsToDelete);
    setIsModalOpen(true); // 모달 열기
  };

  const confirmDelete = async () => {
    if (!cartId) {
      console.error("Cart ID is not available");
      return;
    }
    try {
      await Promise.all(
        selectedItemIds.map((id) =>
          axios.post(
            "http://localhost:8080/api/cart/deleteCartItem",
            { cartId: cartId, cartItemId: id, userId },
            {
              headers: {
                "Content-Type": "application/json",
                userId: userId.toString(),
              },
            }
          )
        )
      );

      // 삭제 후 로컬 상태 업데이트
      setCartItems((prev) =>
        prev.filter((item) => !selectedItemIds.includes(item.id))
      );
      // 장바구니 개수 감소
      decreaseCart();
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const totalAmount = cartItems
    .filter((item) => item.isChecked)
    .reduce((sum, item) => sum + item.price, 0);

  const totalDiscount = cartItems
    .filter((item) => item.isChecked && item.specialPrice)
    .reduce((sum, item) => sum + (item.specialPrice || 0), 0);

  const expectedAmount = totalAmount - totalDiscount;

  const handleReserve = () => {
    const reservedItems = cartItems.filter((item) => item.isChecked); // 선택된 아이템만
    if (reservedItems.length === 0) {
      alert("예약할 아이템을 선택해주세요.");
      return;
    }
    const reservedItemsString = encodeURIComponent(
      JSON.stringify(reservedItems)
    );

    // 페이지 이동 시 쿼리 문자열에 데이터 포함
    //router.push(`/reservation?reservedItems=${reservedItemsString}`);

    // router.push("/users/signup/gender");
  };

  const title = "장바구니";

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex w-full flex-col items-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
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
          <CustomButton isActive={totalAmount > 0} onClick={handleReserve}>
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
