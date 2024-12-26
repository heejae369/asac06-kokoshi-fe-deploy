"use client";

import appleLogo from "@/assets/icon/ic_login_apple.png";
import naverLogo from "@/assets/icon/ic_login_naver.png";
import kakaoLogo from "@/assets/icon/ic_login_kakao.png";
import passwordHide from "@/assets/icon/ic_pw_hide.png";
import passwordShow from "@/assets/icon/ic_pw_see.png";
import or from "@/assets/or.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginPostApi from "@/feature/LoginPostApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  // 비밀번호 숨기기 여부
  const [hidePw, setHidePw] = useState("password");
  const [hidePw, setHidePw] = useState("password");
  // 유효성 확인 문구 표시 여부
  const [showValidation, setShowValidation] = useState(false);

  // 등록된 회원인지 확인(true = 등록된 회원)
  const [signUp, setSignUp] = useState(false);
  // 비밀번호 일치 여부 확인(true = 비밀번호 일치)
  const [samePassword, setSamePassword] = useState(false);

  const router = useRouter();

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        {/* 화면 최상단의 "로그인" 문구 */}
        <div className="mt-[100px]">
          <h2 className="text-[40px] font-bold text-[#8728FF]">로그인</h2>
        </div>
        <div className="mt-9 flex flex-col gap-[5px]">
          {/* 이메일 입력창 */}
          <Input
            value={email}
            onChange={(e) => {
              let emailValue = e.target.value;
              emailValue = emailValue.replace(/\n/g, "");
              setEmail(emailValue.slice(0, 20));
            }}
            className="rounded-sm bg-[#F4F4F4]"
            type="email"
            placeholder="이메일"
          />
          {/* 비밀번호 입력창 */}
          <div className="relative">
            <Input
              value={pw}
              onChange={(e) => {
                let pwValue = e.target.value;
                pwValue = pwValue.replace(/\n/g, "");
                setPw(pwValue.slice(0, 20));
              }}
              className="rounded-sm bg-[#F4F4F4]"
              type={hidePw}
              placeholder="비밀번호"
              autoComplete="new-password"
            />
            {/* 비밀번호 표시하기 버튼 */}
            {hidePw == "password" && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHidePw("text")}
                onClick={() => setHidePw("text")}
              >
                <img src={passwordHide.src} alt="Ex Img" />
              </button>
            )}
            {/* 비밀번호 숨기기 버튼 */}
            {!(hidePw === "password") && (
            {/* 비밀번호 숨기기 버튼 */}
            {!(hidePw === "password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHidePw("password")}
                onClick={() => setHidePw("password")}
              >
                <img src={passwordShow.src} alt="Ex Img" />
              </button>
            )}
          </div>
        </div>
        {/* 이메일, 패스워드 유효성 텍스트 */}
        <div className="py-2 text-sm text-[#FF0045]">
          {showValidation && (
            <>
              {!signUp && "등록되지 않은 회원입니다."}
              {signUp && !samePassword && "패스워드가 일치하지 않습니다."}
            </>
          )}
        </div>
        {/* 로그인 버튼 */}
        <Button
          className="h-[50px] w-full rounded-sm text-[1rem]"
          variant={"point"}
          disabled={email.length < 1 || pw.length < 9}
          onClick={async () =>
            LoginPostApi({
              setShowValidation,
              setSignUp,
              setSamePassword,
              email,
              pw,
              router,
            })
          }
        >
          로그인
        </Button>
        {/* 아이디 찾기 | 비밀번호 찾기 | 회원가입 */}
        <div className="flex justify-center gap-[10px] py-3 text-sm font-normal text-[#8728FF]">
          <Link href={"/users/findId"}>아이디 찾기</Link>
          <span>|</span>
          <Link href={"/users/passwd"}>비밀번호 찾기</Link>
          <span>|</span>
          <Link href={"/users/signup"}>회원가입</Link>
        </div>
        {/* --- 혹은 --- */}
        <div className="py-6">
          <img src={or.src} alt="separator" />
        </div>
        <div className="flex justify-center gap-[10px]">
          {/* 소셜 로그인 버튼 - 네이버 */}
          <Button
            className="rounded-full bg-transparent p-0"
            onClick={() => router.push("#10")}
          >
            <img src={naverLogo.src} alt="naver social login" />
          </Button>
          {/* 소셜 로그인 버튼 - 카카오 */}
          <Button
            className="rounded-full bg-transparent p-0"
            onClick={() => router.push("#08")}
          >
            <img src={kakaoLogo.src} alt="kakao social login" />
          </Button>
          {/* 소셜 로그인 버튼 - 애플 */}
          <Button
            className="rounded-full bg-transparent p-0"
            onClick={() => router.push("#09")}
          >
            <img src={appleLogo.src} alt="apple social login" />
          </Button>
        </div>
      </div>
    </div>
  );
}
