import { ApiResponse } from "@/feature/common/types/apiResponse";

export interface UsePasswordResetEmailMutationArg {
  requestPwResetEmail: requestPwResetEmail;
}
export type UsePasswordResetEmailMutationRes = any;

export interface requestPwResetEmail {
  email: string;
  name: string;
}

export interface UsePasswordResetMutationArg {
  requestPwReset: requestPwReset;
}
export type UsePasswordResetMutationRes = any;

export interface requestPwReset {
  uuid: string;
  password: string;
}

// export interface requestUserEmail {
//   userEmail: string;
// }

// export interface UsePhoneRequestArg {
//   requestUserEmail: requestUserEmail;
// }

export interface UserPhoneInfo {
  phone: string;
  name: string;
}
export type UsePhoneRequestRes = ApiResponse<UserPhoneInfo>;

export interface UserEditInfo {
  userName: string;
  phone: string;
  nickName: string;
  userBirth: string;
  profilePath: string;
}
export type UseUserEditInfoRes = ApiResponse<UserEditInfo>;
