import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import blackBackIcon from "@/assets/blckBackIcon.png";
import { RootState } from "@/lib/store";

interface HeadersProps {
  title: string;
  backIcon?: boolean;
  cartIcon?: boolean;
  homeIcon?: boolean;
}

// 필요한 것만 true하면 됨
export default function MainHeaders({
  title,
  backIcon = false,
  cartIcon = false,
  homeIcon = false,
}: HeadersProps) {
  const router = useRouter();
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);

  const homeUrl = "http://localhost:3000/yanolza/main";

  const handleBackIcon = () => {
    router.back();
  };

  const onClickCart = () => {
    console.log("cart click");
  };

  return (
    <div className="relative mt-[58px] flex justify-between">
      <div className="flex w-1/5 items-center">
        {backIcon && (
          <button className="ml-[8px] h-[19px]" onClick={handleBackIcon}>
            <Image
              src={blackBackIcon}
              alt="blackBackIcon"
              width={9}
              height={19}
            />
          </button>
        )}
      </div>
      <div className="font-semibold">
        <span className="text-[16px] tracking-[-0.8px]">{title}</span>
      </div>
      <div className="flex w-1/5 items-center justify-end">
        {cartIcon && (
          <button onClick={onClickCart}>
            {cartCount > 0 && (
              <div className="relative right-1.5  top-1 flex size-[12px] items-center justify-center rounded-[50%] bg-[#8728FF]">
                <span className="text-center text-[10px] text-white">
                  {cartCount}
                </span>
              </div>
            )}
            <img src="/ic_productdetail_market.png" alt="장바구니" />
          </button>
        )}
        {homeIcon && (
          <button onClick={() => router.push(homeUrl)} className="size-[18px]">
            <Image
              src={"/assets/icon/ic_market_home.png"}
              width={15}
              height={15}
              alt="homeIcon"
              className="size-full object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
}
