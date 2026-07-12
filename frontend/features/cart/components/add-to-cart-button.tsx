"use client";

import { Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAddToCart } from "../hooks/use-add-to-cart";

interface Props {
  productId: number;
}

export function AddToCartButton({
  productId,
}: Props) {
  const mutation = useAddToCart();

  return (
    <Button
      className="w-full"
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          productId,
          quantity: 1,
        })
      }
    >
      {mutation.isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}