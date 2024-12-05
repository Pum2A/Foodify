// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Sprawdź, czy użytkownik istnieje
  const { data: user, error } = await supabase
    .from('users')
    .select('email, password')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Sprawdź, czy hasło jest poprawne
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Zwróć odpowiedź z informacjami o użytkowniku (np. token, data użytkownika)
  return NextResponse.json({ message: 'Login successful', user });
}
