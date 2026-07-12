"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartItem } from "../api/update-cart";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) =>
      updateCartItem(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CART,
      });
    },

    onError: () => {
      toast.error("Failed to update quantity");
    },
  });
}