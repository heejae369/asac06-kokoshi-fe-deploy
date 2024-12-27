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
    CustomFetch("/users/login", "POST", {
      userEmail: email,
      userPassword: pw,
    })
      .then((response) => response?.json())
      .then((res) => {
        if (res.status === 0) {
          console.log(res.message);
          localStorage.setItem("userId", res.data.userId);
          router.push("/yanolza/main");
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
