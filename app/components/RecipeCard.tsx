// components/RecipeCard.tsx

import Link from 'next/link';

const RecipeCard = ({ title, description }: { title: string, description: string }) => {
  // Formatowanie tytułu przepisu do przyjaznej URL (np. "Pasta Carbonara" -> "pasta-carbonara")
  const formattedTitle = title.toLowerCase().replace(' ', '-');
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-gray-700">{description}</p>
      <Link 
        href={`/recipe/${formattedTitle}`}  // Dynamiczny link do strony przepisu
        className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600">
        View Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;
