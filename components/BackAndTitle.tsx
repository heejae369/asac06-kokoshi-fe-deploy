import styles from "@/styles/genderSelection.module.css";
import { useRouter } from "next/navigation";

export const BackAndTitle = ({ url, title }) => {
  const router = useRouter();
  return (
    <div className="font-sans">
      <button onClick={() => router.push(url)} className="mt-10">
        <img src="/ic_back.png" alt="뒤로가기" />
      </button>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};
