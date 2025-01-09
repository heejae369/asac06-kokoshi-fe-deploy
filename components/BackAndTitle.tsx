import { useRouter } from "next/navigation";

export default function BackAndTitle({ url, title, subtitle }) {
  const router = useRouter();
  if (subtitle) {
    return (
      <div className="mt-4 font-sans">
        <button onClick={() => router.push(url)} className="mt-10">
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <h2 className="mb-2 mt-4 whitespace-pre-line text-[25px] font-bold text-[#8b00ff]">
          {title}
        </h2>
        <p className="mb-9 whitespace-pre-line text-sm">{subtitle}</p>
      </div>
    );
  } else {
    return (
      <div className="mt-4 font-sans">
        <button onClick={() => router.push(url)} className="mt-10">
          <img src="/ic_back.png" alt="뒤로가기" />
        </button>
        <h2 className="mb-9 mt-4 whitespace-pre-line text-[25px] font-bold text-[#8b00ff]">
          {title}
        </h2>
      </div>
    );
  }
}
