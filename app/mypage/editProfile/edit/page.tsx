"use client";

import MainHeaders from "@/components/MainHeaders";
import Image from "next/image";
import { useState } from "react";
import { userAuthApi } from "@/feature/users/api/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  requestUpdateUser,
  UserEditInfo,
} from "@/feature/users/types/users.type";
import { ImageUploadModal } from "@/components/myPage/ImageUploadModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<requestUpdateUser>();
  const [isUserProfileImgModalOpen, setUserProfileImgModalOpen] =
    useState(false);
  const [userEditInfo, setUserEditInfo] = useState<UserEditInfo>({});
  const [userProfile, setUserProfile] = useState<string>("");

  const router = useRouter();
  const userName = watch("userName");
  const phone = watch("phone");
  const userBirth = watch("userBirth");
  const nickName = watch("nickName");

  const [
    updateUser,
    {
      isLoading: isUpdateUserLoading,
      isError: isUpdateUserError,
      isSuccess: isUpdateUserSuccess,
      data: isUpdateUserData,
    },
  ] = userAuthApi.useUpdateUserMutation();
  const onSubmit: SubmitHandler<requestUpdateUser> = (data) => {
    updateUser({ requestUpdateUser: data });
  };

  const {
    data: userData,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    isError: isUserError,
  } = userAuthApi.useUserEditInfoQuery();

  useEffect(() => {
    if (isUserSuccess && userData) {
      setUserEditInfo(userData.data);
      setUserProfile(userData.data.profilePath);

      setValue("userName", userData.data.userName);
      setValue("phone", userData.data.phone);
      setValue("userBirth", userData.data.userBirth);
      setValue("nickName", userData.data.nickName);
    }
  }, [isUserSuccess, setValue, userData]);

  useEffect(() => {
    if (isUpdateUserSuccess && isUpdateUserData) {
      alert(isUpdateUserData.message);
      router.push("/yanolza/main");
    }
  }, [isUpdateUserData, isUpdateUserSuccess, router]);

  if (isUserError || isUpdateUserError) {
    return <div>Error</div>;
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // 숫자만 남기기
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    setValue("phone", formatPhoneNumber(e.target.value));
  };

  const formatBirthdate = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // 숫자만 남기기
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 4)}/${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}/${cleaned.slice(6, 8)}`;
  };

  const handleUserBirthChange = (e) => {
    setValue("phone", formatBirthdate(e.target.value));
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 font-sans">
        <MainHeaders title="내 정보 수정" backIcon />
        <div className="relative inline-block">
          <Image
            className="mt-10 w-17 h-17 rounded-full object-cover"
            src={userProfile || "/default_profile.png"}
            alt=""
            width={68}
            height={68}
            onClick={() => setUserProfileImgModalOpen(true)}
            style={{ cursor: "pointer" }}
          />
          <button
            className="absolute bottom-0 right-0 size-5 rounded-full"
            onClick={() => setUserProfileImgModalOpen(true)}
            style={{
              backgroundImage: `url(${"/assets/icon/ic_mypage_camera.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 flex items-baseline">
            <p className="mt-5 text-xl font-bold">회원 정보</p>
          </div>
          <div className="my-4 flex">
            <p className="w-28 self-center text-sm text-gray-500">이름</p>
            <Input
              id="userName"
              className="text-sm font-semibold"
              {...register("userName", {
                required: "이름을 입력해주세요.",
                pattern: {
                  value: /^[가-힣]+$/,
                  message: "한글만 입력해 주세요.",
                },
              })}
              placeholder="이름을 입력해주세요."
            ></Input>
          </div>
          {errors.userName && (
            <span className="text-sm text-[#FF0045]">
              {errors.userName.message}
            </span>
          )}
          <div className="h-0.5 w-full bg-gray-100" />
          <div className="my-4 flex">
            <p className="w-28 self-center text-sm text-gray-500">
              휴대폰 번호
            </p>
            <Input
              id="phone"
              className="text-sm font-semibold"
              {...register("phone", { required: "전화번호를 입력해주세요." })}
              onChange={handlePhoneChange}
              placeholder="전화번호를 입력해주세요."
            ></Input>
          </div>
          {errors.phone && (
            <span className="text-sm text-[#FF0045]">
              {errors.phone.message}
            </span>
          )}
          <div className="h-0.5 w-full bg-gray-100" />
          <div className="my-4 flex">
            <p className="w-28 self-center text-sm text-gray-500">생년월일</p>
            <Input
              id="userBirth"
              className="text-sm font-semibold"
              {...register("userBirth", {
                required: "생년월일을을 입력해주세요.",
              })}
              onChange={handleUserBirthChange}
              placeholder="YYYY/MM/DD"
            ></Input>
          </div>
          {errors.userBirth && (
            <span className="text-sm text-[#FF0045]">
              {errors.userBirth.message}
            </span>
          )}
          <div className="h-0.5 w-full bg-gray-100" />
          <div className="my-4 flex">
            <p className="w-28 self-center text-sm text-gray-500">닉네임</p>
            <Input
              id="nickName"
              className="text-sm font-semibold"
              {...register("nickName", { required: "닉네임을 입력해주세요." })}
              placeholder="닉네임을 입력해주세요."
            ></Input>
          </div>
          {errors.nickName && (
            <span className="text-sm text-[#FF0045]">
              {errors.nickName.message}
            </span>
          )}
          <Button
            className="my-4 h-12 w-full rounded text-[1rem]"
            variant={"point"}
            type="submit"
            disabled={
              isSubmitting || !userName || !phone || !userBirth || !nickName
            }
          >
            수정완료
          </Button>
        </form>
        {/* 모달 */}
        {isUserProfileImgModalOpen && (
          <ImageUploadModal
            setUserProfile={setUserProfile}
            setUserProfileImgModalOpen={setUserProfileImgModalOpen}
          />
        )}
      </div>
    </div>
  );
}
