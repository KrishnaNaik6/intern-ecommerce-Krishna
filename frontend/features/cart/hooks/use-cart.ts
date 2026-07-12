"use client";

import { useQuery } from "@tanstack/react-query";

import { getCart } from "../api/get-cart";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
}