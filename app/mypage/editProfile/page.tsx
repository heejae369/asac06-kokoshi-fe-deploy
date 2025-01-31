"use client";

import Footer from "@/components/Footer";
import MainHeaders from "@/components/MainHeaders";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { IsLoginContext } from "@/feature/context/IsLoginContext";
import { userAuthApi } from "@/feature/users/api/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserEditInfo } from "@/feature/users/types/users.type";
import { ImageUploadModal } from "@/components/myPage/ImageUploadModal";

export default function EditProfile() {
  const [isUserProfileImgModalOpen, setUserProfileImgModalOpen] =
    useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);
  const [userEditInfo, setUserEditInfo] = useState<UserEditInfo>({});
  const [userProfile, setUserProfile] = useState<string>("");

  const router = useRouter();
  const { setIsLogin } = useContext(IsLoginContext);

  // 유저 정보 가져오기
  const {
    data: userData,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    isError: isUserError,
  } = userAuthApi.useUserEditInfoQuery();

  const [
    logout,
    { isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError },
  ] = userAuthApi.useLogoutMutation();

  // const [
  //   deleteUser,
  //   { isSuccess: isDeleteUserSuccess, isError: isDeleteUserError },
  // ] = userAuthApi.useDeleteUserMutation();

  const handleLogout = () => {
    logout();
  };

  const handleDeleteUser = () => {
    alert("현재 탈퇴를 진행할 수 없습니다.");
    // deleteUser();
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userEmail");

      setIsLogin(false);
      router.push("/users/login");
    }
    if (isLogoutError) {
      // 일단 401인경우 로그인 정보 제거,
      // 추후 쿠키 만료시간과 동일하게 context 를 timeout 으로 세팅하여 처리하여 아래 로직 제거
      if (logoutError.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");

        setIsLogin(false);
        router.push("/users/login");
      } else {
        console.error("로그아웃에 실패하였습니다.", logoutError);
      }
    }
  }, [isLogoutSuccess, isLogoutError]);

  useEffect(() => {
    if (isUserSuccess && userData) {
      setUserEditInfo(userData.data);
      setUserProfile(userData.data.profilePath);
    }
  }, [isUserSuccess, userData]);

  if (isUserError) {
    return <div>Error</div>;
  }
  // useEffect(() => {
  //   if (isDeleteUserSuccess) {
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("userEmail");

  //     setIsLogin(false);
  //     router.push("/users/login");
  //   }
  //   if (isDeleteUserError) {
  //     alert("회원탈퇴에 실패하였습니다.");
  //     return;
  //   }
  // }, [isDeleteUserSuccess, isDeleteUserError]);

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
        <div className="mb-8 flex items-baseline">
          <p className="mt-5 text-xl font-bold">회원 정보</p>
          <button
            className="ml-auto text-sm font-bold text-[#8728FF]"
            onClick={() => router.push("editProfile/check")}
          >
            수정
          </button>
        </div>
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">이름</p>
          <p className="text-sm font-semibold">
            {userEditInfo.userName
              ? userEditInfo.userName[0] +
                "*".repeat(userEditInfo.userName.length - 1)
              : ""}
          </p>
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">휴대폰 번호</p>
          <p className="text-sm font-semibold">
            {userEditInfo.phone
              ? userEditInfo.phone.slice(0, 9) +
                "*".repeat(userEditInfo.phone.length - 9)
              : ""}
          </p>
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">생년월일</p>
          <p className="text-sm font-semibold">
            {userEditInfo.userBirth
              ? userEditInfo.userBirth
                  .split("")
                  .map((char, index) =>
                    [2, 3, 5, 6, 8, 9].includes(index) ? "*" : char
                  )
                  .join("")
              : ""}
          </p>
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">닉네임</p>
          <p className="text-sm font-semibold">{userEditInfo.nickName}</p>
        </div>
        <div className="mt-2 flex text-sm text-gray-400 underline underline-offset-2">
          <button
            className="ml-auto"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            로그아웃
          </button>
          {/* <button className="ml-3" onClick={() => setIsResignModalOpen(true)}>
            회원탈퇴
          </button> */}
        </div>
        <div className="mx-5 -mt-6 w-[360px] bg-[#f6f6f6]" />

        {/* 로그아웃 모달 */}
        {isLogoutModalOpen && (
          <ProfileModal
            title={"로그아웃"}
            content={"로그아웃하시겠습니까?"}
            setState={setIsLogoutModalOpen}
            onClickFunc={() => handleLogout()}
          />
        )}
        {/* 회원탈퇴 모달 */}
        {isResignModalOpen && (
          <ProfileModal
            title={"회원탈퇴"}
            content={
              "탈퇴하면 현재 계정으로 작성한 글,\n댓글 등을 수정하거나 삭제할 수 없습니다.\n지금 탈퇴하시겠습니까?"
            }
            setState={setIsResignModalOpen}
            onClickFunc={() => handleDeleteUser()}
          />
        )}
        {/* 모달 */}
        {isUserProfileImgModalOpen && (
          <ImageUploadModal
            setUserProfile={setUserProfile}
            setUserProfileImgModalOpen={setUserProfileImgModalOpen}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
