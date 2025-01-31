"use client";
import { Button } from "@/components/ui/button";
import { requestPwResetEmail } from "@/feature/users/types/users.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { userApi } from "@/feature/users/api/api";
import { useRouter } from "next/navigation";
import { useCustomAlert } from "@/feature/useCustomAlert";

export default function PasswordPage() {
  const { showAlertMessage, AlertComponent } = useCustomAlert();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<requestPwResetEmail>();

  const name = watch("name");
  const email = watch("email");

  const onClickBack = () => {
    router.push("login");
  };

  // ✅ useMutation을 사용한 API 호출
  const [requestPwResetEmail, { isLoading }] =
    userApi.usePasswordResetEmailMutation();

  // ✅ 이메일 전송 요청 처리
  const onSubmit: SubmitHandler<requestPwResetEmail> = async (data) => {
    try {
      // API 요청
      const response = await requestPwResetEmail({
        requestPwResetEmail: data,
      }).unwrap();

      // ✅ 성공 시 알림 표시
      showAlertMessage(response.message || "이메일이 전송되었습니다.");
    } catch (error: any) {
      console.error("비밀번호 재설정 이메일 요청 실패:", error);

      // ✅ 실패 시 에러 메시지 표시
      showAlertMessage(error.data?.message || "이메일 전송에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 px-5 pt-[57px]">
        <button onClick={onClickBack}>
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <h2 className="mb-2 mt-4 whitespace-pre-line text-[25px] font-bold text-[#8b00ff]">
          비밀번호 찾기
        </h2>
        <div className="mb-3 text-[16px]">
          비밀번호 재설정 링크를 보내기 위한 <br />
          <b>이메일 주소</b>를 입력해 주세요.
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="name"
            type="text"
            className="my-1 h-12 w-full bg-[#F4F4F4] p-4 text-sm"
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
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
          <input
            id="email"
            type="text"
            className="my-1 h-12 w-full bg-[#F4F4F4] p-4 text-sm"
            placeholder="이메일"
            maxLength={50}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
          <Button
            className="my-4 h-12 w-full rounded text-[1rem] disabled:bg-gray-400"
            variant={"point"}
            type="submit"
            disabled={isSubmitting || !name || !email || isLoading}
          >
            {isLoading ? "전송 중..." : "이메일 전송"}
          </Button>
          <AlertComponent />
        </form>
      </div>
    </>
  );
}
