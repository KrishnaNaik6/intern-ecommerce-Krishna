import { ProductsResponse } from "../types/product";
import { Product } from "../types/product";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=20"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

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