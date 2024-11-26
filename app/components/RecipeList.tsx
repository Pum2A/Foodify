import React from "react";

interface RecipeListProps {
  recipes: string[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Generated Recipes:</h3>
      {recipes.map((recipe, index) => (
        <div key={index} className="mb-4 bg-[#333] p-4 rounded-md">
          <p>{recipe}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
