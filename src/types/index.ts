export interface Product {
  id: string;
  name: string;
  price: number; // in kobo (NGN × 100)
  category: 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories';
  description: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export interface User {
  _id: string;
  id?: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  _id: string;
  id?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }>;
  subtotal: number;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled';
  paystackReference?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: boolean;
}
