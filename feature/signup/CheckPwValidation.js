export default function CheckPwValidation({ pw, checkPw }) {
  if (pw === checkPw) {
    return true;
  } else return false;
}
