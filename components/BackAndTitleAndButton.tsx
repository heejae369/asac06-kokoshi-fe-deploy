import { useRouter } from "next/navigation";

interface BackAndTitleAndButtonProps {
  // 뒤로가기로 갈 주소
  url1: string;
  // 현재 페이지 타이틀
  title: string;
  // 오른쪽 아이콘 이미지 주소
  imageUrl: string;
  // 아이콘 클릭 시 이동할 주소
  url2: string;
}

const BackAndTitleAndButton: React.FC<BackAndTitleAndButtonProps> = ({
  url1,
  title,
  imageUrl,
  url2,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow">
      {/* 뒤로가기 버튼 */}
      <button onClick={() => router.push(url1)} className="w-6 h-6">
        <img src="/ic_back.png" alt="뒤로가기" className="w-full h-full object-contain" />
      </button>

      {/* 페이지 타이틀 */}
      <h2 className="text-base font-bold text-gray-900">{title}</h2>

      {/* 오른쪽 아이콘 */}
      <button onClick={() => router.push(url2)} className="w-6 h-6">
        <img src={imageUrl} alt="아이콘" className="w-full h-full object-contain" />
      </button>
    </div>
  );
};

export default BackAndTitleAndButton;
