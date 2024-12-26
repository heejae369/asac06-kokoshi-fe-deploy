export default function PwValidation({ pw, setPwValidation }) {
  const pwCondition = /^[A-Za-z0-9]{8,}$/;
  if (pwCondition.test(pw)) {
    setPwValidation(true);
  } else setPwValidation(false);
}
