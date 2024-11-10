import RecipeCard from "./components/RecipeCard";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to My Recipe App</h1>
      
      {/* Wstawienie komponentów, np. RecipeCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <RecipeCard title="Pasta Carbonara" description="A classic Italian pasta dish with eggs, cheese, pancetta, and pepper." />
        <RecipeCard title="Grilled Chicken" description="A simple and delicious grilled chicken recipe with a flavorful marinade." />
        <RecipeCard title="Vegetable Stir Fry" description="A healthy and colorful stir-fry with mixed vegetables and soy sauce." />
      </div>
    </div>
  );
};

export default Home;
