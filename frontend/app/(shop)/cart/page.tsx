"use client";

import { useCart } from "@/features/cart/hooks/use-cart";
import { CartList } from "@/features/cart/components/cart-list";
import { CartSummary } from "@/features/cart/components/cart-summary";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ProtectedRoute } from "@/components/auth/potected-route";

export default function CartPage() {
  const {
    data: cart,
    isPending,
    isError,
    error,
  } = useCart();

  if (isPending) {
    return <div>Loading cart...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold">
            Your cart is empty
          </h1>

          <p className="text-muted-foreground">
            Looks like you haven't added any products yet.
          </p>

          <Button asChild>
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList cart={cart} />
        </div>

        <CartSummary cart={cart} />
      </div>
    </ProtectedRoute>
  );
}