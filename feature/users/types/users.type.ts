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
