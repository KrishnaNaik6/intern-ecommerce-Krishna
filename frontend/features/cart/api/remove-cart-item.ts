import { api } from "@/lib/axios";

export async function removeCartItem(
  productId: number,
) {
  const { data } = await api.delete(
    `/cart/items/${productId}`,
  );

  return data;
}