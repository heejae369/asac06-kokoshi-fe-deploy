export default function EmailValidation({ email, setEmailValidation }) {
  const emailCondition = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailCondition.test(email)) {
    setEmailValidation(true);
  } else setEmailValidation(false);
}
