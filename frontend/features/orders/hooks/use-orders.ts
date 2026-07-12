"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/get-orders";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS,
    queryFn: getOrders,
  });
}