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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [hidePw, setHidePw] = useState("text");
  const [showValidation, setShowValidation] = useState(false);

  const [samePassword, setSamePassword] = useState(false);
  const [notSignUp, setNotSignUp] = useState(true);

  const router = useRouter();

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <div className="mt-[100px]">
          <h2 className="text-[40px] font-bold text-[#8728FF]">로그인</h2>
        </div>
        <div className="mt-9 flex flex-col gap-[5px]">
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
            />
            {!(hidePw == "password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHidePw("password")}
              >
                <img src={passwordHide.src} alt="Ex Img" />
              </button>
            )}
            {hidePw == "password" && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHidePw("text")}
              >
                <img src={passwordShow.src} alt="Ex Img" />
              </button>
            )}
          </div>
        </div>
        <div className="py-2 text-sm text-[#FF0045]">
          {showValidation && (
            <>
              {notSignUp && "등록되지 않은 회원입니다."}
              {!notSignUp && !samePassword && "패스워드가 일치하지 않습니다."}
            </>
          )}
        </div>
        <div>
          <Button
            className="h-[50px] w-full rounded-sm text-[1rem]"
            variant={"point"}
            disabled={email.length < 1 || pw.length < 9}
            onClick={() => {
              setShowValidation(true);
              // # Fetch API
              // if (LoginResponse.status == 0) router.push("#54");
              // else if (LoginResponse.status == 1) {
              //   setNotSignUp(true);
              //   setSamePassword(false);
              // } else if (LoginResponse.status == 2) {
              //   setNotSignUp(false);
              //   setSamePassword(false);
              // }
            }}
          >
            로그인
          </Button>
        </div>
        <div className="flex justify-center gap-[10px] py-3 text-sm font-normal text-[#8728FF]">
          <Link href={"/users/findId"}>아이디 찾기</Link>
          <span>|</span>
          <Link href={"/users/findPw"}>비밀번호 찾기</Link>
          <span>|</span>
          <Link href={"/users/signUp"}>회원가입</Link>
        </div>
        <div className="py-6">
          <img src={or.src} alt="seprator" />
        </div>
        <div className="flex justify-center gap-[10px]">
          <Button
            className="rounded-full bg-transparent p-0"
            onClick={() => router.push("#10")}
          >
            <img src={naverLogo.src} alt="naver social login" />
          </Button>
          <Button
            className="rounded-full bg-transparent p-0"
            onClick={() => router.push("#08")}
          >
            <img src={kakaoLogo.src} alt="kakao social login" />
          </Button>
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
