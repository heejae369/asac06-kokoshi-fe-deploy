// // /components/ui/CustomButton.tsx
// import React from "react";

// interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   isActive: boolean;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({ isActive, children, className, ...props }) => {
//   return (
//     <button
//       type="button"
//       className={`w-full rounded-md py-2 text-white ${
//         isActive ? "bg-[#8728FF] hover:bg-[#751FD1]" : "bg-gray-400 cursor-not-allowed"
//       } transition-colors ${className || ""}`}
//       disabled={!isActive}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export default CustomButton;

import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ isActive, children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`w-full rounded-md py-3 text-white text-sm ${
        isActive ? "bg-[#8728FF] hover:bg-[#751FD1]" : "bg-gray-400 cursor-not-allowed"
      } transition-all ${className || ""}`}
      disabled={!isActive}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
