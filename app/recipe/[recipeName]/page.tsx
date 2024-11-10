

'use client'; 

import { useParams, useRouter } from 'next/navigation';

const RecipeDetails = () => {
  const router = useRouter();
  const { recipeName } = useParams();

  const formattedTitle = typeof recipeName === 'string' ? recipeName.replace('-', ' ') : '';

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold">
        {formattedTitle} Recipe
      </h1>
      <p className="mt-4">Details of {formattedTitle} recipe will be here.</p>
    </div>
  );
};

export default RecipeDetails;
