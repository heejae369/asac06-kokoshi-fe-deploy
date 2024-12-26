"use clinet";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginHeader({ titleText, prevUrl }) {
  const router = useRouter();

  const prevButton = () => {
    router.push(prevUrl);
  };
  return (
    // <div className="absolute top-[57px] left-[20px] w-[320px] h-[80px]">
    <div className="relative left-5 top-[57px] w-[320px]">
      <button
        className="flex justify-center items-center w-6 h-6"
        onClick={prevButton}
      >
        <Image
          src="/images/beforeIcon.png"
          width={9}
          height={16}
          alt="prevButtonImage"
        />
      </button>
      <div className="relative top-[16px] whitespace-pre-line font-noto-sans font-semibold text-[25px] leading-[36px] tracking-[-0.05em] text-[#8728ff]">
        {titleText}
      </div>
    </div>
  );
}
