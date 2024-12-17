import React from "react";
import Image from "next/image";

export default function LoginHeader({ titleText }) {
  return (
    <div className="loginHeader">
      <div className="loginHeaderBefore">
        <Image src="/images/beforeIcon.png" width={9} height={16} alt="" />
      </div>
      <div className="loginHeaderText">{titleText}</div>
    </div>
  );
}
