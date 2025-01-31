"use client";

import Footer from "@/components/Footer";
import MainHeaders from "@/components/MainHeaders";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditProfilePostApi from "@/feature/EditProfilePostAPi";

export default function EditNameAndPhoneNumber() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState(false);

  const handleInputChange = (e) => {
    let nameValue = e.target.value;
    nameValue = nameValue.replace(/\n/g, "");
    setName(nameValue.slice(0, 20));
  };

  const handlePhoneChange = (e) => {
    let inputText = e.currentTarget.value;

    inputText = inputText.replace(/[^0-9]/g, "");
    let formattedText = "";
    if (inputText.length <= 3) formattedText = inputText;
    else if (inputText.length <= 7)
      formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3)}`;
    else
      formattedText = `${inputText.slice(0, 3)}-${inputText.slice(3, 7)}-${inputText.slice(7, 11)}`;
    setPhone(formattedText);
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="flex w-[360px] flex-col bg-white px-5 font-sans">
        <MainHeaders title="내 정보 수정" backIcon />
        <p className="mt-7 text-sm font-bold">회원정보 확인</p>
        <p className="my-2 text-sm tracking-tight text-gray-600">
          정보를 안전하게 보호하기 위해 본인 실명과 핸드폰 뒷자리 번호를
          입력해주세요.
        </p>
        <div className="my-4 flex text-sm">
          <p className="w-24">이름</p>
          <input
            placeholder={"홍*동"}
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex text-sm">
          <p className="w-24">휴대폰 번호</p>
          <input
            placeholder={"010-1234-****"}
            value={phone}
            onChange={(e) => handlePhoneChange(e)}
          />
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        {showValidation && !validation && (
          <div className="py-1 text-sm text-[#FF0045]">
            본인인증에 실패했습니다.
          </div>
        )}
        <div className="grow" />
        <Button
          className="mb-20 h-12 w-full rounded text-[1rem] disabled:bg-gray-400"
          variant={"point"}
          disabled={name == "" || phone == ""}
          onClick={async () => {
            setShowValidation(true);
            if (await EditProfilePostApi({ name, phone })) {
              setValidation(true);
              router.push("edit");
            } else setValidation(false);
          }}
        >
          확인
        </Button>
        <Footer />
      </div>
    </div>
  );
}
