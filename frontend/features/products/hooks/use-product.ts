"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/get-product";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useProduct(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT(id),
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}