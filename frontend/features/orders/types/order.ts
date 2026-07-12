export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  brand: string;
  category: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  Product: Product;
}

export interface Order {
  id: string;
  totalAmount: number;
  status: "PENDING" | "PLACED" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  OrderItems: OrderItem[];
}