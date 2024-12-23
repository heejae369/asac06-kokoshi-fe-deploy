import React, { useState } from "react";

interface CreateDataFormProps {
  onCreate: (content: string) => void;
}

const CreateDataForm: React.FC<CreateDataFormProps> = ({ onCreate }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreate(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter new content"
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="btn btn-primary w-full">
        Create
      </button>
    </form>
  );
};

export default CreateDataForm;