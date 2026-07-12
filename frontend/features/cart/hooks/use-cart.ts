"use client";

import { useQuery } from "@tanstack/react-query";

import { getCart } from "../api/get-cart";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useCart() {
  return useQuery({
    queryKey: QUERY_KEYS.CART,
    queryFn: getCart,
  });
}