"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">

      <CheckCircle2
        className="mb-6 text-green-600"
        size={80}
      />

      <h1 className="text-4xl font-bold">
        Order Placed Successfully
      </h1>

      <p className="mt-4 text-muted-foreground">
        Thank you for shopping with us.
      </p>

      <div className="mt-8 flex gap-4">

        <Link href="/orders">
          <Button>
            View Orders
          </Button>
        </Link>

        <Link href="/products">
          <Button variant="outline">
            Continue Shopping
          </Button>
        </Link>

      </div>

    </div>
  );
}