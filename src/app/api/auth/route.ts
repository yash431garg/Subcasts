import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getSession, login, logout } from '@/lib';

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    await logout();
    return NextResponse.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json({ error: 'Logout failed' });
  }
}
export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const userData = await req.json();

    const loginRes = await login(userData);
    return loginRes;
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
