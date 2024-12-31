"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHistory,
  FaHeart,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import RecipeGenerator from "../home/page";

type Tab = "home" | "history" | "favorites";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const tabContent: Record<Tab, JSX.Element> = {
    home: <RecipeGenerator />,
    history: <Content title="History" message="No history yet!" />,
    favorites: <Content title="Favorites" message="No favorites added yet!" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-white">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-6">{tabContent[activeTab]}</main>
    </div>
  );
};

const Navigation = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => {
  const tabs = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "history", label: "History", icon: <FaHistory /> },
    { id: "favorites", label: "Favorites", icon: <FaHeart /> },
  ];

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-l from-[#2a2a2a] to-[#1e1e1e] py-4 px-6">
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
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <IconButton icon={<FaUserCircle />} />
        <IconButton icon={<FaSignOutAlt />} colorHover="hover:text-red-500" />
      </div>
    </nav>
  );
};

const NavItem = ({
  isActive,
  onClick,
  icon,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
}) => (
  <motion.div
    className={`flex items-center gap-4 px-4 py-3 w-full rounded-lg cursor-pointer ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-400 hover:bg-gray-700 hover:text-white"
    }`}
    onClick={onClick}
    whileHover={{ scale: 0.97 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="text-2xl"
      animate={{ rotate: isActive ? 360 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <span className="font-medium text-lg">{label}</span>
  </motion.div>
);

const IconButton = ({
  icon,
  colorHover = "hover:text-white",
}: {
  icon: JSX.Element;
  colorHover?: string;
}) => (
  <button className={`flex items-center text-gray-400 ${colorHover}`}>
    <span className="text-2xl">{icon}</span>
  </button>
);

const Content = ({ title, message }: { title: string; message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-lg mx-auto"
  >
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="mt-4 text-gray-400">{message}</p>
  </motion.div>
);

export default Dashboard;
