"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/features/cart/hooks/use-cart";

export function CartBadge() {
  const { data } = useCart();

  return (
    <Link
      href="/cart"
      className="relative"
    >
      <ShoppingCart />

      {data?.totalItems ? (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {data.totalItems}
        </span>
      ) : null}
    </Link>
  );
}