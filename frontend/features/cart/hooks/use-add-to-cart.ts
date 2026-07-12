"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToCart } from "../api/add-to-cart";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => addToCart(productId, quantity),

    onSuccess: () => {
      toast.success("Product added to cart");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CART,
      });
    },

    onError: () => {
      toast.error("Failed to add product");
    },
  });
}