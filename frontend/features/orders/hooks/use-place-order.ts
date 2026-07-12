"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrder } from "../api/create-order";

export function usePlaceOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: (order) => {
      toast.success("Order placed successfully");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      router.push(`/orders/${order.id}`);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to place order",
      );
    },
  });
}