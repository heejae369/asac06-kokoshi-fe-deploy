"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { postApiSendingTest } from "@/feature/postApiSending";
import BackAndTitle from "@/components/BackAndTitle";

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

  const handleNext = (termsState) => {
    // console.log("선택된 관심사:", selectedInterest);
    // router.push("/users/nickname");
    localStorage.setItem("terms", termsState);
    postApiSendingTest();
    router.push("/users/login");
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <BackAndTitle url={"nickname"} title={"약관동의"} />

        {/* 전체 약관 동의 */}
        <div className="mb-4 flex items-center gap-2">
          <CheckboxPrimitive.Root
            checked={allTerms.every((key) => termsState[key])}
            onCheckedChange={handleAllCheckboxChange}
            className={`peer flex size-4 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
              allTerms.every((key) => termsState[key])
                ? "border-[#8728FF] bg-[#8728FF] text-white"
                : "border-gray-200 bg-gray-200 text-white"
            }`}
          >
            <CheckboxPrimitive.Indicator className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
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
          <span className="text-[14px] font-bold text-black">전체 동의</span>
        </div>

        <hr className="mb-6 border-t border-gray-300" />

        {/* 약관 동의 */}
        <Accordion.Root type="multiple" className="mb-4">
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
                <div className="my-4 flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckboxPrimitive.Root
                      checked={termsState[term.id]}
                      onCheckedChange={() => handleCheckboxChange(term.id)}
                      className={`peer flex size-4 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
                        termsState[term.id]
                          ? "border-[#8728FF] bg-[#8728FF] text-white"
                          : "border-gray-200 bg-gray-200 text-white"
                      }`}
                    >
                      <CheckboxPrimitive.Indicator className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-3"
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
                    <span className="text-[14px] text-black">{term.title}</span>
                  </div>
                  <Accordion.Trigger className="group flex cursor-pointer items-center border-none bg-transparent">
                    <ChevronDownIcon
                      className="size-4 text-black transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </div>
              </Accordion.Header>
              <Accordion.Content className="rounded bg-[#F6F6F6] p-3 text-sm text-gray-700">
                {term.content}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* 다음 버튼 */}
        <button
          type="button"
          className={`mt-8 h-12 w-full rounded-md py-3 text-lg font-semibold text-white ${
            requiredTerms.every((key) => termsState[key])
              ? "bg-[#8728FF] hover:bg-[#6A1DC8]"
              : "cursor-not-allowed bg-gray-300"
          } transition-colors`}
          disabled={!requiredTerms.every((key) => termsState[key])}
          onClick={handleNext}
        >
          확인
        </button>
      </div>
    </div>
  );
}
