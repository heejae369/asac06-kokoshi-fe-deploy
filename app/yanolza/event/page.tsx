"use client";

import MainHeaders from "@/components/MainHeaders";

export default function EventPage() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <MainHeaders title={"이벤트"} backIcon={true} />
        <img
          className="mt-3"
          src="/images/img_home_banner.png"
          alt="img_home_banner"
        />
        <p className="mt-5 text-sm">
          6~8월까지 여름동안 숙박 이벤트가 진행됩니다! 전 지역 대상으로 할인이
          진행되며, SNS에 코코시 계정을 태그하고 숙박 이용 시 다양한 사은품이
          제공됩니다.
          <br />
          <br />
          여름휴가 마지막 기회, 무료숙박으로 특별한 추억 만들어보세요! (*이벤트
          기간 : 23/06/01 ~ 23/08/31)
        </p>
      </div>
    </div>
  );
}
