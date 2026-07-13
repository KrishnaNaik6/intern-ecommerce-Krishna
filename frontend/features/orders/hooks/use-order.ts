"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/get-order";  
import { QUERY_KEYS } from "@/lib/query-keys";
import { useAuthStore } from "@/store/auth-store";

export function useOrder(id: string) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.ORDER(id),
    queryFn: () => getOrder(id),
    enabled: !!id && isAuthenticated,
  });
}