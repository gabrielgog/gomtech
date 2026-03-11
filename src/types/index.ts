export interface Product {
  id: string;
  name: string;
  price: number; // in kobo (NGN × 100)
  category: 'phones' | 'accessories';
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
