"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/get-orders";
import { QUERY_KEYS } from "@/lib/query-keys";
import { useAuthStore } from "@/store/auth-store";

export function useOrders() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.ORDERS,
    queryFn: getOrders,
    enabled: isAuthenticated,
  });
}