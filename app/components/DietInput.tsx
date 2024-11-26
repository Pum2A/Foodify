import React from "react";
import { FaListAlt } from "react-icons/fa";

interface DietInputProps {
  inputValue: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onAdd: (e: React.FormEvent) => void;
}
const DietInput: React.FC<DietInputProps> = ({
  inputValue,
  onChange,
  onAdd,
}) => {
  return (
    <div className="flex items-center bg-[#222] rounded px-3 py-2">
      <FaListAlt className="text-gray-400 mr-3" />
      <input
        type="text"
        placeholder="Diet (e.g., vegetarian, keto)"
        value={inputValue}
        onChange={onChange}
        className="w-full bg-transparent text-white focus:outline-none"
      />
      <button
        type="button"
        onClick={onAdd}
        className="ml-2 text-blue-500 hover:text-blue-400"
      >
        Add
      </button>
    </div>
  );
};

export default DietInput;
