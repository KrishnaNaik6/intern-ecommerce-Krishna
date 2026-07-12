import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { Product } from "../types/cart";

export async function addToCart(
  productId: number,
  quantity: number,
) {
  const { data } = await api.post<ApiResponse<Product>>("/cart/items", {
    productId,
    quantity,
  });

  return data;
}