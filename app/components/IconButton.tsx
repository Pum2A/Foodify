import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  colorHover?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  colorHover = "hover:text-blue-500",
}) => {
  return (
    <button
      className={`text-gray-400 transition-colors duration-200 ${colorHover}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
