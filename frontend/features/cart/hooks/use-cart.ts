"use client";

import { useQuery } from "@tanstack/react-query";

import { getCart } from "../api/get-cart";
import { QUERY_KEYS } from "@/lib/query-keys";
import { useAuthStore } from "@/store/auth-store";

export function useCart() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.CART,
    queryFn: getCart,
    enabled: isAuthenticated,
  });
}
