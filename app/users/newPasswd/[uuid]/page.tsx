"use client";

import passwordHide from "@/assets/icon/ic_pw_hide.png";
import passwordShow from "@/assets/icon/ic_pw_see.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { userApi } from "@/feature/users/api/api";
import { requestPwReset } from "@/feature/users/types/users.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordPage({ params }: { params: { uuid: string } }) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm();

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const router = useRouter();
  // 비밀번호, 비밀번호 확인 숨기기 여부
  const [hidePw, setHidePw] = useState("password");
  const [hideCheckPw, setHideCheckPw] = useState("password");

  const onClickBack = () => {
    console.log("history back");
  };

  const [requestPwReset, { isLoading, isSuccess, data }] =
    userApi.usePasswordResetMutation();
  const onSubmit: SubmitHandler<requestPwReset> = (data) => {
    requestPwReset({
      requestPwReset: { uuid: params.uuid, password: data.password },
    });
  };

  if (isSuccess && data) {
    alert(data.message);

    // 홈으로 이동?  일단 로그인 창 이동 -> 재로그인
    router.push("/users/login");
  }

  // 비밀번호와 비밀번호 확인이 일치 할 경우에만 비밀번호 변경 활성화
  return (
    <div>
      <div className="flex w-full flex-col gap-2 px-5 pt-[57px]">
        <button onClick={onClickBack}>
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <h2 className="mb-2 mt-4 whitespace-pre-line text-[25px] font-bold text-[#8b00ff]">
          새 비밀번호
        </h2>
        <div className="text-[16px]">
          <b>새 비밀번호</b>를 설정해 주세요!
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <Input
              id="password"
              type="password"
              className="my-1 h-12 bg-[#F4F4F4] text-sm"
              type={hidePw}
              placeholder="비밀번호(영문과 숫자로 8자 이상)"
              maxLength={16}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^[A-Za-z0-9]{8,16}$/,
                  message: "영문과 숫자로 8자 이상 입력해 주세요.",
                },
                minLength: { value: 8, message: "8자리 이상 입력해 주세요." },
              })}
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
          {errors.password && (
            <span className="text-sm text-[#FF0045]">
              {errors.password.message}
            </span>
          )}
          <div className="relative">
            <Input
              id="passwordConfirm"
              type="password"
              className="my-1 h-12 bg-[#F4F4F4] text-sm"
              type={hideCheckPw}
              placeholder="비밀번호 확인"
              maxLength={16}
              {...register("passwordConfirm", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^[A-Za-z0-9]{8,16}$/,
                  message: "영문과 숫자로 8자 이상 입력해 주세요.",
                },
                minLength: { value: 8, message: "8자리 이상 입력해 주세요." },
                validate: {
                  matchPassword: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || "비밀번호가 일치하지 않습니다."
                    );
                  },
                },
              })}
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
          {errors.passwordConfirm && (
            <span className="text-sm text-[#FF0045]">
              {errors.passwordConfirm.message}
            </span>
          )}
          <Button
            className="my-4 h-12 w-full rounded text-[1rem] disabled:bg-gray-400"
            variant={"point"}
            type="submit"
            disabled={isSubmitting || !password || !passwordConfirm}
          >
            비밀번호 변경
          </Button>
        </form>
      </div>
    </div>
  );
}
