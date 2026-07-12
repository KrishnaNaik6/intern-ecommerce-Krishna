import { api } from "@/lib/axios";

export async function getOrders() {
  const { data } = await api.get("/orders");

  return data.data;
}