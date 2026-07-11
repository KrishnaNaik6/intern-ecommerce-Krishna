"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/get-product";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}