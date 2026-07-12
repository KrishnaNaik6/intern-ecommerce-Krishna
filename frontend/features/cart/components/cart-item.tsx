"use client";

import Image from "next/image";

import { CartItem as Item } from "../types/cart";
import { QuantitySelector } from "./quantity-selector";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useUpdateCart } from "../hooks/use-update-cart";
import { useRemoveCartItem } from "../hooks/use-remove-cart-item";

interface Props {
  item: Item;
}

export function CartItem({ item }: Props) {
  const updateMutation = useUpdateCart();
  const removeMutation = useRemoveCartItem();
  return (
    <div className="flex items-center gap-6 rounded-xl border p-4">
      <Image
        src={item.product?.thumbnail}
        alt={item.product?.title}
        width={100}
        height={100}
        className="rounded-lg"
      />

      <div className="flex-1">
        <h2 className="font-semibold">
          {item.product?.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {item.product?.brand}
        </p>

        <p className="mt-2 font-bold">
          ${item.product?.price}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          removeMutation.mutate(item.productId)
        }
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </Button>

      <QuantitySelector
        quantity={item.quantity}
        onIncrease={() =>
          updateMutation.mutate({
            productId: item.productId,
            quantity: item.quantity + 1,
          })
        }
        onDecrease={() => {
          if (item.quantity === 1) {
            removeMutation.mutate(item.productId);
            return;
          }

          updateMutation.mutate({
            productId: item.productId,
            quantity: item.quantity - 1,
          });
        }}
      />

      <div className="font-bold">
        $
        {(Number(item.product?.price) * item?.quantity).toFixed(2)}
      </div>
    </div>
  );
}