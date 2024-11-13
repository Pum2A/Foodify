"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCarrot, FaListAlt, FaUtensils, FaTimes } from "react-icons/fa";

// Typowanie kluczy jako stringów (ingredient, diet, cuisine)
type ItemType = "ingredient" | "diet" | "cuisine";

const Home = () => {
  // Stan dla inputów
  const [inputs, setInputs] = useState<{ [key in ItemType]: string }>({
    ingredient: "",
    diet: "",
    cuisine: "",
  });

  // Stan dla przechowywania elementów
  const [items, setItems] = useState<{ [key in ItemType]: string[] }>({
    ingredient: [],
    diet: [],
    cuisine: [],
  });

  const handleAddItem = (e: React.FormEvent, type: ItemType) => {
    e.preventDefault();
    const inputValue = inputs[type].trim();

    if (inputValue && !items[type].includes(inputValue)) {
      setItems((prevItems) => ({
        ...prevItems,
        [type]: [...prevItems[type], inputValue],
      }));
      setInputs((prevInputs) => ({
        ...prevInputs,
        [type]: "",
      }));
    }
  };

  const handleRemoveItem = (item: string, type: ItemType) => {
    setItems((prevItems) => ({
      ...prevItems,
      [type]: prevItems[type].filter((i) => i !== item),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ItemType
  ) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [type]: e.target.value,
    }));
  };

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
        {["ingredient", "diet", "cuisine"].map((type, index) => (
          <motion.div
            key={type}
            className="flex items-center bg-[#222] rounded px-3 py-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {type === "ingredient" && (
              <FaCarrot className="text-gray-400 mr-3" />
            )}
            {type === "diet" && <FaListAlt className="text-gray-400 mr-3" />}
            {type === "cuisine" && (
              <FaUtensils className="text-gray-400 mr-3" />
            )}

            <input
              type="text"
              placeholder={`${
                type.charAt(0).toUpperCase() + type.slice(1)
              } (e.g., chicken, tomatoes)`}
              value={inputs[type as ItemType]}
              onChange={(e) => handleChange(e, type as ItemType)}
              className="w-full bg-transparent text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={(e) => handleAddItem(e, type as ItemType)}
              className="ml-2 text-blue-500 hover:text-blue-400"
            >
              Add
            </button>
          </motion.div>
        ))}

        {["ingredient", "diet", "cuisine"].map(
          (type) =>
            items[type as ItemType].length > 0 && (
              <div
                key={type}
                className="flex flex-wrap gap-2 bg-[#222] p-4 rounded-md"
              >
                <h3 className="text-lg font-semibold mb-2 w-full">
                  {type.charAt(0).toUpperCase() + type.slice(1)}s:
                </h3>
                {items[type as ItemType].map((item) => (
                  <div
                    key={item}
                    className="flex items-center bg-gray-700 text-white py-1 px-3 rounded-md"
                  >
                    <span className="mr-2">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item, type as ItemType)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )
        )}

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
