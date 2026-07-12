"use client";

import Image from "next/image";

import { CartItem as Item } from "../types/cart";
import { QuantitySelector } from "./quantity-selector";

interface Props {
  item: Item;
}

export function CartItem({ item }: Props) {
  {console.log("itms", item.product)}
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

      <QuantitySelector
        quantity={item?.quantity}
        onIncrease={() => {}}
        onDecrease={() => {}}
      />

      <div className="font-bold">
        $
        {(Number(item.product?.price) * item?.quantity).toFixed(2)}
      </div>
    </div>
  );
}