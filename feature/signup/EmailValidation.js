export default function EmailValidation({ email }) {
  const emailCondition = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailCondition.test(email)) {
    return true;
  } else return false;
}
