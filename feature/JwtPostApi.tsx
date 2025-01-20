import axios from "axios";

export default function JwtPostApi({ accessToken, router }) {
  // 로그인 요청
  try {
    axios
      .get("http://localhost:8080/users/access", {
        headers: { Authorization: accessToken },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status) {
          if (response.data.newAccesssToken) {
            localStorage.setItem("accessToken", response.data.newAccessToken);
          }
          console.log(response.data.message);
        } else {
          router.push("/users/login");
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
}
