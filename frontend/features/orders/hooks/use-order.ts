"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/get-order";  
import { QUERY_KEYS } from "@/lib/query-keys";

export function useOrder(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ORDER(id),
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}