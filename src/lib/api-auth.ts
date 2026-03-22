import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from '@/lib/auth';

export async function requireAdmin(
  request: NextRequest
): Promise<TokenPayload | null> {
  const authHeader =
    request.headers.get('authorization') ||
    request.cookies.get('gomtech-token')?.value;

  if (!authHeader) {
    return null;
  }

  let token = authHeader;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return null;
  }

  return payload;
}

export async function requireAuth(
  request: NextRequest
): Promise<TokenPayload | null> {
  const authHeader =
    request.headers.get('authorization') ||
    request.cookies.get('gomtech-token')?.value;

  if (!authHeader) {
    return null;
  }

  let token = authHeader;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }

  return await verifyToken(token);
}

export function unauthorized() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

export function forbidden() {
  return NextResponse.json(
    { error: 'Forbidden' },
    { status: 403 }
  );
}
