"use client";

import "@/app/index.css";
import LoginHeader from "@/components/LoginHeader";
import { useRouter } from "next/navigation";

export default function FindIdEmail() {
  const email = "koko1234@email.com";

  const router = useRouter();

  const pageRouter = (url) => {
    router.push(url);
  };

  const formatEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const visiblePart = localPart.slice(0, 4);
    const maskedPart = "*".repeat(localPart.length - 4);

    return `${visiblePart}${maskedPart}@${domain}`;
  };

  const formattedEmail = formatEmail(email);

  const created_at = "2024.09.24" + " 가입";

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans tracking-negative">
      <div className="w-[360px] bg-white relative">
        {/* <div className="absolute w-full"> */}
        <LoginHeader titleText={"아이디 찾기"} prevUrl={"/users/findId"} />
        <div className="relative left-5 top-[83px]">
          회원님이 가입하신 아이디 이력입니다.
        </div>
        <div className="relative w-[320px] left-5 top-[109px]">
          <div className="py-[15px] px-[20px] w-[320px] h-[78px] bg-gray-100 rounded-lg">
            <div className="mb-1 font-semibold leading-[23px] text-gray-900">
              {formattedEmail}
            </div>
            <div className="text-xs font-normal leading-[17px] text-gray-500">
              {created_at}
            </div>
          </div>
        </div>

        <div className="flex w-[320px] left-5 absolute bottom-12 gap-2">
          <button
            className="w-[156px] h-[50px] bg-gray-400 rounded-md text-white font-semibold leading-[23px]"
            // onClick={() => pageRouter("/users/findPw")}
          >
            비밀번호 찾기
          </button>
          <button
            className="w-[156px] h-[50px] bg-purple-600 rounded-md text-white font-semibold leading-[23px]"
            onClick={() => pageRouter("/users/login")}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
