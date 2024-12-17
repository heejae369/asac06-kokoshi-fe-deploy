import "@/app/index.css";
import { Button } from "@/components/ui/button";
import LoginHeader from "@/components/LoginHeader";

export default function FindId() {
  return (
    <div>
      <div className="flex h-screen w-full justify-center bg-gray-100">
        <div className="w-[360px] bg-white">
          <div className="absolute">
            <LoginHeader titleText={"아이디 찾기"} />
            <div className="findIdInfo">
              아이디를 찾기 위해서
              <br />
              <strong>이름과 휴대폰 번호를</strong> 입력해주세요.
            </div>
            <input className="findIdFrame1" placeholder="이름"></input>
            <input className="findIdFrame2" placeholder="휴대폰 번호" />
            <Button className="findIdSumbit">인증번호 전송</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
