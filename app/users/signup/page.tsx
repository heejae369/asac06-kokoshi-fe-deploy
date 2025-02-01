"use client";

import passwordHide from "@/assets/icon/ic_pw_hide.png";
import passwordShow from "@/assets/icon/ic_pw_see.png";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackAndTitle from "@/components/BackAndTitle";
import { Checkbox } from "@/components/ui/checkbox";
import EmailValidation from "@/feature/signup/EmailValidation";
import PwValidation from "@/feature/signup/PwValidation";
import CheckPwValidation from "@/feature/signup/CheckPwValidation";
import SignupPostApi from "@/feature/signup/SignupPostApi";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  // 비밀번호, 비밀번호 확인 숨기기 여부
  const [hidePw, setHidePw] = useState("password");
  const [hideCheckPw, setHideCheckPw] = useState("password");
  // 유효성 확인 문구 표시 여부
  const [showValidation, setShowValidation] = useState(false);
  // 이용 약관 체크 여부 확인
  const [checked, setChecked] = useState(false);
  const handleCheckedChange = () => {
    setChecked((prevChecked) => !prevChecked); // checked 상태 토글
  };
  const router = useRouter();

  // localStorage에 유저 정보 저장
  const onSubmit = (name, email, pw) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", pw);
  };

  const [errors, setErrors] = useState({
    email: "",
    pw: "",
    checkPw: "",
    unusedEmail: "",
  });

  const onClickEvent = async () => {
    const newErrors = { email: "", pw: "", checkPw: "", unusedEmail: "" };
    setErrors(newErrors);

    if (!EmailValidation({ email })) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }
    if (!PwValidation({ pw })) {
      newErrors.pw = "영문, 숫자를 조합하여 8자 이상으로 입력해주세요.";
    }
    if (!CheckPwValidation({ pw, checkPw })) {
      newErrors.checkPw = "비밀번호가 일치하지 않습니다.";
    }
    if (newErrors.email === "") {
      await SignupPostApi({
        name,
        email,
        pw,
        newErrors,
        setErrors,
      });
    }
    setShowValidation(true);
    if (
      JSON.stringify(newErrors) ===
      JSON.stringify({ email: "", pw: "", checkPw: "", unusedEmail: "" })
    ) {
      router.push("signup/phoneNumber");
    }
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <BackAndTitle url={"/users/login"} title={"회원가입"} />
        <div className="flex flex-col gap-2  ">
          {/* 이름 입력창 */}
          <input
            value={name}
            onChange={(e) => {
              let nameValue = e.target.value;
              nameValue = nameValue.replace(/\n/g, "");
              setName(nameValue.slice(0, 20));
            }}
            className="h-12 rounded bg-[#F4F4F4] p-4"
            type="text"
            placeholder="이름"
          />
          {/* 이메일 입력창 */}
          <input
            value={email}
            onChange={(e) => {
              let emailValue = e.target.value;
              emailValue = emailValue.replace(/\n/g, "");
              setEmail(emailValue.slice(0, 30));
            }}
            className="h-12 rounded bg-[#F4F4F4] p-4"
            type="email"
            placeholder="이메일 입력창"
          />
          {/* 이메일 유효성 문구 */}
          {showValidation && errors.email != "" && (
            <div className="py-1 text-sm text-[#FF0045]">{errors.email}</div>
          )}
          {showValidation &&
            errors.email === "" &&
            errors.unusedEmail != "" && (
              <div className="py-1 text-sm text-[#FF0045]">
                {errors.unusedEmail}
              </div>
            )}
          {/* 비밀번호 입력 */}
          <div className="relative">
            <input
              value={pw}
              onChange={(e) => {
                let pwValue = e.target.value;
                pwValue = pwValue.replace(/\n/g, "");
                setPw(pwValue.slice(0, 20));
              }}
              className="h-12 w-full rounded bg-[#F4F4F4] p-4"
              type={hidePw}
              placeholder="비밀번호 (영문과 숫자로 8자 이상)"
              autoComplete="new-password"
            />
            {/* 비밀번호 표시하기 버튼 */}
            {hidePw === "password" && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHidePw("text")}
              >
                <img src={passwordHide.src} alt="Ex Img" />
              </button>
            )}
            {/* 비밀번호 숨기기 버튼 */}
            {!(hidePw === "password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHidePw("password")}
              >
                <img src={passwordShow.src} alt="Ex Img" />
              </button>
            )}
          </div>
          {/* 비밀번호 유효성 문구 */}
          {showValidation && errors.pw != "" && (
            <div className="py-1 text-sm text-[#FF0045]">{errors.pw}</div>
          )}
          {/* 비밀번호 재입력 */}
          <div className="relative">
            <input
              value={checkPw}
              onChange={(e) => {
                let pwValue = e.target.value;
                pwValue = pwValue.replace(/\n/g, "");
                setCheckPw(pwValue.slice(0, 20));
              }}
              className="h-12 w-full rounded bg-[#F4F4F4] p-4"
              type={hideCheckPw}
              placeholder="비밀번호 확인"
              autoComplete="new-password"
            />
            {/* 비밀번호 표시하기 버튼 */}
            {hideCheckPw === "password" && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHideCheckPw("text")}
              >
                <img src={passwordHide.src} alt="Ex Img" />
              </button>
            )}
            {/* 비밀번호 숨기기 버튼 */}
            {!(hideCheckPw === "password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0"
                onClick={() => setHideCheckPw("password")}
              >
                <img src={passwordShow.src} alt="Ex Img" />
              </button>
            )}
          </div>
        </div>
        {/* 비밀번호 재입력 유효성 문구 */}
        {showValidation && errors.checkPw != "" && (
          <div className="py-1 text-sm text-[#FF0045]">{errors.checkPw}</div>
        )}
        {/* 이용 약관 동의 */}
        <div className="flex items-center space-x-2 py-7">
          <Checkbox
            onClick={handleCheckedChange}
            className={`peer flex size-4 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
              checked
                ? "data-[state=checked]:bg-[#8728FF]"
                : "border-gray-200 bg-gray-200 text-white"
            }`}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            이용약관에 동의합니다.
          </label>
        </div>
        {/* 다음 버튼 */}
        <Button
          className="h-12 w-full rounded text-[1rem] disabled:bg-gray-400"
          variant={"point"}
          disabled={
            name.length < 1 ||
            email.length < 1 ||
            pw.length < 8 ||
            checkPw.length < 8 ||
            checked === false
          }
          onClick={() => {
            onClickEvent();
            onSubmit(name, email, pw);
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
