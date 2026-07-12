"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeCartItem } from "../api/remove-cart-item";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      toast.success("Item removed");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: () => {
      toast.error("Unable to remove item");
    },
  });
}