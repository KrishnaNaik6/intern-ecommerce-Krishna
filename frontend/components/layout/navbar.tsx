"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/products"
          className="text-2xl font-bold"
        >
          Shop
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/products">
            Products
          </Link>

          <Link href="/orders">
            Orders
          </Link>

          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart
          </Button>
        </nav>
      </div>
    </header>
  );
}