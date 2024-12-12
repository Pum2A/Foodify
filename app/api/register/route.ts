// app/api/register/route.ts
import { auth, db } from "../../lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(collection(db, "users"), userCredential.user.uid), {
      name,
      email,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Błąd rejestracji użytkownika:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
