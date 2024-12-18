"use client";
import "@/styles/usersLogin.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AutoRerender from "@/feature/users/AutoRerender";
import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const [hidePw, setHidePw] = useState("text");
  const [rerender, setRerender] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const timerRef = useRef(null);
  // 디바운싱용 useEffect
  useEffect(() => {
    if (rerender) {
      setRerender(false);
    }
  }, [rerender]);
  return (
    <div>
      <div className="flex h-screen w-full justify-center bg-gray-100">
        <div className="relative w-[360px] bg-white">
          {/* 화면 최상단의 "로그인" */}
          <div className="login">로그인</div>
          {/* 이메일 입력창 */}
          <Input
            className="frame4"
            placeholder="이메일"
            onChange={(e) => {
              emailRef.current = e.currentTarget.value;
              AutoRerender({ timerRef, setRerender });
            }}
          />
          {/* 비밀번호 입력창 */}
          <div className="frame5">
            <Input
              className="password"
              placeholder="비밀번호"
              type={hidePw}
              onChange={(e) => {
                passwordRef.current = e.currentTarget.value;
                AutoRerender({ timerRef, setRerender });
              }}
            />
            {/* 비밀번호 숨기기 버튼 */}
            {!(hidePw == "password") && (
              <Button onClick={() => setHidePw("password")}>
                <img
                  className="ic_pw_hide"
                  src="/images/ic_pw_hide.png"
                  alt="Ex Img"
                />
              </Button>
            )}
            {/* 비밀번호 표시하기 버튼 */}
            {hidePw == "password" && (
              <Button onClick={() => setHidePw("text")}>
                <img
                  className="ic_pw_hide"
                  src="/images/ic_pw_see.png"
                  alt="Ex Img"
                />
              </Button>
            )}
          </div>
          {/* 비활성화된 로그인 버튼 */}
          <div className="frame6 bg-[#e9d8ff]">
            <div className="login_innerText text-[#7c2eff]">로그인</div>
          </div>
          {/* 활성화된 로그인 버튼 */}
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
          {/* 아이디 찾기 | 비밀번호 찾기 | 회원가입 */}
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
          {/* --- 혹은 --- */}
          <div className="vector9" />
          <a className="or">혹은</a>
          <div className="vector10" />
          {/* 소셜 로그인 버튼 - 네이버 */}
          <Button
            className="social_login left-[95px] rounded-full bg-inherit px-0"
            onClick={() =>
              (window.location.href =
                "https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/")
            }
          >
            <img src="/images/ic_login_naver.png" alt="Ex Img" />
          </Button>
          {/* 소셜 로그인 버튼 - 카카오 */}
          <Button
            className="social_login left-[155px] rounded-full bg-inherit px-0"
            onClick={() => console.log("Fetch Kakao API")}
          >
            <img src="/images/ic_login_kakao.png" alt="Ex Img" />
          </Button>
          {/* 소셜 로그인 버튼 - 애플 */}
          <Button
            className="social_login left-[215px] rounded-full bg-inherit px-0"
            onClick={() => console.log("Fetch Apple API")}
          >
            <img src="/images/ic_login_apple.png" alt="Ex Img" />
          </Button>
          {/* 이메일, 패스워드 유효성 텍스트 */}
          {emailRef.current != null && !(emailRef.current?.length > 0) && (
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
