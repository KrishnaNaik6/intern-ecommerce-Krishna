export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
}

export interface CartResponse {
  id: string;
  items: CartItem[];
  totalItems: number;
}