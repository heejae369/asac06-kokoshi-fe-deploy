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
        if (res.status === true) {
          console.log(res.message);
          localStorage.setItem("userEmail", res.data.userEmail);
          router.push("/yanolza/main");
        } else if (res.status === false && res.message.includes("회원")) {
          console.log(res.message);
          setSignUp(false);
          setSamePassword(false);
          setShowValidation(true);
        } else if (res.status === false && res.message.includes("패스워드")) {
          console.log(res.message);
          setSignUp(true);
          setSamePassword(false);
          setShowValidation(true);
        }
      });
  } catch (error) {
    console.error("Error:", error);
    setShowValidation(true);
    setSignUp(false);
    setSamePassword(false);
  }
}
