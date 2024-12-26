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
      userEmail: email,
      userPassword: pw,
    }).then((res) => {
      if (res.status === 0) {
        console.log(res.message);
        localStorage.setItem("userId", res.data.userId);
        router.push("#54");
      } else if (res.status === 1) {
        console.log(res.message);
        setSignUp(false);
        setSamePassword(false);
      } else if (res.status === 2) {
        console.log(res.message);
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
