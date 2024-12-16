import "@/app/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div>
      <div className="flex h-screen w-full justify-center bg-gray-100">
        <div className="w-[360px] bg-white">
          <div className="login">로그인</div>
          <Input className="frame4" />
          <>
            <Input className="frame5" />
            <Button className="ic_pw_hide" />
          </>
        </div>
      </div>
    </div>
  );
}
