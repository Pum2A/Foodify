// app/api/generateRecipe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Inicjalizacja Hugging Face Inference API
const hf = new HfInference(process.env.HUGGING_FACE_KEY);

export async function POST(req: NextRequest) {
  const { ingredients, diet, cuisine } = await req.json();

  const prompt = `
  Create a detailed recipe using the following parameters with quick instructions:
  Ingredients: ${ingredients.join(", ")}.
  Dietary preference: ${diet || "no specific diet"}.
  Cuisine style: ${cuisine || "no specific cuisine"}.
`;

  try {
    const response = await hf.textGeneration({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      inputs: prompt,
      parameters: { max_new_tokens: 2000, temperature: 1 }, // Zmniejszyliśmy max_new_tokens do 250
    });
    

    const recipes = response.generated_text.split('\n').filter((line) => line.trim());

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json({ message: 'Error generating recipe.' }, { status: 500 });
  }
}
