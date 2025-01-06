import React from "react";

interface NavItemProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({
  isActive,
  onClick,
  icon,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default NavItem;
