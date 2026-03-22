import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export interface TokenPayload extends JWTPayload {
  userId: string;
  role: 'customer' | 'admin';
}

export async function signToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(SECRET);

  return token;
}

export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const verified = await jwtVerify(token, SECRET);
    return verified.payload as TokenPayload;
  } catch {
    return null;
  }
}
