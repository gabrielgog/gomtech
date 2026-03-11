import { Product } from '@/types';

export const SEED_PRODUCTS: Product[] = [
  // --- Phones ---
  {
    id: 'prod_001',
    name: 'iPhone 16 Pro Max 256GB',
    price: 185000000, // NGN 1,850,000
    category: 'phones',
    description:
      'The most powerful iPhone ever. Featuring the A18 Pro chip, a stunning 6.9-inch Super Retina XDR display with ProMotion, and a pro-grade camera system with 5x optical zoom. Available in Natural Titanium.',
    imageUrl: '/placeholder-phone.svg',
    stock: 8,
    featured: true,
    slug: 'iphone-16-pro-max-256gb',
  },
  {
    id: 'prod_002',
    name: 'iPhone 15 128GB',
    price: 115000000, // NGN 1,150,000
    category: 'phones',
    description:
      'Dynamic Island comes to iPhone 15. Featuring the 48MP main camera with 2x optical zoom, USB-C connectivity, and the powerful A16 Bionic chip. A huge leap in performance and capability.',
    imageUrl: '/placeholder-phone.svg',
    stock: 15,
    featured: true,
    slug: 'iphone-15-128gb',
  },
  {
    id: 'prod_003',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: 175000000, // NGN 1,750,000
    category: 'phones',
    description:
      'The ultimate Galaxy experience. Built-in S Pen, 200MP camera, Snapdragon 8 Gen 3 processor, and 6.8-inch Dynamic AMOLED 2X display. Titanium design for durability that matches its performance.',
    imageUrl: '/placeholder-phone.svg',
    stock: 6,
    featured: true,
    slug: 'samsung-galaxy-s24-ultra-512gb',
  },
  {
    id: 'prod_004',
    name: 'Samsung Galaxy A55 5G 256GB',
    price: 60000000, // NGN 600,000
    category: 'phones',
    description:
      'Premium design meets everyday performance. The Galaxy A55 features a 50MP triple camera, 6.6-inch Super AMOLED display, 5000mAh battery, and IP67 water resistance — all at a refreshingly accessible price.',
    imageUrl: '/placeholder-phone.svg',
    stock: 22,
    featured: false,
    slug: 'samsung-galaxy-a55-5g-256gb',
  },
  {
    id: 'prod_005',
    name: 'Google Pixel 9 Pro 256GB',
    price: 135000000, // NGN 1,350,000
    category: 'phones',
    description:
      "Google's most advanced phone yet. Featuring Gemini AI built-in, a 50MP triple camera system with Google's computational photography, and the Tensor G4 chip for on-device AI processing. Pure Android perfection.",
    imageUrl: '/placeholder-phone.svg',
    stock: 10,
    featured: true,
    slug: 'google-pixel-9-pro-256gb',
  },
  {
    id: 'prod_006',
    name: 'Tecno Phantom X2 Pro 256GB',
    price: 39500000, // NGN 395,000
    category: 'phones',
    description:
      'Flagship performance for less. The Phantom X2 Pro sports a retractable portrait lens, 6.8-inch AMOLED display, 60W fast charging, and Dimensity 9000 processor — redefining what to expect at this price point.',
    imageUrl: '/placeholder-phone.svg',
    stock: 18,
    featured: false,
    slug: 'tecno-phantom-x2-pro-256gb',
  },

  // --- Accessories ---
  {
    id: 'prod_007',
    name: 'Apple MagSafe Case for iPhone 16 Pro',
    price: 4500000, // NGN 45,000
    category: 'accessories',
    description:
      'Slim silicone protection with built-in MagSafe magnets. Perfectly aligned for MagSafe chargers and accessories. Available in five premium colours. Precision cutouts for all ports and buttons.',
    imageUrl: '/placeholder-accessory.svg',
    stock: 40,
    featured: false,
    slug: 'apple-magsafe-case-iphone-16-pro',
  },
  {
    id: 'prod_008',
    name: 'Anker 65W GaN Nano Charger',
    price: 1800000, // NGN 18,000
    category: 'accessories',
    description:
      'Charge your MacBook, iPad, and iPhone simultaneously with one compact charger. ActiveShield 2.0 technology monitors temperature constantly, adjusting power to protect your devices. Folds flat for travel.',
    imageUrl: '/placeholder-accessory.svg',
    stock: 35,
    featured: true,
    slug: 'anker-65w-gan-nano-charger',
  },
  {
    id: 'prod_009',
    name: 'AirPods Pro 2nd Generation',
    price: 19900000, // NGN 199,000
    category: 'accessories',
    description:
      'The world\'s best earbuds, now with USB-C. Active Noise Cancellation removes up to 2x more noise. Adaptive Audio automatically tailors the sound for your environment. Up to 30 hours total listening time with case.',
    imageUrl: '/placeholder-accessory.svg',
    stock: 20,
    featured: true,
    slug: 'airpods-pro-2nd-generation',
  },
  {
    id: 'prod_010',
    name: 'Samsung 45W USB-C Super Fast Adapter',
    price: 1200000, // NGN 12,000
    category: 'accessories',
    description:
      'Official Samsung Super Fast Charging 2.0 adapter. Charges compatible Galaxy phones from 0–50% in just 20 minutes. Slim and compact design for easy portability. Compatible with all USB-C devices.',
    imageUrl: '/placeholder-accessory.svg',
    stock: 50,
    featured: false,
    slug: 'samsung-45w-usb-c-super-fast-adapter',
  },
  {
    id: 'prod_011',
    name: 'Tempered Glass Screen Protector Pack (3 pcs)',
    price: 350000, // NGN 3,500
    category: 'accessories',
    description:
      '9H hardness tempered glass screen protectors with precision-cut edges for perfect fit. Anti-fingerprint oleophobic coating keeps screens smudge-free. Includes alignment frame for bubble-free installation.',
    imageUrl: '/placeholder-accessory.svg',
    stock: 100,
    featured: false,
    slug: 'tempered-glass-screen-protector-pack',
  },
  {
    id: 'prod_012',
    name: 'Belkin 15W MagSafe Wireless Charging Pad',
    price: 2200000, // NGN 22,000
    category: 'accessories',
    description:
      'Charge your iPhone at up to 15W with perfect magnetic alignment every time. Qi2 certified for universal compatibility. LED indicator confirms correct placement. Works with iPhone 12 and later.',
    imageUrl: '/placeholder-accessory.svg',
    stock: 28,
    featured: false,
    slug: 'belkin-15w-magsafe-wireless-charging-pad',
  },
];
