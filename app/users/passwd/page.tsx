"use client";
import "@/app/temp.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPwResetEmail } from "@/feature/users/types/users.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { pwResetApi } from "@/feature/users/api/api";

export default function PasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<requestPwResetEmail>();

  const name = watch("name");
  const email = watch("email");

  const onClickBack = () => {
    console.log("history back");
  };

  const [requestPwResetEmail, { isLoading, isSuccess, data }] =
    pwResetApi.usePasswordResetEmailMutation();
  const onSubmit: SubmitHandler<requestPwResetEmail> = (data) => {
    requestPwResetEmail({ requestPwResetEmail: data });
  };

  if (isSuccess && data) {
    alert(data.message);
  }

  // 이름과 이메일이 모두 입력 되고, 이름이 한글로 입력 & 이메일이 pattern 에 일치하는 경우에만 버튼 활성화 처리.
  return (
    <div>
      <div className="flex flex-col w-full px-5 gap-2 pt-[57px]">
        <button onClick={onClickBack}>
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <div className="text-[#8728ff] text-[40px]">비밀번호 찾기</div>
        <div className="text-[16px]">
          비밀번호 재설정 링크를 보내기 위한 <b>이메일 주소</b>를 입력해 주세요.
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            type="text"
            className="my-1 text-sm"
            placeholder="이름"
            maxLength={20}
            {...register("name", {
              required: "이름을 입력해주세요.",
              pattern: {
                value: /^[가-힣]+$/,
                message: "한글만 입력해 주세요.",
              },
            })}
          />
          {errors.name && <small>{errors.name.message}</small>}
          <Input
            id="email"
            type="text"
            className="my-1 text-sm"
            placeholder="이메일"
            maxLength={20}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && <small>{errors.email.message}</small>}
          <Button
            className="w-full my-4"
            variant={"point"}
            type="submit"
            disabled={isSubmitting || !name || !email}
          >
            이메일 전송
          </Button>
        </form>
      </div>
    </div>
  );
}
