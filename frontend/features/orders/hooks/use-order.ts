"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/get-order";  

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}