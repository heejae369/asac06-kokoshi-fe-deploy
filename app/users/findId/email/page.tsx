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
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="w-[360px] bg-white relative">
        <div className="absolute w-full">
          <LoginHeader titleText={"아이디 찾기"} />
          <div className="absolute left-5 top-[143px] w-[222px] text-sm font-normal leading-6 text-gray-900">
            회원님이 가입하신 이력입니다.
          </div>
          <div className="relative w-[320px] left-5 top-[200px]">
            <div className="py-[15px] px-[20px] w-[320px] h-[78px] bg-gray-100 rounded-lg">
              <div className="mb-1 font-semibold leading-[23px] text-gray-900">
                {formattedEmail}
              </div>
              <div className="text-xs font-normal leading-[17px] text-gray-500">
                {created_at}
              </div>
            </div>
          </div>
          <button
            className="absolute w-[156px] h-[50px] left-5 top-[660px] bg-gray-400 rounded-md text-white font-semibold leading-[23px]"
            onClick={() => pageRouter("/users/findPw")}
          >
            비밀번호 찾기
          </button>
          <button
            className="absolute w-[156px] h-[50px] left-[184px] top-[660px] bg-purple-600 rounded-md text-white font-semibold leading-[23px]"
            onClick={() => pageRouter("/users/login")}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
