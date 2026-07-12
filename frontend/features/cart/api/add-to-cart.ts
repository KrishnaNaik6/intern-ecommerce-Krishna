import { api } from "@/lib/axios";

export async function addToCart(
  productId: number,
  quantity: number,
) {
  const { data } = await api.post("/cart/items", {
    productId,
    quantity,
  });

  return data;
}