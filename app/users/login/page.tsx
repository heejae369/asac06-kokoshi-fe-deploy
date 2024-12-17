"use client";
import "@/app/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [hidePw, setHidePw] = useState("text");
  return (
    <div>
      <div className="flex h-screen w-full justify-center bg-gray-100">
        <div className="relative w-[360px] bg-white">
          <div className="login">로그인</div>
          <Input className="frame4" placeholder="이메일" />
          <div className="frame5">
            <Input className="password" placeholder="비밀번호" type={hidePw} />
            {!(hidePw == "password") && (
              <Button onClick={() => setHidePw("password")}>
                <img
                  className="ic_pw_hide"
                  src="/assets/ic_pw_hide.png"
                  alt="Ex Img"
                />
              </Button>
            )}
            {hidePw == "password" && (
              <Button onClick={() => setHidePw("text")}>
                <img
                  className="ic_pw_hide"
                  src="/assets/ic_pw_see.png"
                  alt="Ex Img"
                />
              </Button>
            )}
          </div>
          <div className="frame6 bg-[#e9d8ff]">
            <div className="login_innerText text-[#7c2eff]">로그인</div>
          </div>
          <Button
            className="frame6 bg-[#8728FF]"
            onClick={() => (window.location.href = "#")}
          >
            <div className="login_innerText text-[#FFFFFF]">로그인</div>
          </Button>
          <a className="find_id_pw_regi left-[64px] w-[71px]" href="#">
            아이디 찾기
          </a>
          <div className="vector11 left-[139px]" />
          <a className="find_id_pw_regi left-[150px] w-[85px]" href="#">
            비밀번호 찾기
          </a>
          <div className="vector11 left-[236px]" />
          <a className="find_id_pw_regi left-[246px] w-[54px]" href="#">
            회원가입
          </a>
          <div className="vector9" />
          <div className="or">혹은</div>
          <div className="vector10" />
          <Button
            className="social_login left-[95px] rounded-full bg-inherit px-0"
            onClick={() => console.log("Fetch Naver API")}
          >
            <img src="/assets/ic_login_naver.png" alt="Ex Img" />
          </Button>
          <Button
            className="social_login left-[155px] rounded-full bg-inherit px-0"
            onClick={() => console.log("Fetch Kakao API")}
          >
            <img src="/assets/ic_login_kakao.png" alt="Ex Img" />
          </Button>
          <Button
            className="social_login left-[215px] rounded-full bg-inherit px-0"
            onClick={() => console.log("Fetch Apple API")}
          >
            <img src="/assets/ic_login_apple.png" alt="Ex Img" />
          </Button>
        </div>
      </div>
    </div>
  );
}
