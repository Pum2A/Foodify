import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FaHome,
  FaHistory,
  FaHeart,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import NavItem from "./NavItem";
import IconButton from "./IconButton";

type Tab = "home" | "history" | "favorites";

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  username: string | null;
}

const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  username,
}) => {
  const tabs = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "history", label: "History", icon: <FaHistory /> },
    { id: "favorites", label: "Favorites", icon: <FaHeart /> },
  ];
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-l from-[#2a2a2a] to-[#1e1e1e] py-4 px-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 w-full md:w-auto">
        {tabs.map(({ id, label, icon }) => (
          <NavItem
            key={id}
            isActive={activeTab === id}
            onClick={() => setActiveTab(id as Tab)}
            icon={icon}
            label={label}
          />
        ))}
      </div>
      <div className="relative flex items-center space-x-4 mt-4 md:mt-0">
        <IconButton icon={<FaUserCircle onClick={handleToggle} />} />
        <IconButton icon={<FaSignOutAlt />} colorHover="hover:text-red-500" />
        {isToggled && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black rounded-md shadow-lg w-80">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold">Hello, {username}!</p>
              </div>
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <FaUserCircle className="text-gray-500" />
                  <span>Profile</span>
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <FaSignOutAlt className="text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
              <div className="p-4 border-t border-gray-200 text-right">
                <button
                  onClick={handleToggle}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
