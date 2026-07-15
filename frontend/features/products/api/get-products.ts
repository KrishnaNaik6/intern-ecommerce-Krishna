import { ProductsResponse } from "../types/product";
import { api } from "@/lib/axios";

export async function getProducts({ page = 1, limit = 10 }: { page?: number, limit?: number }): Promise<ProductsResponse> {
  const response = await api.get(`/products?page=${page}&limit=${limit}`)
  if (!response) {
    throw new Error("Failed to fetch products");
  }

  return response.data?.data;
}