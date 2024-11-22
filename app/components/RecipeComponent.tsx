import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for the recipe
interface Recipe {
  title: string;
  introduction: string;
  ingredients: string[];
  instructions: string;
}

const RecipeComponent = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null); // Specify that recipe can be null or of type 'Recipe'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.post("/api/generateRecipe", {
          prompt: "Your new recipe prompt here",
        });
        setRecipe(response.data); // Assuming response.data contains your recipe
      } catch (err) {
        setError("Error fetching recipe");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []); // Empty array means this will run only once after the first render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{recipe?.title}</h1>
      <p>{recipe?.introduction}</p>
      <h2>Ingredients:</h2>
      <ul>
        {recipe?.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <p>{recipe?.instructions}</p>
    </div>
  );
};

export default RecipeComponent;
