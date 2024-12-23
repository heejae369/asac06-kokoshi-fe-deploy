'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();
  const router = useRouter();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // 뒤로가기 함수
  const handleBack = () => {
    router.back();
  };

  // 제출 처리
  const onSubmit = () => {
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    alert(`입력된 생년월일: ${formattedDate}`);
  };

  return (

    <div className="flex h-screen w-full justify-center bg-gray-100 ">
      <div className="w-[360px] bg-white px-5 ">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className="w-6 h-6 mb-8 pt-6"
        >
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>

        {/* 제목 */}
        <h1 className="text-[#8728ff] text-[25px] font-semibold pt-3">
          고객님의 생일을 알려주세요.
        </h1>

        {/* 생년월일 입력 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-6">
          <div className="flex justify-center items-center gap-6 text-[#8728FF] text-lg font-medium">
            <input
              type="text"
              placeholder="1990"
              maxLength={4}
              value={year}
              {...register('year', {
                required: '연도를 입력해주세요.',
                validate: (value) =>
                  (Number(value) >= 1990 && Number(value) <= 2024) || '연도는 1990년 ~ 2024년 이여야 합니다.',
              })}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                setYear(numericValue);
                setValue('year', numericValue);
                clearErrors('year');
              }}
              className="w-[80px] text-center focus:outline-none focus:text-[#8728FF] text-[#8728FF]"
            />
            <span className="text-[#666666]">/</span>
            <input
              type="text"
              placeholder="01"
              maxLength={2}
              value={month}
              {...register('month', {
                required: '월을 입력해주세요.',
                validate: (value) =>
                  (Number(value) >= 1 && Number(value) <= 12) || '월은 1월 ~ 12월 이여야 합니다.',
              })}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                setMonth(numericValue);
                setValue('month', numericValue);
                clearErrors('month');
              }}
              className="w-[50px] text-center focus:outline-none focus:text-[#8728FF] text-[#8728FF]"
            />
            <span className="text-[#666666]">/</span>
            <input
              type="text"
              placeholder="01"
              maxLength={2}
              value={day}
              {...register('day', {
                required: '날짜를 입력해주세요.',
                validate: (value) =>
                  (Number(value) >= 1 && Number(value) <= 31) || '날짜는 1일 ~ 31일 이여야 합니다.',
              })}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                setDay(numericValue);
                setValue('day', numericValue);
                clearErrors('day');
              }}
              className="w-[50px] text-center focus:outline-none focus:text-[#8728FF] text-[#8728FF]"
            />
          </div>

          {/* 에러 메시지 표시 */}
          <div className="text-[#FF0045] text-sm text-center">
            {errors.year && <p>{errors.year.message}</p>}
            {errors.month && <p>{errors.month.message}</p>}
            {errors.day && <p>{errors.day.message}</p>}
          </div>
          <span></span>
          {/* 다음 버튼 */}
          <button
            type="submit"
            className={`w-full py-3 text-white text-lg font-semibold rounded-lg transition-all ${
              year && month && day
                ? 'bg-[#8728FF] hover:bg-[#6A1DC8]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
