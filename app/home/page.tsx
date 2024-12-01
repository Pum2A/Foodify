"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCarrot, FaTimes, FaUtensils } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

type ItemType = "ingredient" | "diet" | "cuisine";

const Home = () => {
  const [inputs, setInputs] = useState<{ [key in ItemType]: string }>({
    ingredient: "",
    diet: "",
    cuisine: "",
  });

  const [items, setItems] = useState<{ [key in ItemType]: string[] }>({
    ingredient: [],
    diet: [],
    cuisine: [],
  });

  const [recipes, setRecipes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ItemType
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [type]: value }));
  };

  const handleAddOrRemoveItem = (
    e: React.FormEvent,
    type: ItemType,
    action: "add" | "remove",
    item?: string
  ) => {
    e.preventDefault();
    const inputValue = inputs[type]?.trim();

    if (action === "add" && inputValue && !items[type].includes(inputValue)) {
      setItems((prevItems) => ({
        ...prevItems,
        [type]: [...prevItems[type], inputValue],
      }));
      setInputs((prevInputs) => ({ ...prevInputs, [type]: "" }));
    }

    if (action === "remove" && item) {
      setItems((prevItems) => ({
        ...prevItems,
        [type]: prevItems[type].filter((i) => i !== item),
      }));
    }
  };

  const handleGenerateRecipes = async () => {
    setLoading(true);
    const response = await fetch("/api/generateRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: items.ingredient,
        diet: items.diet[0] || "any diet",
        cuisine: items.cuisine[0] || "any cuisine",
      }),
    });

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setRecipes(data.recipes);
    } else {
      console.error("Error generating recipes:", data.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-[#161616] text-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 text-center">Create Your Recipe</h2>
      <p className="mb-6 text-gray-400 text-center max-w-md">
        Choose your ingredients, dietary preferences, and let our AI chef
        suggest a perfect recipe!
      </p>
      <form className="w-full max-w-lg space-y-6">
        {["ingredient", "diet", "cuisine"].map((type) => (
          <motion.div
            key={type}
            className="flex items-center bg-[#222] rounded-lg px-4 py-3 shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {type === "ingredient" && <FaCarrot className="text-orange-500 mr-3" />}
            {type === "diet" && <FaTimes className="text-green-500 mr-3" />}
            {type === "cuisine" && <FaUtensils className="text-yellow-500 mr-3" />}
            <input
              type="text"
              placeholder={`${
                type.charAt(0).toUpperCase() + type.slice(1)
              } (e.g., chicken, vegan, Italian)`}
              value={inputs[type as ItemType]}
              onChange={(e) => handleInputChange(e, type as ItemType)}
              className="w-full bg-transparent text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={(e) => handleAddOrRemoveItem(e, type as ItemType, "add")}
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
                      onClick={(e) =>
                        handleAddOrRemoveItem(
                          e,
                          type as ItemType,
                          "remove",
                          item
                        )
                      }
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )
        )}

        <motion.button
          onClick={handleGenerateRecipes}
          type="button"
          className="w-full bg-blue-500 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaUtensils className="mr-2" /> Generate Recipe
        </motion.button>
      </form>
      <div className="my-4">{loading && <LoadingSpinner text="Generating your recipe..." /> }</div>
      {recipes.length > 0 && (
        <div className="my-8 w-full max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">Your Recipe</h3>
          <div className="bg-[#222] p-6 rounded-lg shadow-lg">
            <ol className="list-decimal list-inside text-gray-300 leading-relaxed">
              {recipes.map((step, index) => (
                <li key={index} className="mb-2">
                  {step.trim()}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
