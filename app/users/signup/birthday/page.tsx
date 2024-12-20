// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { cn } from '@/lib/utils';

// export default function SignupPage() {
//   const [year, setYear] = useState('');
//   const [month, setMonth] = useState('');
//   const [day, setDay] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`입력된 생년월일: ${year}-${month}-${day}`);
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white">
//       <div className="relative w-[360px] p-5 bg-white shadow-md rounded-lg">
//         {/* 뒤로가기 버튼 */}
//         <button
//           onClick={handleBack}
//           className="absolute top-4 left-4 text-[#8728FF] text-2xl font-semibold focus:outline-none"
//         >
//           <img src="/ic_back.png" alt="뒤로가기" className="w-6 h-6" />
//         </button>

//         {/* 제목 */}
//         <div className="pt-12">
//           <h1 className="text-2xl font-semibold text-[#8728FF] text-center mb-10">
//             고객님의 생일을 알려주세요.
//           </h1>
//         </div>

//         {/* 생년월일 입력 폼 */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex justify-center items-center gap-6 text-[#8728FF] text-lg font-medium">
//             <input
//               type="text"
//               placeholder="1990"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               maxLength={4}
//               className="w-[80px] text-center focus:outline-none text-[#8728FF]"
//             />
//             <span>/</span>
//             <input
//               type="text"
//               placeholder="01"
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               maxLength={2}
//               className="w-[50px] text-center focus:outline-none text-[#8728FF]"
//             />
//             <span>/</span>
//             <input
//               type="text"
//               placeholder="01"
//               value={day}
//               onChange={(e) => setDay(e.target.value)}
//               maxLength={2}
//               className="w-[50px] text-center focus:outline-none text-[#8728FF]"
//             />
//           </div>
//           <button
//             type="submit"
//             className={cn(
//               'w-full py-3 text-white text-lg font-semibold rounded-lg transition-all',
//               year && month && day ? 'bg-[#8728FF] hover:bg-[#6A1DC8]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             )}
//             disabled={!year || !month || !day}
//           >
//             다음
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useForm } from "react-hook-form"
// import { useRouter } from "next/navigation"

// interface BirthDateForm{
//     year: string
//     month: string
//     day: string
// }

// export default function BirthDatePage() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: {errors, isValid },
//   } = useForm<BirthDateForm>({
//     mode: 'onChange'
//   })

//   const onSubmit = (data: BirthDateForm) => {
//     const { year, month, day } = data
//     alert('입력된 생년월일: ${year}-${month}-${day}')
//   }

//   const handleBack = () => {
//     router.back()
//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen justify-center bg-white">
//       <div className="flex flex-col w-full px-5 gap-4 pt-6">
//         {/* 뒤로가기 버튼 */}
//         <button onClick={handleBack} className="w-6 h-6">
//           <img src="/ic_back.png" alt="뒤로가기" />
//         </button>

//         {/* 제목 */}
//         <h1 className="text-[#8728ff] text-[40px]">
//           고객님의 생일을 알려주세요.
//         </h1>

//         {/* 생년월일 입력 폼 */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div className="flex justify-center items-center gap-6 text-[#8728FF] text-lg font-medium">
//             <input
//               type="text"
//               placeholder="1990"
//               value={'year'}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9]/g, '')
//                 setYear(value)}}
//               maxLength={4}
//               className="w-[80px] text-center focus:outline-none focus:text-[#8728FF] text-[#8728FF]"
//             />
//             <span className="text-[#666666]">/</span>
//             <input
//               type="text"
//               placeholder="01"
//               value={month}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9]/g, '')
//                 setMonth(value)}}
//               maxLength={2}
//               className="w-[50px] text-center focus:outline-none focus:text-[#8728FF] text-[#8728FF]"
//             />
//             <span className="text-[#666666]">/</span>
//             <input
//               type="text"
//               placeholder="01"
//               value={day}
//               onChange={(e) => setDay(e.target.value)}
//               maxLength={2}
//               className="w-[50px] text-center focus:outline-none focus:text-[#8728FF] text-[#8728FF]"
//             />
//           </div>

//           {/* 다음 버튼 */}
//           <button
//             type="submit"
//             className={`w-full py-3 text-white text-lg font-semibold rounded-lg transition-all ${
//               year && month && day
//                 ? "bg-[#8728FF] hover:bg-[#6A1DC8]"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//             disabled={!year || !month || !day}
//           >
//             다음
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm();
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
    <div className="flex flex-col w-full px-5 gap-6 pt-6">
      <div className="flex flex-col w-full px-5 gap-6 pt-6">
        {/* 뒤로가기 버튼 */}
        <button onClick={handleBack} className="w-6 h-6">
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>

        {/* 제목 */}
        <h1 className="text-[#8728ff] text-[25px] font-semibold">
          고객님의 생일을 알려주세요.
        </h1>

        {/* 생년월일 입력 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
