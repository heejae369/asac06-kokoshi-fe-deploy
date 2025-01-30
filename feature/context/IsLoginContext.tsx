import { createContext, useState, useMemo, useContext, useEffect } from "react";

// const userEmail = localStorage.getItem("userEmail");
// const accessToken = localStorage.getItem("accessToken");

// export const IsLoginContext = createContext({
//   isLogin: userEmail !== null && accessToken !== null ? true : false,
//   setIsLogin: null,
// });

// export function IsLoginProvider({ children }) {
//   // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
//   const [isLogin, setIsLogin] = useState(
//     userEmail !== null && accessToken !== null ? true : false
//   );
//   const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);
//   return (
//     <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
//   );
// }

// export function useIsLoginState() {
//   const context = useContext(IsLoginContext);
//   if (!context) {
//     throw new Error("Cannot find IsLoginProvider");
//   }
//   return context.isLogin;
// }

// export default IsLoginProvider;

//-----------------------------------------------------------
export const IsLoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
});

export function IsLoginProvider({ children }) {
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage 체크
    const userEmail = localStorage.getItem("userEmail");
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(userEmail !== null && accessToken !== null);
  }, []);

  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin]);
  return (
    <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
  );
}

export function useIsLoginState() {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error("Cannot find IsLoginProvider");
  }
  return context.isLogin;
}

export default IsLoginProvider;

//-----------------------------------------------------------
// import { login, logout } from "@/lib/slice/loginSlice";
// import { RootState } from "@/lib/store";
// import { createContext, useState, useMemo, useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const userEmail = localStorage.getItem("userEmail");
// const accessToken = localStorage.getItem("accessToken");

// export const IsLoginContext = createContext({
//   isLoginState: userEmail !== null && accessToken !== null ? true : false,
//   setIsLoginState: null,
// });

// export function IsLoginProvider({ children }) {
//   // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
//   const dispatch = useDispatch();
//   const { userEmail, isLogin } = useSelector((state: RootState) => state.login);

//   const setLogin = (userEmail: string) => dispatch(login(userEmail));
//   const setLogout = () => dispatch(logout());

// //   const [isLoginState, setIsLoginState] = useState(
// //     userEmail !== null && accessToken !== null ? true : false
// //   );

//   const value = {
//     userEmail,
//     isLogin,
//     login: setLogin,
//     logout: setLogout,
//   };

//   return (
//     <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
//   );
// }

// export default IsLoginProvider;
