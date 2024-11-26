import React from "react";
import { FaCarrot } from "react-icons/fa";

interface IngredientInputProps {
  inputValue: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onAdd: (e: React.FormEvent) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  inputValue,
  onChange,
  onAdd,
}) => {
  return (
    <div className="flex items-center bg-[#222] rounded px-3 py-2">
      <FaCarrot className="text-gray-400 mr-3" />
      <input
        type="text"
        placeholder="Ingredient (e.g., chicken, tomatoes)"
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

export default IngredientInput;
