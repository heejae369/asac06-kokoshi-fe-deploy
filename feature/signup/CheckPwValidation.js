export default function CheckPwValidation({
  pw,
  checkPw,
  setCheckPwValidation,
}) {
  if (pw === checkPw) {
    setCheckPwValidation(true);
  } else setCheckPwValidation(false);
}
