import { defaultAuthGetFetch } from "@/lib/utils";

export default async function EditProfilePostApi({ name, phone }) {
  try {
    const params = new URLSearchParams({
      userName: name,
      userPhone: phone,
    }).toString();
    const response = defaultAuthGetFetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/api/checkUserPhone?` +
        params
    );
    const res = await response;
    if (res.ok) {
      return true;
    } else {
      console.error("Error");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
