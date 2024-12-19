import GenderSelection from "@/components/GenderSelection";

export default function GenderPage() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <GenderSelection />
      </div>
    </div>
  );
}
