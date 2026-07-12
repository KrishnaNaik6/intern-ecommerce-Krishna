export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  productId: number;

  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}