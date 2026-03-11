import { google } from 'googleapis';
import { Product } from '@/types';
import { SEED_PRODUCTS } from './seed-data';
import { slugify } from './utils';

function isGoogleConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  );
}

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return google.sheets({ version: 'v4', auth });
}

function rowToProduct(row: string[]): Product {
  return {
    id: row[0] ?? '',
    name: row[1] ?? '',
    price: parseInt(row[2] ?? '0', 10),
    category: (row[3] as 'phones' | 'accessories') ?? 'phones',
    description: row[4] ?? '',
    imageUrl: row[5] ?? '/placeholder-phone.jpg',
    stock: parseInt(row[6] ?? '0', 10),
    featured: row[7]?.toLowerCase() === 'true',
    slug: slugify(row[1] ?? ''),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isGoogleConfigured()) {
    return SEED_PRODUCTS;
  }

  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A2:H',
    });

    const rows = response.data.values ?? [];
    return rows
      .filter((row) => row[0] && row[1])
      .map(rowToProduct);
  } catch (error) {
    console.error('Google Sheets fetch failed, falling back to seed data:', error);
    return SEED_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductsByCategory(
  category: 'phones' | 'accessories'
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}
