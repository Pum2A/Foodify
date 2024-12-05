import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { email, password, login, name } = await req.json();

    // Sprawdź, czy email istnieje w bazie danych
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle(); // zmiana z .single() na .maybeSingle()

    if (existingUserError) {
      console.error('Error checking existing user:', existingUserError);
      return NextResponse.json(
        { message: 'Error checking existing user', error: existingUserError.message },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }

    // Szyfruj hasło
    const hashedPassword = await bcrypt.hash(password, 10);

    // Dodaj nowego użytkownika do bazy danych
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email, password: hashedPassword, login, name, created_at: new Date() },
      ]);

    if (error) {
      console.error('Error inserting user:', error);
      return NextResponse.json(
        { message: 'Error inserting user', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'User registered successfully', user: data },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { message: 'Internal server error', error: err },
      { status: 500 }
    );
  }
}
