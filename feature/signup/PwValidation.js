export default function PwValidation({ pw }) {
  const pwCondition = /^[A-Za-z0-9]{8,}$/;
  if (pwCondition.test(pw)) {
    return true;
  } else return false;
}
