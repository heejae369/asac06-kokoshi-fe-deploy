"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export default function TermPage() {
  const [termsState, setTermsState] = useState({
    "RequiredTerms-1": false,
    "RequiredTerms-2": false,
    "OptionalTerms-1": false,
    "OptionalTerms-2": false,
  });

  const requiredTerms = ["RequiredTerms-1", "RequiredTerms-2"];
  const allTerms = Object.keys(termsState);

  const handleCheckboxChange = (termKey: string) => {
    setTermsState((prevState) => ({
      ...prevState,
      [termKey]: !prevState[termKey],
    }));
  };

  const handleAllCheckboxChange = () => {
    const allChecked = allTerms.every((key) => termsState[key]);
    const newState = !allChecked;
    setTermsState(() =>
      Object.fromEntries(allTerms.map((key) => [key, newState]))
    );
  };

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 py-6">
        
        {/* 뒤로가기 버튼 */}
        <button onClick={handleBack} className="w-6 h-6 mb-4">
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>

        {/* 제목 */}
        <h1 className="text-[#8728FF] text-[25px] font-semibold mb-6">
          약관 동의
        </h1>

        {/* 전체 약관 동의 */}
        <div className="flex items-center gap-2 mb-4">
          <CheckboxPrimitive.Root
            checked={allTerms.every((key) => termsState[key])}
            onCheckedChange={handleAllCheckboxChange}
            className={`peer h-4 w-4 flex items-center justify-center rounded-sm border cursor-pointer transition-colors ${
              allTerms.every((key) => termsState[key])
                ? "bg-[#8728FF] border-[#8728FF] text-white"
                : "bg-gray-200 border-gray-200 text-white"
            }`}
          >
            <CheckboxPrimitive.Indicator className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 00-1.408-1.415l-7.29 7.52L5.714 9.21a1 1 0 10-1.415 1.415l3.296 3.297a1 1 0 001.416-.003l7.693-7.63z"
                  clipRule="evenodd"
                />
              </svg>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <span className="text-black font-bold text-[14px]">전체 동의</span>
        </div>

        <hr className="border-t border-gray-300 mb-6" />

        {/* 약관 동의 */}
        <Accordion.Root type="multiple" className="space-y-4">
          {[
            {
              id: "RequiredTerms-1",
              title: "서비스 이용약관(필수)",
              content:
                "서비스 이용약관입니다. 동의하지 않으면 서비스를 이용할 수 없습니다.",
            },
            {
              id: "RequiredTerms-2",
              title: "개인정보 수집/이용(필수)",
              content:
                "개인정보 수집/이용 약관입니다. 동의하지 않으면 서비스를 이용할 수 없습니다.",
            },
            {
              id: "OptionalTerms-1",
              title: "위치정보 이용 동의(선택)",
              content:
                "위치정보 이용 동의입니다. 동의하지 않아도 서비스를 이용할 수 있습니다.",
            },
            {
              id: "OptionalTerms-2",
              title: "마케팅 정보 수신 동의(선택)",
              content:
                "마케팅 정보 수신 동의입니다. 동의하지 않아도 서비스를 이용할 수 있습니다.",
            },
          ].map((term) => (
            <Accordion.Item key={term.id} value={term.id}>
              <Accordion.Header>
                <div className="flex items-center justify-between w-full p-3">
                  <div className="flex items-center gap-2">
                    <CheckboxPrimitive.Root
                      checked={termsState[term.id]}
                      onCheckedChange={() => handleCheckboxChange(term.id)}
                      className={`peer h-4 w-4 flex items-center justify-center rounded-sm border cursor-pointer transition-colors ${
                        termsState[term.id]
                          ? "bg-[#8728FF] border-[#8728FF] text-white"
                          : "bg-gray-200 border-gray-200 text-white"
                      }`}
                    >
                      <CheckboxPrimitive.Indicator className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 00-1.408-1.415l-7.29 7.52L5.714 9.21a1 1 0 10-1.415 1.415l3.296 3.297a1 1 0 001.416-.003l7.693-7.63z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </CheckboxPrimitive.Indicator>
                    </CheckboxPrimitive.Root>
                    <span className="text-black text-[14px]">{term.title}</span>
                  </div>
                  <Accordion.Trigger
                    className="group flex items-center bg-transparent border-none cursor-pointer"
                  >
                    <ChevronDownIcon
                      className="h-4 w-4 text-black transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </div>
              </Accordion.Header>
              <Accordion.Content className="p-3 text-sm text-gray-700">
                {term.content}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* 다음 버튼 */}
        <button
          type="button"
          className={`mt-8 w-full py-3 rounded-md text-white text-lg font-semibold ${
            requiredTerms.every((key) => termsState[key])
              ? "bg-[#8728FF] hover:bg-[#6A1DC8]"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors`}
          disabled={!requiredTerms.every((key) => termsState[key])}
          onClick={() =>
            alert("약관에 동의하셨습니다! " + JSON.stringify(termsState))
          }
        >
          확인
        </button>
      </div>
    </div>
  );
}
