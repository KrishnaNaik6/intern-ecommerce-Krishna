import { api } from "@/lib/axios";

export async function getOrder(id: string) {
  const { data } = await api.get(`/orders/${id}`);

  return data.data;
}