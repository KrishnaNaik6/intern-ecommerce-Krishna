import { Product } from "../types/product";

export async function getProduct(
  id: number,
): Promise<Product> {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}