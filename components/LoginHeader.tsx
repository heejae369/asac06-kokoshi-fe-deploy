import React from "react";
import Image from "next/image";

export default function LoginHeader({ titleText }) {
  return (
    <div className="absolute top-[57px] left-[20px] w-[320px] h-[80px]">
      <div className="absolute flex justify-center items-center w-6 h-6">
        <Image src="/images/beforeIcon.png" width={9} height={16} alt="" />
      </div>
      <div className="absolute top-[41px] whitespace-pre-line font-noto-sans font-semibold text-[25px] leading-[36px] tracking-[-0.05em] text-[#8728ff]">
        {titleText}
      </div>
    </div>
  );
}
