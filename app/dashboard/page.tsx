"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaHistory, FaHeart, FaSignOutAlt, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import RecipeGenerator from "../home/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDayMode, setIsDayMode] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <RecipeGenerator />;
      case "history":
        return <History />;
      case "favorites":
        return <Favorites />;
      default:
        return null;
    }
  };

  const toggleTheme = () => {
    setIsDayMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDayMode
          ? "bg-gradient-to-br from-[#f9f9f9] to-[#e6e6e6] text-black"
          : "bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-white"
      }`}
    >
      {/* Sidebar Navigation */}
      <nav
        className={`w-64 ${
          isDayMode ? "bg-gray-200" : "bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e]"
        } py-8 px-4 fixed top-0 left-0 bottom-0 flex flex-col items-center justify-between shadow-lg rounded-r-xl`}
      >
        {/* User Profile */}
        <div className="flex flex-col items-center space-y-3 mb-10">
          <motion.div
            className="text-white bg-gray-700 p-3 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUserCircle className="text-4xl" />
          </motion.div>
          <h2 className="text-lg font-semibold">{isDayMode ? "Good Morning" : "Good Evening"}, John</h2>
          <button
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => alert("Logged out!")}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-8 w-full">
          <NavItem
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
            icon={<FaHome />}
            label="Home"
          />
          <NavItem
            isActive={activeTab === "history"}
            onClick={() => setActiveTab("history")}
            icon={<FaHistory />}
            label="History"
          />
          <NavItem
            isActive={activeTab === "favorites"}
            onClick={() => setActiveTab("favorites")}
            icon={<FaHeart />}
            label="Favorites"
          />
        </div>

        {/* Theme Toggle */}
        <div className="mt-10 flex items-center gap-4">
          <button
            className={`p-3 rounded-full shadow-lg ${
              isDayMode ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={toggleTheme}
            title="Switch Theme"
          >
            {isDayMode ? <FaSun className="text-2xl text-white" /> : <FaMoon className="text-2xl text-white" />}
          </button>
          <span className="text-gray-500">{isDayMode ? "Day Mode" : "Night Mode"}</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 flex-grow flex flex-col items-center justify-center px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

const NavItem = ({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: JSX.Element; label: string }) => (
  <motion.div
    className={`flex items-center gap-4 px-4 py-3 w-full rounded-lg cursor-pointer ${
      isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-700 hover:text-white"
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="text-2xl"
      animate={{
        rotate: isActive ? 360 : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <span className="font-medium text-lg">{label}</span>
  </motion.div>
);

const History = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-lg"
  >
    <h2 className="text-3xl font-bold">History</h2>
    <p className="mt-4 text-gray-400">No history yet!</p>
  </motion.div>
);

const Favorites = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-lg"
  >
    <h2 className="text-3xl font-bold">Favorites</h2>
    <p className="mt-4 text-gray-400">No favorites added yet!</p>
  </motion.div>
);

export default Dashboard;
