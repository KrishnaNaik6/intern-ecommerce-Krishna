"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/get-products";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useProducts() {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS,
    queryFn: getProducts,
  });
}