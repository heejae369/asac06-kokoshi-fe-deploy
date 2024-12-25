"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { pwResetApi } from "@/feature/users/api/api";
import { requestPwReset } from "@/feature/users/types/users.type";

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

  const onClickBack = () => {
    console.log("history back");
  };

  const [requestPwReset, { isLoading, isSuccess, data }] =
    pwResetApi.usePasswordResetMutation();
  const onSubmit: SubmitHandler<requestPwReset> = (data) => {
    requestPwReset({
      requestPwReset: { uuid: params.uuid, password: data.password },
    });
  };

  if (isSuccess && data) {
    alert(data.message);

    // 홈으로 이동?
  }

  // 비밀번호와 비밀번호 확인이 일치 할 경우에만 비밀번호 변경 활성화
  return (
    <div>
      <div className="flex w-full flex-col gap-2 px-5 pt-[57px]">
        <button onClick={onClickBack}>
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <div className="text-[40px] text-[#8728ff]">새 비밀번호</div>
        <div className="text-[16px]">
          <b>새 비밀번호</b>를 설정해 주세요!
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="password"
            type="password"
            className="my-1 text-sm"
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
          {errors.password && (
            <span className="text-sm">{errors.password.message}</span>
          )}
          <Input
            id="passwordConfirm"
            type="password"
            className="my-1 text-sm"
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
                  return password === value || "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
          />
          {errors.passwordConfirm && (
            <span className="text-sm">{errors.passwordConfirm.message}</span>
          )}
          <Button
            className="my-4 w-full"
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
