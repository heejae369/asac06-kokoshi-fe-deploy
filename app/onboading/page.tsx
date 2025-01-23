"use client";

import onboadingIllust from "@/assets/img/img_onboading_illust.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-[#8728FF] px-5">
        <div className="mt-28 flex flex-col items-center justify-center">
          <div
            style={{ fontFamily: `Poller One` }}
            className="scale-x-125 text-4xl font-extrabold text-white"
          >
            Kokoshi
          </div>
          <p className="mb-9 mt-4 text-center text-[22px] font-semibold text-white">
            다양한 숙소,
            <br />
            코코시에서 만나보세요!
          </p>
          <img
            src={onboadingIllust.src}
            alt="splash illust"
            className="size-auto"
          />
          <p className="mt-9 text-center text-[18px] text-white">
            숙박 검색부터 예약까지!
            <br />
            코코시에서 다양한 숙소를 만나보세요.
          </p>
          <Button
            className="mt-20 h-[50px] w-[320px] rounded-sm bg-white text-[1rem] text-[#A55EFF] hover:bg-white"
            onClick={() => router.push("users/login")}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
