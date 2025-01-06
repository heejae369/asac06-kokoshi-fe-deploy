import CustomFetch from "@/feature/CustomFetch";

export default async function SignupPostApi({
  name,
  email,
  pw,
  newErrors,
  setErrors,
}) {
  try {
    const response = await CustomFetch("/users/signup", "POST", {
      userUsername: name,
      userEmail: email,
      userPassword: pw,
    });

    const res = await response.json();

    if (res.status) {
      console.log(res.message);
      newErrors.unusedEmail = "";
    } else {
      console.log(res.message);
      newErrors.unusedEmail = res.message;
    }
    setErrors({ ...newErrors });
  } catch (error) {
    console.error("Error:", error);
    newErrors.unusedEmail = "error";
    setErrors({ ...newErrors });
  }
}
