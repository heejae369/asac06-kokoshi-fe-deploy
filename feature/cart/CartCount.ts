import { useDispatch, useSelector } from "react-redux";
import { setCartCount } from "@/lib/slice/cartSlice";

interface RootState {
  cart: {
    cartCount: number;
  };
}

export const useCart = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector((state: RootState) => state.cart.cartCount);

  // 카트 카운트 증가 함수
  const increaseCart = () => {
    dispatch(setCartCount(cartCount + 1));
  };

  // 카트 카운트 초기화 함수
  const clearCart = () => {
    dispatch(setCartCount(0));
  };

  // 카트 카운트 감소 함수
  const decreaseCart = () => {
    dispatch(setCartCount(cartCount - 1));
  };

  return {
    cartCount,
    increaseCart,
    clearCart,
    decreaseCart,
  };
};
