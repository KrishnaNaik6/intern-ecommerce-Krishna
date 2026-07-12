import { api } from "@/lib/axios";

export async function getCart() {
  const { data } = await api.get("/cart");

  return data.data;
}