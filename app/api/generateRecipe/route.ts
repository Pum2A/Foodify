// app/api/generateRecipe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Inicjalizacja Hugging Face Inference API
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: NextRequest) {
  const { ingredients, diet, cuisine } = await req.json();

  const prompt = `
  The user has provided the following ingredients: ${ingredients}, preferred diet type: ${diet}, and preferred cuisine type: ${cuisine}. Based on this information, suggest a recipe that meets all the requirements. Ensure the recipe is easy to make, healthy (in line with the diet), and authentic to the specified cuisine. Provide the recipe name, a list of ingredients, preparation instructions, and any suggestions for ingredient substitutions in case any are difficult to find or can be replaced.
`;


  try {
    const response = await hf.textGeneration({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      inputs: prompt,
      parameters: { max_new_tokens: 250, temperature: 1 }, // Zmniejszyliśmy max_new_tokens do 250
    });
    

    const recipes = response.generated_text.split('\n').filter((line) => line.trim());

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json({ message: 'Error generating recipe.' }, { status: 500 });
  }
}
