// app/api/generateRecipe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Inicjalizacja Hugging Face Inference API
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: NextRequest) {
  const { ingredients, diet, cuisine } = await req.json();

  const prompt = `
  Create a recipe for "Chicken and Tomato Casserole" with the following requirements:
1. **Recipe Title**: The title of the recipe should be "Chicken and Tomato Casserole."
2. **Introduction**: Write a brief introduction (1-2 sentences) that describes the dish and its main flavors.
3. **Ingredients**: Provide a bulleted list of the ingredients. Ingredients must include: chicken and tomato.
4. **Instructions**: Write clear, step-by-step cooking instructions. Ensure there is no repetition in the steps. For each step:
    - Describe what to do (e.g., cook, mix, simmer, etc.)
    - Make sure each step follows logically from the previous one.
    - The instructions should be easy to follow.
5. **Additional Tips (Optional)**: If applicable, provide any tips or variations for making the recipe.

`;


  try {
    const response = await hf.textGeneration({
      model: "google/flan-t5-large",
      inputs: prompt,
      parameters: { max_new_tokens: 250, temperature: 0.5 }, // Zmniejszyliśmy max_new_tokens do 250
    });
    

    const recipes = response.generated_text.split('\n').filter((line) => line.trim());

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json({ message: 'Error generating recipe.' }, { status: 500 });
  }
}
