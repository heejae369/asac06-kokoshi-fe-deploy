import CustomFetch from "@/feature/CustomFetch";

export default function LoginPostApi({
  setShowValidation,
  setSignUp,
  setSamePassword,
  email,
  pw,
  router,
}) {
  setShowValidation(false);
  try {
    CustomFetch("", "POST", {
      user_email: email,
      user_password: pw,
    }).then((res) => {
      if (res.status == 0) router.push("#54");
      else if (res.status == 1) {
        setSignUp(false);
        setSamePassword(false);
      } else if (res.status == 2) {
        setSignUp(true);
        setSamePassword(false);
      }
      setShowValidation(true);
    });
  } catch (error) {
    console.error("Error:", error);
    setShowValidation(true);
    setSignUp(false);
    setSamePassword(false);
  }
}
