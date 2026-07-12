import { api } from "@/lib/axios";

export interface CreateOrderResponse {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  OrderItems: {
    id: string;
    productId: number;
    quantity: number;
    price: number;
  }[];
}

export async function createOrder(): Promise<CreateOrderResponse> {
  const response = await api.post("/orders");

  return response.data.data;
}