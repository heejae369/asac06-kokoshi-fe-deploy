"use client";

import MainHeaders from "@/components/MainHeaders";
import { useState } from "react";
import { userAuthApi } from "@/feature/users/api/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  requestUpdateUser,
  UserEditInfo,
} from "@/feature/users/types/users.type";
import { ImageUploadModal } from "@/components/myPage/ImageUploadModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCustomAlert } from "@/feature/useCustomAlert";
import CustomButtonP from "@/components/CustomButtonP";

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
  const { showAlertMessage, AlertComponent } = useCustomAlert();

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
      showAlertMessage(isUpdateUserData.message, 2000, () => {
        router.push("/mypage"); // 알림이 닫힌 후 페이지 이동
      });
    }
  }, [isUpdateUserData, isUpdateUserSuccess]);

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
    setValue("userBirth", formatBirthdate(e.target.value));
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 font-sans">
        <MainHeaders title="내 정보 수정" backIcon />
        <div className="relative inline-block">
          <button
            className="size-20 rounded-full object-cover"
            style={{
              backgroundImage: `url(${userProfile || "/default_profile.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => setUserProfileImgModalOpen(true)}
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
            <p className="w-24 self-center text-sm text-gray-500">이름</p>
            <input
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
            />
          </div>
          {errors.userName && (
            <span className="text-sm text-[#FF0045]">
              {errors.userName.message}
            </span>
          )}
          <div className="h-0.5 w-full bg-gray-100" />
          <div className="my-4 flex">
            <p className="w-24 self-center text-sm text-gray-500">
              휴대폰 번호
            </p>
            <input
              id="phone"
              className="text-sm font-semibold"
              {...register("phone", { required: "전화번호를 입력해주세요." })}
              onChange={handlePhoneChange}
              placeholder="전화번호를 입력해주세요."
            />
          </div>
          {errors.phone && (
            <span className="text-sm text-[#FF0045]">
              {errors.phone.message}
            </span>
          )}
          <div className="h-0.5 w-full bg-gray-100" />
          <div className="my-4 flex">
            <p className="w-24 self-center text-sm text-gray-500">생년월일</p>
            <input
              id="userBirth"
              className="text-sm font-semibold"
              {...register("userBirth", {
                required: "생년월일을을 입력해주세요.",
              })}
              onChange={handleUserBirthChange}
              placeholder="YYYY/MM/DD"
            />
          </div>
          {errors.userBirth && (
            <span className="text-sm text-[#FF0045]">
              {errors.userBirth.message}
            </span>
          )}
          <div className="h-0.5 w-full bg-gray-100" />
          <div className="my-4 flex">
            <p className="w-24 self-center text-sm text-gray-500">닉네임</p>
            <input
              id="nickName"
              className="text-sm font-semibold"
              {...register("nickName", { required: "닉네임을 입력해주세요." })}
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          {errors.nickName && (
            <span className="text-sm text-[#FF0045]">
              {errors.nickName.message}
            </span>
          )}
          {/* <Button
            className="my-4 h-12 w-full rounded text-[1rem]"
            variant={"point"}
            type="submit"
            disabled={
              isSubmitting || !userName || !phone || !userBirth || !nickName
            }
          >
            수정완료
          </Button> */}
          <div className="h-4" />
          <CustomButtonP
            text={"수정완료"}
            isButtonValid={
              isSubmitting || !userName || !phone || !userBirth || !nickName
            }
          />
        </form>
        {/* 모달 */}
        {isUserProfileImgModalOpen && (
          <ImageUploadModal
            setUserProfile={setUserProfile}
            setUserProfileImgModalOpen={setUserProfileImgModalOpen}
          />
        )}
      </div>
      <div>
        <AlertComponent />
      </div>
    </div>
  );
}
