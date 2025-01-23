import axios from "axios";

export default function LoginPostApi({
  setShowValidation,
  setSignUp,
  setSamePassword,
  email,
  pw,
  router,
}) {
  setShowValidation(false);

  // 로그인 요청
  try {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/login`,
        {
          userEmail: email,
          userPassword: pw,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === true) {
          console.log(response.data.message);

          localStorage.setItem(
            "accessToken",
            response.headers["authorization"]
          );
          localStorage.setItem("userEmail", response.data.data.userEmail);

          router.push("/yanolza/main");
        } else if (
          response.data.status === false &&
          response.data.message.includes("회원")
        ) {
          console.log(response.data.message);
          setSignUp(false);
          setSamePassword(false);
          setShowValidation(true);
        } else if (
          response.data.status === false &&
          response.data.message.includes("패스워드")
        ) {
          console.log(response.data.message);
          setSignUp(true);
          setSamePassword(false);
          setShowValidation(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowValidation(true);
        setSignUp(false);
        setSamePassword(false);
      });
  } catch (error) {
    console.error("Error:", error);
    setShowValidation(true);
    setSignUp(false);
    setSamePassword(false);
  }
}
