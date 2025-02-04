"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import BackAndTitle from "@/components/BackAndTitle";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();
  const router = useRouter();

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // 제출 처리
  const onSubmit = () => {
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    console.log(`입력된 생년월일: ${formattedDate}`);
    router.push("/users/signup/address");
    localStorage.setItem("userBirth", formattedDate);
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 ">
      <div className="w-[360px] gap-6 bg-white px-5">
        {/* 뒤로가기 버튼과 제목 */}
        <BackAndTitle
          url={"phoneNumber"}
          title={"고객님의 생일을\n알려주세요."}
        />

        {/* 생년월일 입력 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-6">
          <div className="flex items-center justify-center gap-6 text-lg font-medium text-[#8728FF]">
            <input
              type="text"
              placeholder="1900"
              maxLength={4}
              value={year}
              {...register("year", {
                required: "연도를 입력해주세요.",
                validate: (value) =>
                  (Number(value) >= 1900 && Number(value) <= 2006) ||
                  "연도는 1900년 ~ 2006년 이여야 합니다.",
              })}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setYear(numericValue);
                setValue("year", numericValue);
                clearErrors("year");
              }}
              className="w-[80px] text-center text-[#8728FF] focus:text-[#8728FF] focus:outline-none"
            />
            <span className="text-[#666666]">/</span>
            <input
              type="text"
              placeholder="01"
              maxLength={2}
              value={month}
              {...register("month", {
                required: "월을 입력해주세요.",
                validate: (value) =>
                  (Number(value) >= 1 && Number(value) <= 12) ||
                  "월은 1월 ~ 12월 이여야 합니다.",
              })}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setMonth(numericValue);
                setValue("month", numericValue);
                clearErrors("month");
              }}
              className="w-[50px] text-center text-[#8728FF] focus:text-[#8728FF] focus:outline-none"
            />
            <span className="text-[#666666]">/</span>
            <input
              type="text"
              placeholder="01"
              maxLength={2}
              value={day}
              {...register("day", {
                required: "날짜를 입력해주세요.",
                validate: (value) =>
                  (Number(value) >= 1 && Number(value) <= 31) ||
                  "날짜는 1일 ~ 31일 이여야 합니다.",
              })}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setDay(numericValue);
                setValue("day", numericValue);
                clearErrors("day");
              }}
              className="w-[50px] text-center text-[#8728FF] focus:text-[#8728FF] focus:outline-none"
            />
          </div>

          {/* 에러 메시지 표시 */}
          <div className="text-center text-sm text-[#FF0045]">
            {errors.year && <p>{errors.year.message}</p>}
            {errors.month && <p>{errors.month.message}</p>}
            {errors.day && <p>{errors.day.message}</p>}
          </div>
          <span></span>
          {/* 다음 버튼 */}
          <button
            type="submit"
            className={`absolute bottom-20 h-12 w-[320px] rounded-lg py-3 text-lg font-semibold text-white transition-all ${
              year && month && day
                ? "bg-[#8728FF] hover:bg-[#6A1DC8]"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
            disabled={!year || !month || !day}
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
