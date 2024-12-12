import { NextRequest, NextResponse } from 'next/server';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../../lib/firebase';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const auth = getAuth();

  try {
    // Try signing in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return NextResponse.json({ message: 'Login successful', user });
  } catch {
    // Return error if login fails
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
