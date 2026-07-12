"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeCartItem } from "../api/remove-cart-item";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      toast.success("Item removed");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CART,
      });
    },

    onError: () => {
      toast.error("Unable to remove item");
    },
  });
}