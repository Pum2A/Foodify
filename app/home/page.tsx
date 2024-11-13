"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCarrot, FaListAlt, FaUtensils } from "react-icons/fa";

const Home = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-[#161616] text-white px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8">Create Your Recipe</h2>
      <p className="mb-6 text-gray-400 text-center max-w-md">
        Choose your ingredients, dietary preferences, and let our AI chef
        suggest a perfect recipe!
      </p>

      <form className="w-full max-w-lg space-y-6">
        {/* Ingredients Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaCarrot className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Ingredients (e.g., chicken, tomatoes)"
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>

        {/* Diet Preference Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FaListAlt className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Diet preference (e.g., vegan, keto)"
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>

        {/* Cuisine Type Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <FaUtensils className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Cuisine type (e.g., Italian, Asian)"
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>

        {/* Generate Recipe Button */}
        <motion.button
          className="w-full bg-blue-500 py-2 rounded flex items-center justify-center hover:bg-blue-600 transition"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <FaUtensils className="mr-2" /> Generate Recipe
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Home;
