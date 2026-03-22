import crypto from 'crypto';

const PAYSTACK_API_URL = 'https://api.paystack.co';
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export interface InitializeTransactionResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerifyTransactionResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    reference: string;
    amount: number;
    paid_at: string;
    status: string;
  };
}

export async function initializeTransaction(params: {
  email: string;
  amount: number; // in kobo
  reference: string;
  callback_url: string;
}): Promise<InitializeTransactionResponse> {
  const res = await fetch(`${PAYSTACK_API_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      reference: params.reference,
      callback_url: params.callback_url,
    }),
  });

  return res.json();
}

export async function verifyTransaction(
  reference: string
): Promise<VerifyTransactionResponse> {
  const res = await fetch(
    `${PAYSTACK_API_URL}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    }
  );

  return res.json();
}

export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const hash = crypto
    .createHmac('sha512', SECRET_KEY as string)
    .update(payload)
    .digest('hex');

  return hash === signature;
}
