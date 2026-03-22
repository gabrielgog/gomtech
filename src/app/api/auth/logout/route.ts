import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'gomtech-token=; Path=/; HttpOnly; Max-Age=0',
      },
    }
  );
}
