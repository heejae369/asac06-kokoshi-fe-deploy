// import { login } from "@/lib/slice/loginSlice";
import axios from "axios";
import { setCartCount } from "@/lib/slice/cartSlice";

export default async function LoginPostApi({
  setShowValidation,
  setSignUp,
  setSamePassword,
  email,
  pw,
  router,
  setIsLogin,
  dispatch,
}) {
  setShowValidation(false);

  const loginParam = new URLSearchParams();

  loginParam.append("userEmail", email);
  loginParam.append("userPassword", pw);

  // 로그인 요청
  try {
    const response = await axios
      .post(
        // `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/login`,
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/login`,
        loginParam,
        // {
        //   userEmail: email,
        //   userPassword: pw,
        // },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // if (response.data.status === true) {
        if (response.status === 200) {
          localStorage.setItem(
            "accessToken",
            response.headers["authorization"]
          );
          localStorage.setItem("userEmail", response.data.userEmail);
          // localStorage.setItem("cartItemCount", response.data.cartItemCount);

          //cartItemCount 이 값을 context 에 넣으면 됩니다.
          dispatch(setCartCount(response.data.cartItemCount));

          // 로그인 상태 변경
          setIsLogin(true);
          // dispatch(login(response.data));

          router.replace("/yanolza/main");
        } else {
          setShowValidation(true);
          setSignUp(false);
          setSamePassword(false);
        }
        // else if (
        //   response.data.status === false &&
        //   response.data.message.includes("회원")
        // ) {
        //   console.log(response.data.message);
        //   setSignUp(false);
        //   setSamePassword(false);
        //   setShowValidation(true);
        // } else if (
        //   response.data.status === false &&
        //   response.data.message.includes("패스워드")
        // ) {
        //   console.log(response.data.message);
        //   setSignUp(true);
        //   setSamePassword(false);
        //   setShowValidation(true);
        // }
      });
    // .catch((error) => {
    //   console.error("Error:", error);
    //   setShowValidation(true);
    //   setSignUp(false);
    //   setSamePassword(false);
    // });
  } catch (error) {
    console.error("Error:", error);
    setShowValidation(true);
    setSignUp(false);
    setSamePassword(false);
  }
}
