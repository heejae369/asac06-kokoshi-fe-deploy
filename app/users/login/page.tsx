"use client";

import appleLogo from "@/assets/icon/ic_login_apple.png";
import naverLogo from "@/assets/icon/ic_login_naver.png";
import kakaoLogo from "@/assets/icon/ic_login_kakao.png";
import or from "@/assets/or.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const samePassword = false;
  const notSignUp = true;

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <div className="mt-[100px]">
          <h2 className="text-[40px] font-bold text-[#8728FF]">로그인</h2>
        </div>
        <div className="mt-9 flex flex-col gap-[5px]">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm bg-[#F4F4F4]"
            type="email"
            placeholder="이메일"
          />
          <Input
            onChange={(e) => setPw(e.target.value)}
            className="rounded-sm bg-[#F4F4F4]"
            type="pw"
            placeholder="비밀번호"
          />
        </div>
        <div className="py-2 text-sm text-[#FF0045]">
          {samePassword && "패스워드가 일치하지 않습니다."}
          {notSignUp && "등록되지 않은 회원입니다."}
        </div>
        <div>
          <Button
            className="h-[50px] w-full rounded-sm text-[1rem]"
            variant={"point"}
          >
            로그인
          </Button>
        </div>
        <div className="flex justify-center gap-[10px] py-3 text-sm font-normal text-[#8728FF]">
          <Link href={"/users/findId"}>아이디 찾기</Link>
          <span>|</span>
          <Link href={"/users/findPw"}>비밀번호 찾기</Link>
          <span>|</span>
          <Link href={"/users/singUp"}>회원가입</Link>
        </div>
        <div className="py-6">
          <img src={or.src} alt="seprator" />
        </div>
        <div className="flex justify-center gap-[10px]">
          <img src={appleLogo.src} alt="apple social login" />
          <img src={naverLogo.src} alt="naver social login" />
          <img src={kakaoLogo.src} alt="kakao social login" />
        </div>
      </div>
    </div>
  );
}
