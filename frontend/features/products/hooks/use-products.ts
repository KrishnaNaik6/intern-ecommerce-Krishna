"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/get-products";
import { QUERY_KEYS } from "@/lib/query-keys";
import { useSearchParams } from "next/navigation";

export function useProducts() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, page, limit],
    queryFn: () => getProducts({ page, limit }),
  });
}