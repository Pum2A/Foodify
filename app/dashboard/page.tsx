"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RecipeGenerator from "../home/page";
import Content from "../components/Content";
import Navigation from "../components/Navigation"; // Import Navigation component
import { useUser } from "../contexts/UserContext";

type Tab = "home" | "history" | "favorites";

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const tabContent: Record<Tab, JSX.Element> = {
    home: <RecipeGenerator />,
    history: <Content title="History" message="No history yet!" />,
    favorites: <Content title="Favorites" message="No favorites added yet!" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-white">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        username={user?.name ?? null}
      />
      <main className="p-6">{tabContent[activeTab]}</main>
    </div>
  );
};

export default Dashboard;
