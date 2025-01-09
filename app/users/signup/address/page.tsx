"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackAndTitle from "@/components/BackAndTitle";
import { Button } from "@/components/ui/button";

export default function AddressPage() {
  const [address, setAddress] = useState(""); // 주소 상태
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 상태
  const [isActive, setIsActive] = useState(false); // 다음 버튼 활성화 상태
  const detailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 카카오 주소 API 스크립트를 중복으로 추가하지 않음
    if (!window.daum?.Postcode) {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => console.log("Daum Postcode API loaded");
      document.body.appendChild(script);
    }
  }, []);

  // 카카오 주소 API 호출
  const openAddressSearch = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address); // 선택된 주소를 상태에 저장
          detailInputRef.current?.focus(); // 상세 주소 입력창에 포커스
        },
      }).open();
    }
  };

  // 상세 주소 입력 처리
  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setDetailAddress(value);
      setIsActive(value.length > 0);
    }
  };

  const handleSubmit = () => {
    console.log(`주소: ${address}, 상세 주소: ${detailAddress}`);
    router.push("/users/signup/gender");
    localStorage.setItem("userAddress", address + detailAddress);
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        {/* 카카오 주소 API 스크립트 */}
        {/* <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="beforeInteractive"
        /> */}

        <div className="flex w-full flex-col gap-2">
          <BackAndTitle url={"birthday"} title={"주소를 입력해주세요."} />

          {/* 주소 입력 */}
          <div className="flex flex-row">
            {/* 주소 입력 필드 */}
            <input
              type="text"
              placeholder="지번, 도로명 주소"
              value={address}
              readOnly
              className="h-12 w-56 flex-1 rounded bg-[#F6F6F6] p-3 text-[#666666] placeholder:text-gray-500"
            />

            {/* 주소찾기 버튼 */}
            <button
              type="button"
              className="ml-2 rounded bg-[#8728FF] p-2 text-white transition-colors hover:bg-[#751FD1]"
              onClick={openAddressSearch}
            >
              주소찾기
            </button>
          </div>

          {/* 상세 주소 입력 */}
          <input
            type="text"
            ref={detailInputRef}
            placeholder="상세 주소 입력"
            value={detailAddress}
            onChange={handleDetailAddress}
            className="h-12 rounded bg-[#F6F6F6] p-3 text-[#666666] placeholder:text-gray-500"
          />

          {/* 다음 버튼 */}
          <Button
            type="button"
            className={"mt-10 h-12 w-full rounded disabled:bg-gray-400"}
            onClick={handleSubmit}
            disabled={!isActive}
            variant={"point"}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
