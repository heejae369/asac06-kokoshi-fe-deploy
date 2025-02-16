"use client";

import splashIllust from "@/assets/img/img_splash_illust.png";
import homeLogo from "@/assets/img/img_home_logo.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("onboading");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <div className="mt-64 flex flex-col items-center justify-center">
          <img
            src={splashIllust.src}
            alt="splash illust"
            className="size-auto"
          />
          <img
            src={homeLogo.src}
            alt="home logo"
            className="mt-7 h-auto w-48"
          />
          <p className="mt-5 text-center text-[18px] text-[#8728FF]">
            <b>내 취향의 숙소</b> 찾기,
            <br />
            코코시.
          </p>
        </div>
      </div>
    </div>
  );
}
