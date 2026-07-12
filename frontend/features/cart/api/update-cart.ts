import { api } from "@/lib/axios";

export async function updateCartItem(
  productId: number,
  quantity: number,
) {
  const { data } = await api.patch(
    `/cart/items/${productId}`,
    {
      quantity,
    },
  );

  return data;
}