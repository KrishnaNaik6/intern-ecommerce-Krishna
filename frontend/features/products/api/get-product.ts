import { Product } from "../types/product";
import { api } from "@/lib/axios";

export async function getProduct(
  id: number,
): Promise<Product> {
  const response = await api.get(
    `/products/${id}`,
  );

  if (!response) {
    throw new Error("Failed to fetch product");
  }

  return response.data.data;
}