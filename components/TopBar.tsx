// // /components/TopBar.tsx
// import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

// interface TopBarProps {
//   allChecked: boolean;
//   onToggleAll: () => void;
//   onDeleteSelected: () => void;
// }

// const TopBar: React.FC<TopBarProps> = ({ allChecked, onToggleAll, onDeleteSelected }) => {
//   return (
//     <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
//       {/* 전체 선택 */}
//       <label className="flex items-center gap-2">
//         <Checkbox
//           checked={allChecked}
//           onCheckedChange={onToggleAll}
//         />
//         <span className="text-sm font-medium text-gray-900">전체 선택</span>
//       </label>
//       {/* 선택 삭제 */}
//       <Button
//         variant="ghost"
//         className="text-sm text-red-500"
//         onClick={onDeleteSelected}
//       >
//         선택 삭제
//       </Button>
//     </div>
//   );
// };

// export default TopBar;
import React from "react";

interface TopBarProps {
  allChecked: boolean;
  onToggleAll: () => void;
  onDeleteSelected: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  allChecked,
  onToggleAll,
  onDeleteSelected,
}) => {
  return (
    <>
      <div className="mb-3 mt-6 flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={onToggleAll}
            className="size-5"
          />
          <span className="text-sm font-medium text-gray-900">전체 선택</span>
        </label>
        <button onClick={onDeleteSelected} className="text-sm text-red-500">
          선택 삭제
        </button>
      </div>
      <hr></hr>
    </>
  );
};

export default TopBar;
