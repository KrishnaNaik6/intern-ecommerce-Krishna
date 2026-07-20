"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useAddToCart } from "../hooks/use-add-to-cart";
import { useCart } from "../hooks/use-cart";

interface Props {
  productId: number;
  stock: number;
}

export function AddToCartButton({
  productId,
  stock,
}: Props) {
  const { data: cart } = useCart();
  const mutation = useAddToCart();

  const isAlreadyInCart = cart?.items?.some(
    (item) => item.productId === productId,
  );

  if (stock <= 0) {
    return (
      <Button className="w-full" disabled variant="secondary">
        Out of Stock
      </Button>
    );
  }

  if (isAlreadyInCart) {
    return (
      <Button className="w-full" asChild variant="outline">
        <Link href="/cart">
          Go to Cart
        </Link>
      </Button>
    );
  }

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