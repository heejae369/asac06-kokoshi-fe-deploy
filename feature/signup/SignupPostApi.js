import CustomFetch from "@/feature/CustomFetch";
import CurrentDate from "@/feature/signup/CurrentDate";

export default function SignupPostApi({
  setShowValidation,
  name,
  email,
  pw,
  setUnusedEmail,
}) {
  setShowValidation(false);
  try {
    CustomFetch("", "POST", {
      userUsername: name,
      userEmail: email,
      userPassword: pw,
      createdAt: CurrentDate(),
    }).then((res) => {
      if (res.status === 0) {
        console.log(res.message);
        setUnusedEmail(true);
      } else if (res.status === 1) {
        console.log(res.message);
      } else if (res.status === 2) {
        console.log(res.message);
        setUnusedEmail(false);
      } else if (res.status === 3) {
        console.log(res.message);
      }
      setShowValidation(true);
    });
  } catch (error) {
    console.error("Error:", error);
    setShowValidation(true);
    setUnusedEmail(false);
  }
}
