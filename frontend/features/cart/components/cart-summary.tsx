"use client";

import { Button } from "@/components/ui/button";
import { Cart } from "../types/cart";
import { usePlaceOrder } from "@/features/orders/hooks/use-place-order";

interface Props {
    cart: Cart;
}

export function CartSummary({ cart }: Props) {
    const placeOrder = usePlaceOrder();
    return (
        <div className="rounded-xl border p-6 space-y-4">

            <h2 className="text-xl font-bold">
                Order Summary
            </h2>

            <div className="flex justify-between">
                <span>Total Items</span>
                <span>{cart.totalItems}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>

                <span>
                    ${cart.totalPrice.toFixed(2)}
                </span>
            </div>

            <Button
                className="w-full"
                disabled={placeOrder.isPending}
                onClick={() => placeOrder.mutate()}
            >
                {placeOrder.isPending
                    ? "Placing Order..."
                    : "Proceed to Checkout"}
            </Button>
        </div>
    );
}