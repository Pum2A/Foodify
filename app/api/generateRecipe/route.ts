// app/api/generateRecipe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Inicjalizacja Hugging Face Inference API
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: NextRequest) {
  const { ingredients, diet, cuisine } = await req.json();

  const prompt = `
  You are a professional recipe creator. Your task is to craft a high-quality, detailed recipe that is suitable for a ${diet} diet and inspired by ${cuisine} cuisine. 
  The recipe must be written for an audience that values precision and clarity. Use the following ingredients: ${ingredients.join(", ")}.
  
  The recipe should be structured as follows:
  1. **Title**: Provide a short, enticing title for the dish.
  2. **Introduction**: Write 2-3 sentences explaining what makes this dish special, focusing on its flavor profile and cultural significance.
  3. **Ingredients**: List all required ingredients in a clear and organized format (include optional ingredients if appropriate).
  4. **Instructions**: Write step-by-step cooking instructions. Use full sentences and focus on clarity.
  
  Ensure that the recipe is:
  - Creative and engaging.
  - Realistic and practical to prepare.
  - Well-formatted for a cooking blog.

  End with a tip or suggestion for serving the dish, such as pairing it with a drink or complementary dish.
`;


  try {
    const response = await hf.textGeneration({
      model: "google/flan-t5-large",
      inputs: prompt,
      parameters: { max_new_tokens: 250, temperature: 0.7 }, // Zmniejszyliśmy max_new_tokens do 250
    });
    

    const recipes = response.generated_text.split('\n').filter((line) => line.trim());

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json({ message: 'Error generating recipe.' }, { status: 500 });
  }
}
