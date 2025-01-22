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
          if (
            response.headers &&
            response.headers["authorization"] &&
            response.headers["authorization"].startsWith("Bearer ")
          ) {
            localStorage.setItem(
              "accessToken",
              response.headers["authorization"]
            );
          }
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
          router.push("/users/login");
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
}
