"use client";

import { Cart } from "../types/cart";
import { CartItem } from "./cart-item";

interface Props {
  cart: Cart;
}

export function CartList({ cart }: Props) {
  return (
    <div className="space-y-4">
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}