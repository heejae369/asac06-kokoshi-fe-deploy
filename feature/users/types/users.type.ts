export interface UsePasswordResetEmailMutationArg {
  requestPwResetEmail: requestPwResetEmail;
}
export type UsePasswordResetEmailMutationRes = {};

export interface requestPwResetEmail {
  email: string;
  name: string;
}

export interface UsePasswordResetMutationArg {
  requestPwReset: requestPwReset;
}
export type UsePasswordResetMutationRes = {};

export interface requestPwReset {
  uuid: string;
  password: string;
}
