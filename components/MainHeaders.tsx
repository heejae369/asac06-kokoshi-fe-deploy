import Image from "next/image";
import { useRouter } from "next/navigation";
import blackBackIcon from "@/assets/blckBackIcon.png";
import { useCart } from "@/feature/cart/CartCount";

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
  const { cartCount } = useCart();

  // const homeUrl = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/yanolza/main`;
  // const cartUrl = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/yanolza/cart`;

  const handleBackIcon = () => {
    router.back();
  };

  const onClickCart = () => {
    router.push("/cart");
  };

  return (
    <div className="relative mt-[20px] flex justify-between">
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
          <button
            onClick={() => router.push("/yanolza/main")}
            className="size-[18px]"
          >
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
