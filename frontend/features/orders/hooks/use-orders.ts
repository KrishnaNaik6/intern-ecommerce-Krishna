"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api/get-orders";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}