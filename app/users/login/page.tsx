"use client";
import "@/app/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AutoRerender from "@/feature/users/AutoRerender";
import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const [hidePw, setHidePw] = useState("text");
  const [rerender, setRerender] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    if (rerender) {
      setRerender(false);
    }
  }, [rerender]);
  return (
    <div>
      <div className="flex h-screen w-full justify-center bg-gray-100">
        <div className="relative w-[360px] bg-white">
          <div className="login">로그인</div>
          <Input
            className="frame4"
            placeholder="이메일"
            onChange={(e) => {
              emailRef.current = e.currentTarget.value;
              AutoRerender({ setRerender });
            }}
          />
          <div className="frame5">
            <Input
              className="password"
              placeholder="비밀번호"
              type={hidePw}
              onChange={(e) => (passwordRef.current = e.currentTarget.value)}
            />
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
          {emailRef.current?.length > 0 && passwordRef.current?.length > 0 && (
            <Button
              className="frame6 bg-[#8728FF]"
              onClick={() =>
                emailRef.current?.length > 0 &&
                (window.location.href = "#login")
              }
            >
              <div className="login_innerText text-[#FFFFFF]">로그인</div>
            </Button>
          )}
          <a className="find_id_pw_regi left-[64px] w-[71px]" href="#id">
            아이디 찾기
          </a>
          <div className="vector11 left-[139px]" />
          <a className="find_id_pw_regi left-[150px] w-[85px]" href="#pw">
            비밀번호 찾기
          </a>
          <div className="vector11 left-[236px]" />
          <a className="find_id_pw_regi left-[246px] w-[54px]" href="#register">
            회원가입
          </a>
          <div className="vector9" />
          <a className="or">혹은</a>
          <div className="vector10" />
          <Button
            className="social_login left-[95px] rounded-full bg-inherit px-0"
            onClick={() =>
              (window.location.href =
                "https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/")
            }
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
          {!(emailRef.current?.length > 0) && (
            <a className="unregistered">등록되지 않은 회원입니다.</a>
          )}
          {emailRef.current?.length > 0 &&
            !(passwordRef.current?.length > 0) && (
              <a className="unregistered">패스워드가 일치하지 않습니다.</a>
            )}
        </div>
      </div>
    </div>
  );
}
