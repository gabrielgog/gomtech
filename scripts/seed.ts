import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import bcryptjs from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import Product from '@/lib/models/Product';
import { SEED_PRODUCTS } from '@/lib/seed-data';

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Seed products
    await Product.insertMany(SEED_PRODUCTS);
    console.log('✓ Seeded 12 products');

    // Create first admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gomtech.app';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.warn('⚠️  ADMIN_PASSWORD not set, skipping admin user creation');
    } else {
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        const passwordHash = await bcryptjs.hash(adminPassword, 10);
        await User.create({
          email: adminEmail,
          passwordHash,
          name: 'Admin User',
          role: 'admin',
        });
        console.log(`✓ Created admin user: ${adminEmail}`);
      } else {
        console.log(`✓ Admin user already exists: ${adminEmail}`);
      }
    }

    console.log('\n✓ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
