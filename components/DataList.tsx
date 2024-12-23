import React from "react";

interface DataListProps {
  data: { id: number; content: string }[];
}

const DataList: React.FC<DataListProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-md border p-4 shadow-sm bg-card hover:shadow-md"
        >
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DataList;