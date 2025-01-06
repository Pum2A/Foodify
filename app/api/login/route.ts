import { NextRequest, NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../../lib/firebase";
import { db } from "../../lib/firebase";

export async function POST(req: NextRequest, ) {
  const { email, password } = await req.json();
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Pobranie danych użytkownika z Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      console.log("User logged in with displayName:", userData.name); // Add this line

      return NextResponse.json({
        message: "Login successful",
        user: {
          uid: user.uid,
          email: user.email,
          name: userData.name, // Zwracanie nazwy użytkownika
        },
      });
    } else {
      return NextResponse.json({ message: "User data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}