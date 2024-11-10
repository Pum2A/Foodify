import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import IngredientSelector from '../components/IngredientSelector';

const Home = () => {
  const recipes = [
    { title: 'Pasta', description: 'Delicious pasta with tomato sauce' },
    { title: 'Pizza', description: 'Tasty pizza with cheese and pepperoni' },
  ];

  const ingredients = ['Tomato', 'Cheese', 'Pepperoni', 'Garlic', 'Olive Oil'];

  const handleIngredientSelect = (ingredient: string) => {
    console.log(`Selected ingredient: ${ingredient}`);
  };

  return (
    <div className="space-y-4">
      <Header />
      <div className="p-4">
        <IngredientSelector ingredients={ingredients} onSelect={handleIngredientSelect} />
        <div className="mt-4 space-y-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.title} title={recipe.title} description={recipe.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
