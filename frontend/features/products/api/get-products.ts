import { ProductsResponse } from "../types/product";
import { api } from "@/lib/axios";

export async function getProducts({ page = 1, limit = 10, search = '' }: { page?: number, limit?: number, search?: string }): Promise<ProductsResponse> {
  const response = await api.get(`/products?page=${page}&limit=${limit}&search=${search}`)
  if (!response) {
    throw new Error("Failed to fetch products");
  }

  return response.data?.data;
}